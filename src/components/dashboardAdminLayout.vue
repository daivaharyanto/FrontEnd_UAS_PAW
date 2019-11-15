<template>
  <div>
      <v-navigation-drawer
      v-model="drawer"
      class="grey darken-3"
      dark
      app
      clipped
      fixed
      temporary
      >
      <v-list-item>
        <v-list-item-content>
        <v-list-item-title class="title">
          ADMIN PAGE
        </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
      <v-divider></v-divider>
      <v-list>
        
        <v-list-item
        v-for="item in items"
        :key="item.title"
        router
        :to= "item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
        </v-list-item> 
      </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn  text router to="/components/dashboardLayout.vue" block>Logout</v-btn>
      </div>
    </template>
    </v-navigation-drawer>
    
    <v-app-bar 
      dark
      app
      fixed
      clipped-left
      height="70px"
      color="grey darken-3">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <VSpacer /> 
      
      <!-- <img src="../assets/logo.svg" style="height:45px;width:45px"> -->
      
      <v-toolbar-title 
        style="font-size: 21px;" 
        class="white--text ml-2"
      > 
        Barbarbershop
      </v-toolbar-title>
    </v-app-bar> 
    
    <VContent >
      <router-view />
    </VContent> 
  </div>
</template>

<script>
  export default { 
    data () { 
      return { 
        drawer: null, 
        items: [ 
          { title: 'User Controller', icon: 'mdi-human-male', link: '/' }, 
          { title: 'Barber Controller', icon: 'mdi-content-cut', link: '/dashboardAdminContents/barberController'}, 
          { title: 'Hairstyle Controller', icon: 'mdi-face', link: '/dashboardAdminContents/hairstyleController'},
          { title: 'Service Controller', icon: 'mdi-palette-swatch', link: '/dashboardAdminContents/serviceController'},
          { title: 'Transaction Controller', icon: 'mdi-paper-roll-outline', link: '/dashboardAdminContents/transactionController'},
          { title: 'Report', icon: 'mdi-file-pdf', link: '/dashboardAdminContents/reportController' }
        ], 
        selectedItems: []
      } 
    }, 
    methods: {
      updateSelected (selectedItems) {
      },
    }
  }
</script>
