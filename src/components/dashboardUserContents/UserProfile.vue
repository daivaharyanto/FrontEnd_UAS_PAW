<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h2 class="text-center">Edit Profile</h2>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form>
          <v-layout column>
            <v-flex>
              <v-text-field
                name="name"
                label="Name"
                id="email"
                type="name"
                v-model="form.full_name"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="form.email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                
                ></v-text-field>
            </v-flex>
            <div class="text-center">
            <v-btn  
                depressed 
                rounded 
                large 
                style="text-transform: none !important;" 
                color="primary" 
                type="submit"
                @click="updateData()"
                >Submit</v-btn>
            </div>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    name: 'App',
    components: {
    },
    data() {
        return{
        menu: '',
        users:{},
        form:{
            full_name:localStorage.getItem("full_name"),
            email:localStorage.getItem("email"),
            password:'',
        }
        }
    },
    methods: {
        getData(){
            const auth = {
                headers: {Authorization: localStorage.getItem('token')} 
            }
            var uri = this.$apiUrl + '/user/' + localStorage.getItem("id")
            this.$http.get(uri,auth).then(response =>{ 
                this.users=response.data.message 
            }) 
        },
        updateData(){ 
            this.user.append('full_name', this.form.full_name); 
            this.user.append('email', this.form.email); 
            var uri = this.$apiUrl + '/user/' + localStorage.getItem("id"); 
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
    }, 
    mounted(){
        this.getData()
    }
}
</script>