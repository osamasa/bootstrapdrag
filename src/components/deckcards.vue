<template>
  <div @dblclick="chgDblClickMode({'cardsname' : 'deckcards'})">
   <draggable v-model="deckcards" group="myGroup" @start="drag=true" @end="drag=false" :options="options">
    {{title}}({{ deckcards.length}})
    </draggable>
  </div>
</template>

<script>
import cardimg from './cardimg'
import draggable from 'vuedraggable'
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
  .item:hover {
    cursor: grab;
  }
  .item:active {
    cursor: grabbing;
  }
</style>
