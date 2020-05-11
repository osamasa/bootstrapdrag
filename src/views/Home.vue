<template>
  <div>
    <b-overlay :show="getIsLoading" rounded="sm">
    <hello-world />
    </b-overlay>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'  
  import HelloWorld from '../components/root'
  export default {
      name: 'Home',
      components: {
	  HelloWorld,
      },
      computed: {
	  ...mapGetters([
	      'getIsLoading'
	  ])
      }
  }
</script>
