
<template>
 <div class="bg">
    <v-container fluid>
    <v-layout row wrap>
      <v-flex class="text-xs-center" mt-5>
        <h1>Home page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>Welcome to barbarbershop</p>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
  
</template>

<style>
  body, html {
    height: 100%;
  }
  .bg {
    /* The image used */
    background-image: url('http://localhost/PAWTubesUAS/BackendTubes-master/upload/bg.jpg');

    /* Full height */
    height: 100%;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>

<script>
export default {
  data() {
    return {
    }
  },
  mounted(){
    localStorage.setItem("type", 0);
  }
}
</script>