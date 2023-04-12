<template>

  <div :class="this.$route.name != 'login' ? 'layout-fluid': ''" class="theme-light">
      <div class="page">
        <!-- Navbar -->
        <Header v-if="this.$route.name != 'login'" />  

        <!-- page -->
        <div class="page-wrapper">
          <div class="page-body">
            <div class="container-xl">
              <slot name="content"></slot>
              <router-view></router-view>

            </div>
          </div>
        </div>
        
      </div>
  </div>

</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components:{
    Header
  },
  data(){
    return{
      token:null
    }
  },
  created(){
    this.token = localStorage.accessToken
    console.log(typeof this.token);
  }
}
</script>

<style>

</style>
