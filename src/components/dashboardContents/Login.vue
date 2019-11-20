<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h2 class="text-center">Login</h2>
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
                v-model="form.email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="form.password"
                required></v-text-field>
            </v-flex>
            <div class="text-center">
            <v-btn  
                depressed 
                rounded 
                large 
                style="text-transform: none !important;" 
                color="primary" 
                @click="login()">Login</v-btn>
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
            snackbar: false, 
            color: null, 
            text: '', 
            load: false,
            form: { 
                email : null, 
                password : null 
            }, 
            user : new FormData(), 
            typeInput: 'new', 
            errors : ''
        } 
    }, 
    methods:{ 
      login() {
        var url = this.$apiUrl + '/auth';
          this.user = new FormData();
          this.user.append("email", this.form.email);
          this.user.append("password", this.form.password);
          this.$http.post(url, this.user).then(response => {
            if (response.data.token) {
              localStorage.setItem("token", response.data.token);
              //  headers.setItem("token", response.data.token);
              console.log(localStorage);
              if(this.form.email == "admin@gmail.com" && this.form.password == "ZAQ123wsx*") {
                this.$router.push({ name: "User" }); 
              } else {
                this.$router.push({ name: "HomeUser" });
              }
            } else {
              alert("Login Failed");
            }
        });
      },
    } 
}
</script>