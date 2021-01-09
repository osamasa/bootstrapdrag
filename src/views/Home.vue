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
	  ]),
	  getGameURL: function() {
	      return 'https://pokemoncard-31df1.web.app/m/' + this.$store.getters.getDeckcd;
	  },	  
      },
      created() {
	  if(this.$route.params.deckcd) {
	      this.$store.commit('setDeckcd',this.$route.params.deckcd)
	  }
      }
  }
</script>
