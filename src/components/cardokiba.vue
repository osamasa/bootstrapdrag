<template>
  <div>{{nottile && innerMycarditems.length > 0 ? '' : this.title}}
     <draggable v-model="innerMycarditems" group="myGroup" @start="drag=true"  @end="drag=false" :options="options" >
      <div class="itemcard m-0" v-for="(item,index) in innerMycarditems" :key="item.id">
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
		'mycards' : 'setMyCards',
		'bench1cards' : 'setBench1Cards',
		'bench2cards' : 'setBench2Cards',
		'bench3cards' : 'setBench3Cards',
		'bench4cards' : 'setBench4Cards',		
		'bench5cards' : 'setBench5Cards',
		'battlecards' : 'setBattleCards',
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
  .item:hover {
    cursor: grab;
  }
  .item:active {
    cursor: grabbing;
  }
</style>
