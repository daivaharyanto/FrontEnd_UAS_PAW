<template> 
    <v-container> 
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Transaction History</h2> 
                <v-layout row wrap style="margin:10px"> 
                    <!-- <v-flex xs6> 
                        <v-btn
                        depressed 
                        dark 
                        rounded 
                        style="text-transform: none !important;" 
                        color = "green accent-3" 
                        @click="dialog = true"
                        >
                        <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Add Transaction
                        </v-btn>
                    </v-flex> -->
                    <v-flex xs6 class="text-right"> 
                        <v-text-field 
                            v-model="keyword"
                            append-icon="mdi-search"
                            label="Search" 
                            hide-details 
                        ></v-text-field>
                    </v-flex> 
                </v-layout> 
            
                <v-data-table 
                    :headers="headers" 
                    :items="users" 
                    :search="keyword" 
                    :loading="load" 
                > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="item.id"> 
                                <td>{{ index + 1 }}</td> 
                                <td>{{ item.user_name }}</td> 
                                <td>{{ item.barber_name}}</td> 
                                <td>{{ item.hair_name }}</td> 
                                <td>{{ item.service_name }}</td> 
                                <td>{{ item.total }}</td>
                                <td>{{ item.book_date }}</td>
                                <td>{{ item.order_date }}</td>
                                <td class="text-xs-center"> 
                                    <v-btn 
                                        icon 
                                        color="indigo" 
                                        light 
                                        @click="editHandler(item)"
                                    > 
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <!-- <v-btn
                                        icon
                                        color="error"
                                        light 
                                        @click="deleteData(item.id)"
                                    > 
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>  -->
                                </td> 
                            </tr> 
                        </tbody> 
                    </template> 
                </v-data-table> 
            </v-container> 
        </v-card> 
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
        <v-snackbar 
            v-model="snackbar"
            :color="color" 
            :multi-line="true" 
            :timeout="3000"
        > 
            {{ text }} 
            <v-btn 
                dark 
                text 
                @click="snackbar = false" 
            > 
                Close 
            </v-btn> 
        </v-snackbar> 
    </v-container> 
</template> 

<script> 
export default { 
    data () { 
        return { 
            dialog: false, 
            keyword: '', 
            nowDate: new Date().toISOString().substr(0, 10),
            picker: new Date().toISOString().substr(0, 10),
            headers: [ 
                { 
                    text: 'No', 
                    value: 'no', 
                }, 
                { 
                    text: 'Name', 
                    value: 'user_name' 
                }, 
                { 
                    text: 'Barber', 
                    value: 'barber_name' 
                }, 
                { 
                    text: 'Hairstyle', 
                    value: 'hair_name' 
                }, 
                { 
                    text: 'Service', 
                    value: 'service_name' 
                }, 
                { 
                    text: 'Total', 
                    value: 'total' 
                }, 
                { 
                    text: 'Book Date', 
                    value: 'book_date' 
                }, 
                { 
                    text: 'Order Date', 
                    value: 'order_date' 
                },
                { 
                    text: 'Actions', 
                    value: null 
                }, 
            ], 
            users: [], 
            snackbar: false, 
            color: null, 
            text: '', 
            load: false,
            form: { 
                full_name : '', 
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
        getData(id){ 
            var uri = this.$apiUrl + '/transaction/' +id
            this.$http.get(uri).then(response =>{ 
                this.users=response.data.message 
            }) 
        }, 
        sendData(){ 
            this.user.append('full_name', this.form.full_name); 
            this.user.append('email', this.form.email); 
            this.user.append('password', this.form.password); 
            var uri =this.$apiUrl + '/transaction' 
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
            this.user.append('full_name', this.form.full_name); 
            this.user.append('email', this.form.email); 
            this.user.append('password', this.form.password); 
            var uri = this.$apiUrl + '/transaction/' + this.updatedId; 
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
            this.form.full_name = item.full_name; 
            this.form.email = item.email; 
            this.form.password = '', 
            this.updatedId = item.id 
        }, 
        deleteData(deleteId){ //menghapus data 
            var uri = this.$apiUrl + '/transaction/' + deleteId; //data dihapus berdasarkan id 
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
                full_name : '', 
                email : '', 
                password : '' 
            } 
        } 
        }, 
        mounted(){ 
            this.getData(localStorage.getItem("id")); 
        }, 
    } 
</script>