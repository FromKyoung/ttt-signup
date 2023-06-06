<template>
  <div id="app">
    <NavbarSection />
    <router-view></router-view>
  </div>
</template>

<script>
//Navbar가져오기
import NavbarSection from './components/NavbarSection.vue'

export default {
  name: 'app',
  components: {NavbarSection},
  data () {
    return {
      
    }
  }
}
</script>

<style>

</style>
