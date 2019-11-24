<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h2 class="text-center">Signup</h2>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form>
          <v-layout column>
            <v-flex>
              <v-text-field
                name="full_name"
                label="Full Name"
                id="full_name"
                v-model="form.full_name"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                v-model="form.email"
                id="email"
                type="email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                v-model="form.password"
                type="password"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                :rules="confirmPasswordRules"
                v-model="confirmPassword"
                type="password"
                required
                ></v-text-field>
            </v-flex>
            <div class="text-center">
            <v-btn  
                depressed 
                rounded 
                large 
                style="text-transform: none !important;" 
                color="primary"
                @click="sendData()">Sign Up</v-btn>
            </div>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
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
            snackbar: false, 
            color: null, 
            text: '', 
            load: false,
            users: {},
            confirmPassword: '',
            form: { 
              full_name : '',
              email : '', 
              password : '',
            }, 
            user : new FormData(), 
            typeInput: 'new', 
            errors : ''
        } 
    }, 
    methods:{ 
      sendData(){ 
        var uri = this.$apiUrl + '/user';
        this.user = new FormData();
        this.user.append("full_name", this.form.full_name);
        this.user.append("email", this.form.email);
        this.user.append("password", this.form.password);
        this.$http.post(uri, this.user).then(response =>{ 
          
        }) 
      }
    },
    computed: {
    confirmPasswordRules() {
      return [
        () => (this.form.password === this.confirmPassword) || 'Password Must Match',
        v => !!v || 'Confirm Password Is Required'
      ];
    },
}
}
</script>