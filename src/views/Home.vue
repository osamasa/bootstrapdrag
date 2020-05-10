<template>
  <div>
    <div v-if="getIsLoading" class="d-flex justify-content-center mb-3">
      <b-spinner label="Loading..."></b-spinner>
    </div>    
    <hello-world />
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
