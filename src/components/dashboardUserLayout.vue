<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-side-icon> 
       <v-img      
        class="mr-3" src="@/assets/BarberLogo.png" height="60px" width="60px"
        >
       </v-img>
      </v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text router to="/user/home">Home</v-btn>
        <v-btn text router to="/user/aboutus">About Us</v-btn>
        <v-btn text router to="/user/booking">Booking</v-btn>
        <v-menu
          v-model="menu"
          :close-on-content-click="true"
          :nudge-width="200"
          offset-x
        >
            <template v-slot:activator="{ on }">
            <v-btn v-on="on">Profile</v-btn>
            </template>
            <v-card>
            <v-list>
            <v-list-item>
                <v-list-item-avatar>
                <v-img      
                :src= "$apiUrl2+'/profile_pict/default.jpg'"
                contain
                class="grey lighten-2"
                >
                </v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                <v-list-item-title class=" d-inline-block text-truncate text-no-wrap text-left font-weight-bold">Welcome, {{name}}</v-list-item-title>
                <!-- <v-list-item-subtitle>Founder of Vuetify.js</v-list-item-subtitle> -->
                </v-list-item-content>
            </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
            <v-list-item>
                <v-btn block text router to="/user/profile">Edit Profile</v-btn>
            </v-list-item>
            <v-list-item>
                <v-btn block text router to="/user/transaction">Transaction History</v-btn>
            </v-list-item>
            <v-list-item>
                <v-btn block text @click="logout()">Logout</v-btn>
            </v-list-item>
            </v-list>

        </v-card>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    menu: '',
    name: localStorage.getItem("full_name"),
    users:{}
  }),
  methods: {
    logout()
    {
      localStorage.removeItem('type')
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('full_name')
      localStorage.removeItem('email')
      this.$router.push({name : "Login"})
    },
    getData(){
        const auth = {
                headers: {Authorization: localStorage.getItem('token')} 
            }
        var uri = this.$apiUrl + '/user/' + localStorage.getItem("id")
        this.$http.get(uri,auth).then(response =>{ 
            this.users=response.data.message 
        }) 
    },
  }, 
  mounted(){
    this.getData()
  }
};
</script>