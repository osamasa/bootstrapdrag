<template>
  <div @dblclick="chgDblClickMode({'cardsname' : 'sidecards'})">
      <draggable v-model="sidecards" group="myGroup" @start="drag=true" @end="drag=false" :options="options">
    {{title}}({{ sidecards.length}})
      </draggable>
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
    name: "sidecards",

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
    },
}
</script>
