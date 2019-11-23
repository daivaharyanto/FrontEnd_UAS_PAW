<template>
  <v-row>
    <v-col cols="12" sm="10" offset-sm="1">
      <v-card>

        <v-toolbar flat>
             <v-spacer></v-spacer>
        </v-toolbar>
            <h2 class="text-center">Hair Style</h2> 

        <!-- <v-subheader>May</v-subheader> -->
        <v-container fluid>
          <v-row>
            <v-col v-for="user in users" :key="user.id" cols="3">
                <v-card>
                    <v-card-title class="justify-center" >{{user.name}}</v-card-title>
                    <v-img :src="$apiUrl2+'/hair_pict/'+user.hair_pict" class="image" alt="lorem" width="100%" height="100%" @click="editHandler(user)"></v-img>
                </v-card>
            </v-col>
          </v-row>
        </v-container>
        
        <v-footer class="mt-12"></v-footer>
      </v-card>
      
    </v-col>
    <v-dialog v-model="dialog" persistent max-width="600px"> 
        <v-card> 
            <v-card-title> 
                <span class="headline">Barber Profile</span> 
            </v-card-title> 
            <v-card-text> 
                <v-container> 
                    <v-row> 
                        <v-col cols="12"> 
                            <v-text-field label="Name" v-model="form.name" disabled></v-text-field> 
                        </v-col> 
                        <v-col cols="12" > 
                            <v-select
                                v-model="form.service"
                                :items="services"
                                item-text="name"
                                item-value="name"
                                label="Service"
                                single-line
                                return-object
                                @change="change(form.service)"
                                required
                            ></v-select>
                        </v-col>
                        <v-col cols="12"> 
                            <v-text-field label="Description" v-model="form.description" disabled></v-text-field> 
                        </v-col> 
                        <v-col cols="12"> 
                            <v-text-field label="Price" v-model="form.price" disabled></v-text-field> 
                        </v-col> 
                        <v-col cols="12"> 
                            <v-date-picker label="Book Date*" v-model="picker" :min="nowDate" :show-current="false"></v-date-picker>
                        </v-col>
                    </v-row> 
                </v-container>
                <small>*indicates required field</small> 
            </v-card-text> 
            <v-card-actions> 
                <v-spacer></v-spacer> 
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn> 
                <v-btn color="blue darken-1" text @click="sendData()">Order</v-btn> 
            </v-card-actions> 
        </v-card> 
    </v-dialog>
  </v-row>
  
</template>

<script> 
export default { 
    data () { 
        return { 
            dialog: false,
            nowDate: new Date().toISOString().substr(0, 10),
            picker: new Date().toISOString().substr(0, 10),
            keyword: '', 
            users: [], 
            services: [],
            snackbar: false, 
            color: null, 
            text: '', 
            load: false,
            form: { 
                name : '',  
                service : '', 
                description : '',
                price : '',
            }, 
            temp: {
                user_id : localStorage.getItem("id"),
                hair_id : '',
                service_id : '',
                barber_id : '5',
                // Math.floor(Math.random() * (10 - 1 + 1)) + 1
            },
            user : new FormData, 
            service : new FormData,
            errors : '', 
        } 
    }, 
    methods:{ 

        getData(){ 
            var uri = this.$apiUrl + '/hairstyle' 
            this.$http.get(uri).then(response =>{ 
                this.users=response.data.message 
            }) 
        }, 
        getDataService(){ 
            var uri = this.$apiUrl + '/service' 
            this.$http.get(uri).then(response =>{ 
                this.services=response.data.message 
            }) 
        },
        editHandler(item){ 
            this.typeInput = 'edit'; 
            this.dialog = true; 
            this.form.name = item.name; 
            this.form.description = item.description;
            this.form.price = item.price;
            this.temp.hair_id = item.id;
        }, 
        change(item){ 
            this.typeInput = 'edit'; 
            this.form.description = item.description;
            this.form.price = item.price;
            this.temp.service_id = item.id;
        }, 
        sendData(){ 
            this.user.append('id_user', this.temp.user_id); 
            this.user.append('id_hairstyle', this.temp.hair_id);
            this.user.append('id_barber', this.temp.barber_id); 
            this.user.append('id_service', this.temp.service_id); 
            this.user.append('book_date', this.picker); 
            var uri =this.$apiUrl + '/transaction' 
            this.load = true 
            this.$http.post(uri,this.user).then(response =>{ 
                console.log(response);
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
                service : '', 
                description : '',
                price : '',
            } 
        } 
        }, 
    mounted(){ 
        this.getData(); 
        this.getDataService();
    }, 
} 
</script>