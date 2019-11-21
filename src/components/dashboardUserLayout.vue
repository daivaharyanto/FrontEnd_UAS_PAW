<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title 
        style="font-size: 21px;" 
        class="white--text ml-2"
      > 
        Barbarbershop
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text router to="/user/home">Home</v-btn>
        <v-btn text router to="/user/contactus">Contact Us</v-btn>
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
                <img class="grey lighten-2" >
                </v-list-item-avatar>

                <v-list-item-content>
                <v-list-item-title>Daiva Haryanto</v-list-item-title>
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
  }),
  methods: {
    logout()
    {
        localStorage.removeItem('token')
        this.$router.push({name : "Login"})
    }
  } 
};
</script>