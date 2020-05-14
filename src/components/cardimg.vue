<template>
  <div>
  <b-img :src="card.isUra===false ? getImageUrl(card.img) : 'https://www.pokemon-card.com/assets/images/noimage/poke_ura.jpg'" v-bind:style="{width:cardwidth+'px'}" @dblclick="modalShow=!modalShow"></b-img>
  <b-modal v-model="modalShow" ok-only>
    <b-img fluid-grow :src="getImageUrl(card.img)" @dblclick="modalShow=!modalShow" ></b-img>
  </b-modal>
  </div>
</template>

<script>
import CardClass from '../PokemonCard'

export default {
    name: "cardimg",

    props: {
	'card': Object,
	'cardwidth' : Number,
	'index' : Number
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

