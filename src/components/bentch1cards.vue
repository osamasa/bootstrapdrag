<template>
  <div>
    <div @dblclick="chgDblClickMode({'cardsname' : 'bentch1cards'});modalShow = !modalShow">
      <draggable v-model="bentch1cards" group="myGroup" @start="drag=true" @end="drag=false" :options="options">
    {{title}}({{ bentch1cards.length}})
      </draggable>
    </div>
  </div>
</template>

<script>
import cardimg from './cardimg'
import draggable from 'vuedraggable'
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    name: "bentch1cards",

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
	bentch1cards : {
	    get() {
		return this.$store.state.bentch1cards;
	    },
	    set(value) {
		this.$store.commit('setBench1Cards',value);
	    }
	},
	bentch2cards : {
	    get() {
		return this.$store.state.bentch2cards;
	    },
	    set(value) {
		this.$store.commit('setBench2Cards',value);
	    }
	},
	bentch3cards : {
	    get() {
		return this.$store.state.bentch3cards;
	    },
	    set(value) {
		this.$store.commit('setBench3Cards',value);
	    }
	},
	bentch4cards : {
	    get() {
		return this.$store.state.bentch4cards;
	    },
	    set(value) {
		this.$store.commit('setBench4Cards',value);
	    }
	},
	bentch5cards : {
	    get() {
		return this.$store.state.bentch5cards;
	    },
	    set(value) {
		this.$store.commit('setBench5Cards',value);
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
