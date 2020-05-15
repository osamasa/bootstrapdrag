<template>
  <div>
    <draggable v-model="innerMycarditems" group="myGroup" @start="drag=true" @end="drag=false">{{nottile && innerMycarditems.length > 0 ? '' : this.title}}{{nottile ? '' : '(' + innerMycarditems.length + ')'}}
    </draggable>
    <b-modal v-model="cardmodalShow"  size="xl" centered :title="titles[cardsname]" ok-only>
      <div>
	<div>
	  <b-row>
	    <b-col cols="3">
	      タップで選択
	    </b-col>
	    <b-col>
	      <b-button size="sm" variant="primary" @click="allSelected({'name' : cardsname})">全選択</b-button>
	    </b-col>
	    <b-col>
	      <b-button size="sm" variant="primary" @click="allUnSelected({'name' : cardsname})">全解除</b-button>
	    </b-col>
	    <b-col>
	      <b-button v-if="hasSelectedCard" size="sm" @click="setSelectedCardsProp({'name':cardsname, 'ura':false});allUnSelected({'name':cardsname});" variant="primary">表に</b-button>
	    </b-col>
	    <b-col>
	      <b-button v-if="hasSelectedCard" @click="setSelectedCardsProp({'name':cardsname, 'ura':true});allUnSelected({'name':cardsname});" size="sm" variant="primary">裏に</b-button>
	    </b-col>
	  </b-row>
	  <b-row v-if="hasSelectedCard">
    <b-col>
      <b-input-group>
	      <b-form-select
		v-model="selecdeck"
		:options="getMoveabeldeckNames(cardsname)"
    ></b-form-select>
	<b-input-group-append>    
    <b-button  size="sm" variant="info" @click="moveSelectedCard({'from':cardsname  ,'out': selecdeck,'rev':getSelectrev(selecdeck)});allSelected({'name' : selecdeck});setSelectedCardsProp({'name':selecdeck, 'ura':getSelectura(selecdeck)});allUnSelected({'name':selecdeck});doWithShufftle();cardmodalShow=!cardmodalShow">移動</b-button>
    </b-input-group-append>
    </b-input-group>
	    </b-col >
	    <b-col cols="6" v-if="cardsname==='deckcards'">
	      <b-form-checkbox
		id="checkbox-1"
		v-model="shstatus"
		name="checkbox-1"
		:value=true
		:unchecked-value=false
		>
		移動後シャッフルする
	      </b-form-checkbox>
	    </b-col>	
	  </b-row>
	</div>
     <draggable v-model="innerMycarditems" group="myGroup" @start="drag=true"  @end="drag=false" :options="options" >	
	<div class="itemcard m-0" v-for="(item,index) in innerMycarditems" :key="item.id">
	  <selectablecardimg :cardwidth="cardwidth" :card="item"></selectablecardimg>
	</div>
	</draggable>
      </div>
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
	'cardwidth': Number,
	'nottile' : Boolean
    },
    
    data () {
        return {
            options: {
                group: "myGroup",
                animation: 200
	    },
	    titles : {
		'battlecards' : 'バトル場のカードを選択し移動',
		'studiumscards' : 'スタジアムのカードを選択し移動',	    
		'mycards' : '手札のカードを選択し移動',
		'bench1cards' : 'ベンチ１のカードを選択し移動',
		'bench2cards' : 'ベンチ２のカードを選択し移動',
		'bench3cards' : 'ベンチ３のカードを選択し移動',
		'bench4cards' : 'ベンチ４のカードを選択し移動',
		'bench5cards' : 'ベンチ５のカードを選択し移動',	    
		'deckcards' : '山札のカードを選択し移動',
		'sidecards' : 'サイドのカードを選択し移動',
		'lostzonecards' : 'ロストゾーンのカードを選択し移動',
		'trashcards' : 'トラッシュのカードを選択し移動'
	    },
	    selectbenchno : 1,
	    benchno : [1,2,3,4,5],
	    selecdeck : 'deckcards',
	    shstatus : true,
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
	    },
        }
    },
    methods: {
        doWithShufftle: function() {
	    if(this.shstatus && (this.cardsname==='deckcards')) {
		this.$store.commit(this.setternames[this.cardsname],CardClass.shuffleCards(this.$store.state[this.cardsname]));
	    }
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
	...mapGetters([
	    'getSelectrev',
	    'getSelectura',
	    'getMoveabeldeckNames'
	]),    
	hasSelectedCard : function() {
	    return CardClass.hasSelectedCard(this.$store.state[this.cardsname])
	},
    	innerMycarditems : {
	    get() {
		 return this.$store.state[this.cardsname];
	     },
	    set(value) {
		this.$store.commit(this.setternames[this.cardsname],value)
	     }
	},
	cardmodalShow : {
	    get() {
		 return this.$store.state.cardmodalShow[this.cardsname];
	     },
	    set(value) {
		this.$store.commit('setCardmodalShow',{'name' : this.cardsname,'value': value})
	     }
	},

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
