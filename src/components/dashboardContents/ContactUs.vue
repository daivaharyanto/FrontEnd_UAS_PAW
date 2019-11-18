<template>
<v-container>
<v-card
    class="mx-auto"
    max-width="500">
    <h2 class="text-center">Contact Us!</h2> 
    <v-card-text>
        <v-form v-model="valid">
            <v-text-field
                v-model="firstname"
                outlined
                :rules="nameRules"
                counter
                maxlength="15"
                label="First name"
                required
            ></v-text-field>

            <v-text-field
                v-model="lastname"
                outlined
                :rules="nameRules"
                counter
                maxlength="15"
                label="Last name"
                required
            ></v-text-field>

            <v-text-field
                v-model="email"
                outlined
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>

            <v-textarea
                v-model="title"
                label="Message"
                outlined
                counter
                maxlength="200"
                full-width
                single-line
                required
            ></v-textarea>
            
            <div class="text-center">
                <v-btn  
                depressed 
                rounded 
                large 
                style="text-transform: none !important;" 
                color="primary">Send</v-btn>
            </div>
        </v-form>
    </v-card-text>
</v-card>
</v-container>
</template>

<script> 
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
                    value: 'full_name' 
                }, 
                { 
                    text: 'Email', 
                    value: 'email' 
                }, 
                { 
                    text: 'Password', 
                    value: 'password' 
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
        getData(){ 
            var uri = this.$apiUrl + '/user' 
            this.$http.get(uri).then(response =>{ 
                this.users=response.data.message 
            }) 
        }, 
        sendData(){ 
            this.user.append('full_name', this.form.full_name); 
            this.user.append('email', this.form.email); 
            this.user.append('password', this.form.password); 
            var uri =this.$apiUrl + '/user' 
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
            var uri = this.$apiUrl + '/user/' + this.updatedId; 
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
            var uri = this.$apiUrl + '/user/' + deleteId; //data dihapus berdasarkan id 
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