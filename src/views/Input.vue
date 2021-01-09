<template>  
  <div class="m-5">
    <a href="https://www.pokemon-card.com/deck/">公式ホームページ</a>で作成したデッキコードを入力しGOボタンを押してください
    <b-input-group prepend="デッキコード">
      <b-form-input v-model="deckcd" placeholder="デッキコードを入力"></b-form-input>
	<b-input-group-append>
	  <router-link class="btn btn-primary" :to="'/m/' + this.deckcd + '/' + (this.isMugenDinner ? '1' : '0')">GO</router-link>
	</b-input-group-append>	
    </b-input-group>
    <div clss="mt-1">
    <b-form-checkbox v-model="isMugenDinner" name="check-button" switch>
      ムゲンダイナモード<b>({{ isMugenDinner ? 'ON' : 'OFF' }})</b>
    </b-form-checkbox>
    </div>    
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'
export default {
    name: 'Input',
    methods: {
	...mapMutations([
	    'setIsMugenDinner'
	]),
    },
      computed: {
	...mapGetters([
	    'getIsMugenDinner'
	]),	  
	isMugenDinner : {
	    get() {
		return this.getIsMugenDinner;
	    },
	    set(value) {
		this.setIsMugenDinner(value);
	    }
	},	  
      	deckcd : {
	     get() {
		 return this.$store.state.deckcd;
	     },
	     set(value) {
		 this.$store.commit('setDeckcd',value);
	     }
	},
      }
  }
</script>
