<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h2 class="text-md-center">Login</h2>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form>
          <v-layout column>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                required></v-text-field>
            </v-flex>
            <div class="text-center">
            <v-btn  
                depressed 
                rounded 
                large 
                style="text-transform: none !important;" 
                color="primary" 
                type="submit"
                text router to="/components/dashboardUserLayout.vue">Login</v-btn>
            </div>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script> 
export default { 
    data () { 
        return { 
            dialog: false, 
            
            users: [], 
            snackbar: false, 
            color: null, 
            text: '', 
            load: false,
            form: { 
                email : '', 
                password : '' 
            }, 
            user : new FormData, 
            typeInput: 'new', 
            errors : '', 
            updatedId : '', 
        } 
    }, 
    methods:{ 
        getData(){ 
            var uri = this.$apiUrl + '/barber' 
            this.$http.get(uri).then(response =>{ 
                this.users=response.data.message 
            }) 
        }, 
        sendData(){ 
            this.user.append('name', this.form.name); 
            this.user.append('email', this.form.email); 
            this.user.append('phone', this.form.phone); 
            var uri =this.$apiUrl + '/barber' 
            this.load = true 
            this.$http.post(uri,this.user).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar 
                this.color = 'green'; //memberi warna snackbar 
                this.text = response.data.message; //memasukkan pesan ke snackbar 
                
                this.load = false; 
                this.dialog = false 
                this.getData(); //mengambil data user 
                this.resetForm(); 
            }).catch(error =>{ 
                this.errors = error 
                this.snackbar = true; 
                this.text = 'Try Again'; 
                this.color = 'red'; 
                this.load = false; 
            }) 
        }, 
        updateData(){ 
            this.user.append('name', this.form.name); 
            this.user.append('email', this.form.email); 
            this.user.append('phone', this.form.phone); 
            var uri = this.$apiUrl + '/barber/' + this.updatedId; 
            this.load = true 
            this.$http.post(uri,this.user).then(response =>{
            this.snackbar = true; //mengaktifkan snackbar 
            this.color = 'green'; //memberi warna snackbar 
            this.text = response.data.message; //memasukkan pesan ke snackbar 
            
            this.load = false; this.dialog = false 
            this.getData(); //mengambil data user 
            this.resetForm(); this.typeInput = 'new'; 
        }).catch(error =>{ 
            this.errors = error 
            this.snackbar = true; 
            this.text = 'Try Again'; 
            this.color = 'red'; 
            this.load = false; 
            this.typeInput = 'new'; 
        }) 
        }, 
        editHandler(item){ 
            this.typeInput = 'edit'; 
            this.dialog = true; 
            this.form.name = item.name; 
            this.form.email = item.email; 
            this.form.phone = '', 
            this.updatedId = item.id 
        }, 
        deleteData(deleteId){ //menghapus data 
            var uri = this.$apiUrl + '/barber/' + deleteId; //data dihapus berdasarkan id 
            this.$http.delete(uri).then(response =>{ 
                this.snackbar = true; 
                this.text = response.data.message; 
                this.color = 'green' 
                this.deleteDialog = false; 
                this.getData(); 
            }).catch(error =>{ 
                this.errors = error 
                this.snackbar = true; 
                this.text = 'Try Again'; 
                this.color = 'red'; 
            }) 
        }, 
        setForm(){ 
            if (this.typeInput === 'new') { 
                this.sendData() 
            } else { 
                console.log("dddd")
                this.updateData() 
            } 
        }, 
        resetForm(){ 
            this.form = { 
                name : '', 
                email : '', 
                phone : '' 
            } 
        } 
        }, 
        mounted(){ 
            this.getData(); 
        }, 
    } 
</script>