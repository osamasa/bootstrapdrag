<template>
  <div>
    <b-overlay :show="getIsLoading" rounded="sm">
      <div align="right">
	<b-btn
	  v-clipboard:copy="getGameURL"
	  v-clipboard:success="onCopy"
	  v-clipboard:error="onError"
	  variant="danger">URLをコピーする</b-btn>
      </div>
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
      },
      methods: {
	  onCopy: function (e) {
	      alert('コピーしました: ' + e.text)
	  },
	  onError: function (e) {
	      alert('Failed to copy texts')
	  }	
      }
  }
</script>
