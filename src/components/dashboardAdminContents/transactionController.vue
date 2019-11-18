<template> 
    <v-container > 
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Transaction Data</h2> 
                <v-layout row wrap style="margin:10px"> 
                    <v-flex xs6> 
                        <v-btn
                        depressed 
                        dark 
                        rounded 
                        style="text-transform: none !important;" 
                        color = "green accent-3" 
                        @click="download1()"
                        >
                        <v-icon size="18" class="mr-2">mdi-file-pdf</v-icon>
                            Make Report
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right"> 
                        <v-text-field 
                            v-model="keyword"
                            append-icon="mdi-search"
                            label="Search" 
                            hide-details 
                        ></v-text-field>
                    </v-flex> 
                </v-layout> 
                <v-container ref="content">
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
                                    <!-- <v-btn 
                                        icon 
                                        color="indigo" 
                                        light 
                                        @click="editHandler(item)" 
                                    > 
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn> -->
                                    <v-btn
                                        icon
                                        color="error"
                                        light 
                                        @click="deleteData(item.id)"
                                    > 
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn> 
                                </td> 
                            </tr> 
                        </tbody>     
                    </template>    
                </v-data-table> 
                </v-container>
            </v-container> 
        </v-card> 
        <v-dialog v-model="dialog" persistent max-width="600px"> 
            <v-card> 
                <v-card-title> 
                    <span class="headline">Transaction Profile</span> 
                </v-card-title> 
                <v-card-text> 
                    <v-container> 
                        <v-row> 
                            <v-col cols="12"> 
                                <v-text-field label="Name*" v-model="form.full_name" required></v-text-field> 
                            </v-col> 
                            <v-col cols="12"> 
                                <v-text-field label="Email*" v-model="form.email" required></v-text-field>
                            </v-col>
                            <v-col cols="12"> 
                                <v-text-field label="Password*" v-model="form.password" type="password" required></v-text-field> 
                            </v-col> 
                        </v-row> 
                    </v-container>
                    <small>*indicates required field</small> 
                </v-card-text> 
                <v-card-actions> 
                    <v-spacer></v-spacer> 
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn> 
                    <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn> 
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
import  jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from "html2canvas";
export default { 
    data () { 
        return { 
            dialog: false, 
            keyword: '', 
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
            doc: null,
            columns: null, 
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
        download1() {
            var columns = [
                {title: "Name", dataKey: "user_name"},
                {title: "Barber", dataKey: "barber_name"},
                {title: "Hairstyle", dataKey: "hair_name"},
                {title: "Service", dataKey: "service_name"},
                {title: "Book Date", dataKey: "book_date"},
                {title: "Order Date", dataKey: "order_date"},
            ];

            var doc = new jsPDF('p', 'pt', 'letter');
            doc.text(190, 30, 'Barbarbershop Transaction Report');
            doc.autoTable(columns, this.users);
            doc.save("Barbarbershop Report.pdf");
            
        },
        getData(){ 
            var uri = this.$apiUrl + '/transaction' 
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
            this.getData(); 
        }, 
        
    } 
</script>