<template>
  <div>
    <div @dblclick="chgDblClickMode({'cardsname' : 'deckcards'});modalShow = !modalShow">
      <draggable v-model="deckcards" group="myGroup" @start="drag=true" @end="drag=false" :options="options">
    {{title}}({{ deckcards.length}})
      </draggable>
    </div>
    <div v-if="modalShow" center :title="this.title">
      <draggable v-model="deckcards" group="myGroup" @start="drag=true" @end="drag=false" :options="options">    
    <div class="itemcard m-0" v-for="(item,index) in deckcards" :key="index">
      	<cardimg :cardwidth="cardwidth" :card="item"></cardimg>
    </div>
      </draggable>    
      <b-button class="mt-3" variant="outline-danger" block @click="chgDblClickMode({'cardsname' : 'deckcards'});modalShow = !modalShow">Close</b-button>
    </div>
     <div v-else>
      <b-button class="mt-0" variant="outline-primary" blodk @click="chgDblClickMode({'cardsname' : 'deckcards'});modalShow = !modalShow">Open</b-button>
    </div>    
  </div>
</template>

<script>
import cardimg from './cardimg'
import draggable from 'vuedraggable'
import CardClass from '../PokemonCard'
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    name: "deckcards",

    components: { draggable , cardimg},

    props: {
	'title': String,
	'cardwidth' : Number
    },
    data () {
        return {
	    modalShow: false,
            options: {
                group: "myGroup",
                animation: 200
            },
        }
    },
    methods: {
	...mapMutations([
	    'setDeckCards',
	    'addCards'
	]),
	...mapActions([
	    'chgDblClickMode'
	])
    },    
    computed: {
	deckcards : {
	     get() {
		 return this.$store.state.deckcards;
	     },
	     set(value) {
		 this.$store.commit('setDeckCards',value);
	     }
	},
	lostzonecards : {
	    get() {
		return this.$store.state.lostzonecards;
	     },
	     set(value) {
		 this.$store.commit('setLostzoneCards',value);
	     }
	},
	trashcards : {
	     get() {
		 return this.$store.state.trashcards;
	     },
	     set(value) {
		 this.$store.commit('setTrashCards',value);
	     }
	},
	sidecards : {
	     get() {
		 return this.$store.state.sidecards;
	     },
	     set(value) {
		 this.$store.commit('setSideCards',value);
	     }
	},
	getImageUrl: function() {
	    return function(item) {
		return 'https://www.pokemon-card.com' + item;
	    }
	},
	getIsUra: function() {
	    return function(item) {
		return item.isUra;
	    }
	},
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
