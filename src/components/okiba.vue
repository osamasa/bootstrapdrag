<template>
  <div>
    <div>
      <b-row>
	<b-col cols="5">
	タップで選択
	</b-col>
	<b-col>
	  <b-button size="sm" variant="primary" @click="allSelected({'name' : cardsname})">全選択</b-button>
	</b-col>
	<b-col>
	  <b-button size="sm" variant="primary" @click="allUnSelected({'name' : cardsname})">全解除</b-button>
	</b-col>	
	<b-col>
	  <b-button v-if="hasSelectedCard" size="sm" variant="primary" @click="modalShow=!modalShow">移　動</b-button>
	  <div v-else>　　　</div>
	</b-col>

      </b-row>
    </div>
    <div class="itemcard m-0" v-for="(item,index) in this[cardsname]" :key="item.id">
      <selectablecardimg :cardwidth="cardwidth" :card="item"></selectablecardimg>
    </div>
    <b-modal v-model="modalShow" centered title="移動">
      <b-container>
	<b-row v-if="cardsname!=='mycards'" class="mb-1">
	  <b-col>
	    <b-button @click="moveSelectedCard({'from':cardsname  ,'out':'mycards','rev':true});setSelectedCardsProp({'name':'mycards', 'ura':false});allUnSelected({'name':'mycards'});modalShow=!modalShow" block variant="outline-primary">手札へ</b-button>	
	  </b-col>
	</b-row>
	<b-row v-if="cardsname!=='battlecards'" class="mb-1">
	  <b-col>
	    <b-button @click="moveSelectedCard({'from':cardsname  ,'out':'battlecards','rev':true});setSelectedCardsProp({'name':'battlecards', 'ura':false});allUnSelected({'name':'battlecards'});modalShow=false;" block variant="outline-primary">バトル場へ</b-button>
	  </b-col>
	</b-row>
	<b-row v-if="cardsname!=='studiumscards'" class="mb-1">
	  <b-col>
	    <b-button @click="moveSelectedCard({'from':cardsname  ,'out':'studiumscards','rev':true});setSelectedCardsProp({'name':'studiumscards', 'ura':false});allUnSelected({'name':'studiumscards'});modalShow=false;" block variant="outline-primary">スタジアムへ</b-button>
	  </b-col>
	</b-row>
	<b-row v-if="cardsname!=='deckcards'" class="mb-1">
	  <b-col>
	    <b-button @click="moveSelectedCard({'from':cardsname  ,'out':'deckcards','rev':true});setSelectedCardsProp({'name':'deckcards', 'ura':false});allUnSelected({'name':'deckcards'});modalShow=false;" block variant="outline-primary">山札へ</b-button>		  </b-col>
	</b-row>
	<b-row v-if="cardsname!=='sidecards'" class="mb-1">
	  <b-col>
	    <b-button @click="moveSelectedCard({'from':cardsname  ,'out':'sidecards','rev':true});setSelectedCardsProp({'name':'sidecards', 'ura':false});allUnSelected({'name':'sidecards'});modalShow=false;" block variant="outline-primary">サイドへ</b-button>
	  </b-col>
	</b-row>
	<b-row v-if="cardsname!=='trashcards'" class="mb-1">
	  <b-col>
	    <b-button @click="moveSelectedCard({'from':cardsname  ,'out':'trashcards','rev':true});setSelectedCardsProp({'name':'trashcards', 'ura':false});allUnSelected({'name':'trashcards'});modalShow=false;" block variant="outline-primary">トラッシュへ</b-button>		  </b-col>
	</b-row>
	<b-row v-if="cardsname!=='lostzonecards'" class="mb-1">
	  <b-col>
	    <b-button @click="moveSelectedCard({'from':cardsname  ,'out':'lostzonecards','rev':true});setSelectedCardsProp({'name':'lostzonecards', 'ura':false});allUnSelected({'name':'lostzonecards'});modalShow=false;" block variant="outline-primary">ロストゾーンへ</b-button>

	  </b-col>
	</b-row>
	<b-row class="mb-1">
	  <b-col>
	    <b-form-select
	      v-model="selectbenchno"
	      :options="benchno"
	      ></b-form-select>
	  </b-col>	  
	  <b-col>
	     の<b-button @click="moveSelectedCard({'from':cardsname,'out':'bench' + selectbenchno + 'cards','rev':true});setSelectedCardsProp({'name':'bench' + selectbenchno + 'cards', 'ura':false});allUnSelected({'name':'bench' + selectbenchno + 'cards'});modalShow=false;" variant="primary">ベンチへ</b-button>
	  </b-col>
	</b-row>		
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import selectablecardimg from './selectablecardimg'
import { CardClass } from '../PokemonCard.js'
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    name: "cardokiba",

    components: { draggable, selectablecardimg },

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
	    modalShow: false,
	    selectbenchno : 1,
	    benchno : [1,2,3,4,5],
        }
    },
    methods: {
         onmove: (e) => {
          console.log("onmove",e);
          return true
         },
	...mapMutations([
	    'allSelected',
	    'allUnSelected',
	    'moveSelectedCard',
	    'selectCardFromTop',
	    'setSelectedCardsProp',
	    'allOmote'
	]),	
    },
    computed: {
	hasSelectedCard : function() {
	    return CardClass.hasSelectedCard(this.$store.state[this.cardsname])
	},
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
