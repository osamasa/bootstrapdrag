<template>
  <div>
  <b-img :src="card.isUra===false ? getImageUrl(card.img) : 'https://www.pokemon-card.com/assets/images/noimage/poke_ura.jpg'" v-bind:style="{width:cardwidth+'px'}" @dblclick="modalShow=!modalShow" ></b-img>
  <b-modal v-model="modalShow">
    <b-img  fluid-grow :src="getImageUrl(card.img)" @dblclick="modalShow=!modalShow" ></b-img>
  </b-modal>
  </div>
</template>

<script>
import CardClass from '../PokemonCard'

export default {
    name: "cardimg",

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
  .itemcard {
    display: inline-block;
    margin: 1px;
    padding: 1px;
    background-color: #ffffff;
  }
  .item:hover {
    cursor: grab;
  }
  .item:active {
    cursor: grabbing;
  }
</style>
