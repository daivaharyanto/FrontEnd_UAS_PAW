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
        <v-btn text router to="/">Home</v-btn>
        <v-btn text router to="/dashboardContents/ContactUs">Contact Us</v-btn>
        <v-btn text router to="/Signup">Signup</v-btn>
        <v-btn text router to="/components/dashboardUserLayout.vue">Login</v-btn>
        
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