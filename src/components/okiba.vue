<template>
  <div>
    <div>
      <b-row>
	<b-col cols="1">
	タップで選択
	</b-col>
	<b-col>
	  <b-button size="sm" variant="primary" @click="allSelected({'name' : cardsname})">全選択</b-button>
	</b-col>
	<b-col>
	  <b-button size="sm" variant="primary" @click="allUnSelected({'name' : cardsname})">全解除</b-button>
    </b-col>
	<b-col>
	  <b-button v-if="hasSelectedCard" size="sm" @click="setSelectedCardsProp({'name':cardsname, 'ura':false});" variant="primary">表　に</b-button>
    </b-col>
	<b-col>
	  <b-button v-if="hasSelectedCard" @click="setSelectedCardsProp({'name':cardsname, 'ura':true});" size="sm" variant="primary">裏　に</b-button>
	</b-col>	    
	<b-col>
	  <b-button v-if="hasSelectedCard" size="sm" variant="primary" @click="modalShow=!modalShow">移　動</b-button>
	  <div v-else>　　　</div>
	</b-col>

      </b-row>
    </div>
    <div class="itemcard m-0" v-for="(item,index) in innerMycarditems" :key="item.id">
      <selectablecardimg :cardwidth="cardwidth" :card="item"></selectablecardimg>
    </div>
    <b-modal v-model="modalShow" centered title="移動">
    <b-container>
	<b-row class="mb-1" v-if="cardsname==='deckcards'">
	  <b-col>
	    <b-form-checkbox
	      id="checkbox-1"
	      v-model="shstatus"
	      name="checkbox-1"
	      :value=true
	      :unchecked-value=false
	      >
	      移動した後、シャッフルを行う
	    </b-form-checkbox>
	  </b-col>
	</b-row>	      
	<b-row v-if="cardsname!=='mycards'" class="mb-1">
	  <b-col>
	    <b-button @click="moveSelectedCard({'from':cardsname  ,'out':'mycards','rev':true});setSelectedCardsProp({'name':'mycards', 'ura':false});allUnSelected({'name':'mycards'});doWithShufftle();modalShow=!modalShow" block variant="outline-primary">手札へ</b-button>	
	  </b-col>
	</b-row>
	<b-row v-if="cardsname!=='battlecards'" class="mb-1">
	  <b-col>
	    <b-button @click="moveSelectedCard({'from':cardsname  ,'out':'battlecards','rev':true});setSelectedCardsProp({'name':'battlecards', 'ura':false});allUnSelected({'name':'battlecards'});doWithShufftle();modalShow=!modalShow" block variant="outline-primary">バトル場へ</b-button>
	  </b-col>
	</b-row>
	<b-row v-if="cardsname!=='studiumscards'" class="mb-1">
	  <b-col>
	    <b-button @click="moveSelectedCard({'from':cardsname  ,'out':'studiumscards','rev':true});setSelectedCardsProp({'name':'studiumscards', 'ura':false});allUnSelected({'name':'studiumscards'});doWithShufftle();modalShow=!modalShow" block variant="outline-primary">スタジアムへ</b-button>
	  </b-col>
	</b-row>
	<b-row v-if="cardsname!=='deckcards'" class="mb-1">
	  <b-col>
	    <b-button @click="moveSelectedCard({'from':cardsname  ,'out':'deckcards','rev':true});setSelectedCardsProp({'name':'deckcards', 'ura':false});allUnSelected({'name':'deckcards'});doWithShufftle();modalShow=!modalShow" block variant="outline-primary">山札へ</b-button>		  </b-col>
	</b-row>
	<b-row v-if="cardsname!=='sidecards'" class="mb-1">
	  <b-col>
	    <b-button @click="moveSelectedCard({'from':cardsname  ,'out':'sidecards','rev':true});setSelectedCardsProp({'name':'sidecards', 'ura':false});allUnSelected({'name':'sidecards'});doWithShufftle();modalShow=!modalShow" block variant="outline-primary">サイドへ</b-button>
	  </b-col>
	</b-row>
	<b-row v-if="cardsname!=='trashcards'" class="mb-1">
	  <b-col>
	    <b-button @click="moveSelectedCard({'from':cardsname  ,'out':'trashcards','rev':true});setSelectedCardsProp({'name':'trashcards', 'ura':false});allUnSelected({'name':'trashcards'});doWithShufftle();modalShow=!modalShow" block variant="outline-primary">トラッシュへ</b-button>		  </b-col>
	</b-row>
	<b-row v-if="cardsname!=='lostzonecards'" class="mb-1">
	  <b-col>
	    <b-button @click="moveSelectedCard({'from':cardsname  ,'out':'lostzonecards','rev':true});setSelectedCardsProp({'name':'lostzonecards', 'ura':false});allUnSelected({'name':'lostzonecards'});doWithShufftle();modalShow=!modalShow" block variant="outline-primary">ロストゾーンへ</b-button>

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
	     の<b-button @click="moveSelectedCard({'from':cardsname,'out':'bench' + selectbenchno + 'cards','rev':true});setSelectedCardsProp({'name':'bench' + selectbenchno + 'cards', 'ura':false});allUnSelected({'name':'bench' + selectbenchno + 'cards'});doWithShufftle();modalShow=!modalShow" variant="primary">ベンチへ</b-button>
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
		'studiumscards' : 'setStudiumsCards'	
	    }	    
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
