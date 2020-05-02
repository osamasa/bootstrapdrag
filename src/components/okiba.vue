<template>
<div>
  <div @dblclick="showModal();">
    <draggable v-model="mycarditems" group="myGroup" @start="drag=true" @end="drag=false" :options="options">
      {{ this.title }}
    </draggable>
  </div>
  <b-modal ref="my-modal" hide-footer :title="this.title">
       <div class="item m-0" v-for="(item,index) in mycarditems" :key="item.id" style="z-index:1">{{item.name}}</div>
       
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
    </b-modal>  
</div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    name: "okiba",

    components: { draggable },

    props: {
	'cardsname': String,
	'title': String
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
      showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      toggleModal() {
        // We pass the ID of the button that we want to return focus to
        // when the modal has hidden
        this.$refs['my-modal'].toggle('#toggle-btn')
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
		 this.$store.dispatch('setMyCards', {'mycards':value})
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
	}

    }
}
</script>
