<template>
  <div>{{nottile && innerMycarditems.length > 0 ? '' : this.title}}
     <draggable v-model="innerMycarditems" group="myGroup" @start="drag=true"  @end="drag=false" :options="options" >
      <div class="itemcard m-0" v-for="(item,index) in innerMycarditems" :key="item.id">
      	<selectablecardimg :cardwidth="cardwidth" :card="item"></selectablecardimg></div>
     </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import selectablecardimg from './selectablecardimg'

export default {
    name: "cardokiba",

    components: { draggable, selectablecardimg},

    props: {
        'nottile' : Boolean,
	'cardsname': String,
	'title': String,
	'cardwidth': Number,
    },
    
    data () {
        return {
            options: {
                group: "myGroup",
                animation: 200,

            },
	    setternames: {
		'deckcards' : 'setDeckCards',
		'battlecards' : 'setBattleCards',
		'bench1cards' : 'setBench1Cards',
		'bench2cards' : 'setBench2Cards',
		'bench3cards' : 'setBench3Cards',
		'bench4cards' : 'setBench4Cards',		
		'bench5cards' : 'setBench5Cards',
		'lostzonecards' : 'setLostzoneCards',
		'trashcards' : 'setTrashCards',
		'mycards' : 'setMyCards',
		'sidecards' : 'setSideCards',
		'studiumscards' : 'setStudiumsCards'	
	    }	    
        }
    },
    computed: {
    	innerMycarditems : {
	    get() {
		 return this.$store.state[this.cardsname];
	     },
	    set(value) {
		this.$store.commit(this.setternames[this.cardsname],value)
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
</style>
