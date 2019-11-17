<template>
  <v-row>
    <v-col cols="12" sm="10" offset-sm="1">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>Hair Style</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <!-- <v-subheader>May</v-subheader> -->
        <v-container fluid>
          <v-row>
            <v-col v-for="user in users" :key="user.id" cols="3">
              <v-img :src="require('@/assets/upload/hair_pict/'+user.hair_pict)" class="image" alt="lorem" width="100%" height="100%"></v-img>
            </v-col>
          </v-row>
        </v-container>
        
        <v-footer class="mt-12"></v-footer>
      </v-card>
    </v-col>
  </v-row>
</template>

<script> 
export default { 
    data () { 
        return { 
            dialog: false, 
            keyword: '', 
            // headers: [ 
            //     { 
            //         text: 'No', 
            //         value: 'no', 
            //     }, 
            //     { 
            //         text: 'Name', 
            //         value: 'name' 
            //     }, 
            //     {
            //         text: 'Photos',
            //         value: 'hair_pict'
            //     },
            //     { 
            //         text: 'Actions', 
            //         value: null 
            //     }, 
            // ], 
            users: [], 
            snackbar: false, 
            color: null, 
            text: '', 
            load: false,
            form: { 
                name : '', 
                hair_pict: '' 
            }, 
            user : new FormData, 
            typeInput: 'new', 
            errors : '', 
            updatedId : '', 
        } 
    }, 
    methods:{ 

        getData(){ 
            var uri = this.$apiUrl + '/hairstyle' 
            this.$http.get(uri).then(response =>{ 
                this.users=response.data.message 
            }) 
        }, 
        editHandler(item){ 
            this.typeInput = 'edit'; 
            this.dialog = true; 
            this.form.name = item.name; 
            this.form.hair_pict = this.onFileSelected;
            this.updatedId = item.id 
        }, 
        deleteData(deleteId){ //menghapus data 
            var uri = this.$apiUrl + '/hairstyle/' + deleteId; //data dihapus berdasarkan id 
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
        onFileSelected(event) {
            console.log(event)
            this.form.hair_pict = event.target.files[0]
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
                hair_pict : ''
            } 
        } 
        }, 
        mounted(){ 
            this.getData(); 
        }, 
    } 
</script>