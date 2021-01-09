<template>  
  <div class="m-5">
    <a href="https://www.pokemon-card.com/deck/">公式ホームページ</a>で作成したデッキコードを入力しGOボタンを押してください
    <b-input-group prepend="デッキコード">
	<b-form-input v-model="deckcd" placeholder="デッキコードを入力"></b-form-input>
	<b-input-group-append>
	  <router-link class="btn btn-primary" to="/mydeck">GO</router-link>
	</b-input-group-append>
    </b-input-group>	
  </div>
</template>

<script>
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
      }
  }
</script>
