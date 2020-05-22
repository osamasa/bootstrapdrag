<template>
  <div class="m-5">
    <b-input-group prepend="デッキコード">
	<b-form-input v-model="deckcd" placeholder="デッキコードを入力"></b-form-input>
	<b-input-group-append>
	  <router-link class="btn btn-primary" to="/mydeck">GO</router-link>
	</b-input-group-append>
    </b-input-group>	
  </div>
</template>

<script>
import { mapActions } from 'vuex'    
  export default {
      name: 'Input',
      computed: {
      	deckcd : {
	     get() {
		 return this.$store.state.deckcd;
	     },
	     set(value) {
		 this.$store.commit('setDeckcd',value);
	     }
	},
      },
      created() {
	  this.setNewCurgameid();
      },
      methods : {
	  ...mapGetters([
	      'getCurgameid'
	  ]),
      	  ...mapActions([
	      'createPockemonCardGame'
	  ]),
	  ...mapMutations([
	      'setNewCurgameid'
	  ]),
	  startMyGame : function() {
	      this.createPockemonCardGame();
	      this.$router.push('/mydeck/' + this.getCurgameid())
	  }
      }       
  }
</script>
