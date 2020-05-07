<template>
  <div>
    <div>
      <draggable v-model="trashcards" group="myGroup" @start="drag=true" @end="drag=false" :options="options">
    {{title}}({{ trashcards.length}})
      </draggable>
    </div>
    <div v-if="modalShow || dblclicknm !==''" center :title="this.title">
      <draggable v-model="trashcards" group="myGroup" @start="drag=true" @end="drag=false" :options="options">    
    <div class="itemcard m-0" v-for="(item,index) in trashcards" :key="index">
      	<cardimg :cardwidth="cardwidth" :card="item"></cardimg>	          
    </div>
      </draggable>    
      <b-button v-if="dblclicknm==='trashcards'" class="mt-3" variant="outline-danger" block @click="chgDblClickMode({'cardsname' : 'trashcards'});modalShow = !modalShow">Close</b-button>
    </div>
     <div v-else>
      <b-button class="mt-0" variant="outline-primary" blodk @click="chgDblClickMode({'cardsname' : 'trashcards'});modalShow = !modalShow">Open</b-button>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import CardClass from '../PokemonCard'
import cardimg from './cardimg'
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    name: "trashcards",

    components: { draggable,cardimg },

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
	dblclicknm : {
	    get() {
		return this.$store.state.dblclicknm;
	    },
	    set(value) {
		setDblclicknm(value);
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
