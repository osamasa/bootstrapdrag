<template>
  <div @dblclick="modalShow=!modalShow" @click="card.isSelected=!card.isSelected">  
  <b-img :src="card.isUra===false ? getImageUrl(card.img) : 'https://www.pokemon-card.com/assets/images/noimage/poke_ura.jpg'"  v-bind:class="card.isSelected ?  'cardborder' : ''" v-bind:style="{width:cardwidth+'px'}"></b-img>
  <b-modal v-model="modalShow" ok-only>
    <b-img  fluid-grow :src="getImageUrl(card.img)" @dblclick="modalShow=!modalShow" ></b-img>
  </b-modal>
  </div>
</template>

<script>
import CardClass from '../PokemonCard'

export default {
    name: "selectablecardimg",

    props: {
	'card': Object,
	'cardwidth' : Number
    },
    data () {
        return {
	    modalShow: false,
        }
    },
    computed: {
	getImageUrl: function() {
	    return function(item) {
		return 'https://www.pokemon-card.com' + item;
	    }
	}
    },
}
</script>

<style>
  .cardborder {
   border: medium solid #ff00ff;
  }
</style>
