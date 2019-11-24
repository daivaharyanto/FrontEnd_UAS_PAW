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
        <v-btn text router to="/">Home</v-btn>
        <v-btn text router to="/aboutus">About Us</v-btn>
        <v-btn text router to="/signup">Signup</v-btn>
        <v-btn text router to="/login">Login</v-btn>
        
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
    //
  }),
};
</script>