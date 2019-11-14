<template>
  <v-app>
    <v-app-bar app>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text router to="/">Home</v-btn>
        <v-btn text router to="/ContactUs">Contact Us</v-btn>
        <v-btn text router to="/Signup">Signup</v-btn>
        <v-btn text router to="/Login">Login</v-btn>
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