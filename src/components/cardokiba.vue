<template>
  <div>{{this.title}}
     <draggable v-model="mycarditems" group="myGroup" @start="drag=true" :move="onmove" @end="drag=false" :options="options" >
      <div class="itemcard m-0" v-for="(item,index) in mycarditems" :key="item.id">
      	<cardimg :cardwidth="cardwidth" :card="item"></cardimg></div>
     </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import cardimg from './cardimg'

export default {
    name: "cardokiba",

    components: { draggable, cardimg},

    props: {
	'cardsname': String,
	'title': String,
	'cardwidth': Number
    },
    
    data () {
        return {
            options: {
                group: "myGroup",
                animation: 200
            },
	    mycarditems:[]
        }
    },
    mounted: function () {
        this.mycarditems = this.$store.state[this.cardsname];
    },
    methods: {
         onmove: (e) => {
          console.log("onmove",e);
          return true
        }
    },
    computed: {
	deckcards : {
	     get() {
		 return this.$store.state.deckcards;
	     },
	     set(value) {
		 this.$store.dispatch('setDeckCards', value)
	     }
	},
	battlecards: {
	     get () {
		 return this.$store.state.battlecards;
	     },
	     set (value) {
		 this.$store.dispatch('setBattleCards', value)
	     }	    
	},
	bench1cards : {
	    get () {
		return this.$store.state.bench1cards;
	    },
	    set (value) {
		 this.$store.dispatch('setBench1Cards', value)
	     }	    
	},	    
	bench2cards : {
	    get () {
		return this.$store.state.bench2cards;
	    },
	     set (value) {
		 this.$store.dispatch('setBench2Cards', value)
	     }
	},
	bench3cards : {
	    get () {
		return this.$store.state.bench3cards;
	    },
	     set (value) {
		 this.$store.dispatch('setBench3Cards', value)
	     }
	},
	bench4cards : {
	    get () {
		return this.$store.state.bench4cards;
	    },
	     set (value) {
		 this.$store.dispatch('setBench4Cards', value)
	     }
	},	    
	bench5cards : {
	    get () {
		return this.$store.state.bench5cards;
	    },
	     set (value) {
		 this.$store.dispatch('setBench5Cards', value)
	     }
	},	    
	lostzonecards : {
	    get () {
		return this.$store.state.lostzonecards;
	    },
	     set (value) {
		 this.$store.dispatch('setLostzoneCards', value)
	     }
	},	    	    
	trashcards: {
	    get () {
		return this.$store.state.trashcards;
	    },
	     set (value) {
		 this.$store.dispatch('setTrashCards', value)
	     }
	},	    	  	    
  	  	    	    
	studiumscards : {
	    get () {
		return this.$store.state.studiumscards;
	    },
	     set (value) {
		 this.$store.dispatch('setStudiumsCards', value)
	     }
	},
	mycards: {
	    get () {
		return this.$store.state.mycards;
	    },
	     set (value) {
		 this.$store.dispatch('setMyCards', value)
	     }
	
	},
	sidecards:{
	    get () {
		return this.$store.state.sidecards;
	    },
	     set (value) {
		 this.$store.dispatch('setSideCards', value)
	     }
	},	    	  	    	    	    	    
	deckcd: {
	    get () {
		return this.$store.state.deckcd;
	    },
	     set (value) {
		 this.$store.dispatch('setDeckcd', value)
	     }
	},
	getImageUrl: function() {
	    return function(i) {
		return 'https://www.pokemon-card.com' + i;
	    }
	}
    }	
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
