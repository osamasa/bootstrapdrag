<template>
  <div class="position-relative itemcard m-0">
    <div :style="{'left' : (innerMycarditems.length-1)*10-10*index + 'px', 'top': '-5px'}" class="position-absolute" v-for="index of innerMycarditems.length" :key="index">
      <cardimg  :cardwidth="cardwidth" :card="innerMycarditems[innerMycarditems.length-index]" :index="index">
      </cardimg>
    </div>
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
		this.$store.commit(this.setternames[this.cardsname], value);
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
