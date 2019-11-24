<template> 
  <v-app> 
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script> 
export default { 
  name: 'app' ,
  watch: {
    '$route':{
      handler: (to,from) =>{
      document.title = to.meta.title || 'Barbarbershop'
    },
      immediate: true
    }
  }

};
</script>
