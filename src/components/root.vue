<template>
  <div>
    <b-container>
      <b-row style='height: 130px'>
	<b-col class="bg-light border">
	  <small class="text-muted">
	    <cardokiba cardsname="battlecards" :nottile=true title="ﾊﾞﾄﾙ場" :cardwidth=20></cardokiba>
	    <b-button variant="outline-primary" @click="cardmodalShow=!cardmodalShow;dblclicknm='battlecards'" size="sm">OPEN</b-button>	    
	  </small>
	</b-col>
	<b-col class="bg-light border">
	  <small class="text-muted">    
	    <cardokiba cardsname="studiumscards" :nottile=true title="ｽﾀｼﾞｱﾑ" :cardwidth=60></cardokiba>
	    <b-button variant="outline-primary" @click="cardmodalShow=!cardmodalShow;dblclicknm='studiumscards'" size="sm">OPEN</b-button>	    
	</small></b-col>
	<b-col>
	  <b-row class="h-50">
	    <b-col class="zoomable bg-light border"><small class="text-muted"><draggable v-model="deckcards" group="myGroup" @start="drag=true" @end="drag=false">山札({{deckcards.length}})<b-button size="sm" variant="outline-primary" @click="cardmodalShow=!cardmodalShow;dblclicknm='deckcards'">OPEN</b-button></draggable></small></b-col>
	  </b-row>
	  <b-row class="h-50">
	    <b-col class="zoomable bg-light border"><small class="text-muted"><draggable v-model="sidecards" group="myGroup" @start="drag=true" @end="drag=false">サイド({{sidecards.length}})<b-button size="sm" variant="outline-primary" @click="cardmodalShow=!cardmodalShow;dblclicknm='sidecards'">OPEN</b-button></draggable></small></b-col>
	  </b-row>
	</b-col>
	<b-col>
	  <b-row class="h-50">    
	    <b-col class="zoomable bg-light border"><small class="text-muted"><draggable v-model="trashcards" group="myGroup" @start="drag=true" @end="drag=false">ﾄﾗｯｼｭ({{trashcards.length}})<b-button size="sm" variant="outline-primary" @click="cardmodalShow=!cardmodalShow;dblclicknm='trashcards'">OPEN</b-button></draggable></small></b-col>
	  </b-row>
	  <b-row class="h-50">    
	    <b-col class="zoomable bg-light border"><small class="text-muted"><draggable v-model="lostzonecards" group="myGroup" @start="drag=true" @end="drag=false">ﾛｽﾄｿﾞｰﾝ({{lostzonecards.length}})<b-button size="sm" variant="outline-primary" @click="cardmodalShow=!cardmodalShow;dblclicknm='lostzonecards'">OPEN</b-button></draggable></small></b-col>
	  </b-row>
	</b-col>
      </b-row>      
      <b-row style='height: 140px'>
	<b-col class="bg-light border">
	  <small class="text-muted">
	    <cardokiba cardsname="bench1cards" :nottile=true title="ベンチ1" :cardwidth=20></cardokiba>
	    <b-button variant="outline-primary" @click="cardmodalShow=!cardmodalShow;dblclicknm='bench1cards'" size="sm">OPEN</b-button>
	  </small>
	</b-col>
	<b-col class="bg-light border">
	  <small class="text-muted">    
	    <cardokiba cardsname="bench2cards" :nottile=true title="ベンチ2" :cardwidth=20></cardokiba>
	    <b-button variant="outline-primary" @click="cardmodalShow=!cardmodalShow;dblclicknm='bench2cards'" size="sm">OPEN</b-button>
	  </small>
	</b-col>
	<b-col class="bg-light border">
	  <small class="text-muted">        
	    <cardokiba cardsname="bench3cards" :nottile=true title="ベンチ3" :cardwidth=20></cardokiba>
	    <b-button variant="outline-primary" @click="cardmodalShow=!cardmodalShow;dblclicknm='bench3cards'" size="sm">OPEN</b-button>
	  </small>
	</b-col>
	<b-col class="bg-light border">
	  <small class="text-muted">            
	    <cardokiba cardsname="bench4cards" :nottile=true title="ベンチ4" :cardwidth=20></cardokiba>
	    <b-button variant="outline-primary" @click="cardmodalShow=!cardmodalShow;dblclicknm='bench4cards'" size="sm">OPEN</b-button>
	  </small>
	</b-col>
	<b-col class="bg-light border">
	  <small class="text-muted">                
	    <cardokiba cardsname="bench5cards" :nottile=true title="ベンチ5" :cardwidth=20></cardokiba>
	    <b-button variant="outline-primary" @click="cardmodalShow=!cardmodalShow;dblclicknm='bench5cards'" size="sm">OPEN</b-button>
	  </small>
	</b-col>	
      </b-row>
      <b-row class="row item">
	<b-col>
    <small class="text-muted">
    手札&nbsp;<b-button variant="outline-primary" @click="cardmodalShow=!cardmodalShow;dblclicknm='mycards'" size="sm">OPEN</b-button>
	    <cardokiba cardsname="mycards":cardwidth=60></cardokiba>
	  </small>
	</b-col>
      </b-row>    
    </b-container>      

    <div class="fixed-bottom d-flex flex-row-reverse p-2">
      <button @click="modalShow = !modalShow" type="button" class="btn btn-primary rounded-circle p-0" style="width:4rem;height:4rem;">＋</button>
    </div>
    <b-modal v-model="modalShow" centered title="操作">
      <b-container>
	<b-row class="mb-1">
	  <b-col cols="3">
	    <b-form-select
	      v-model="yamafudatomy"
	      :options="maisuu"
	      ></b-form-select>
	  </b-col>
	  <b-col>
	    <button type="button" @click="selectCardFromTop({'name':'deckcards', 'num':yamafudatomy});moveSelectedCard({'from':'deckcards','out':'mycards','rev':true});setSelectedCardsProp({'name':'mycards', 'ura':false});allUnSelected({'name':'mycards'});modalShow=!modalShow;" class="btn btn-outline-primary btn-lg btn-block">枚山札から引く</button>
	  </b-col>
	</b-row>
	<b-row class="mb-1">	

	  <b-col cols="3">
	    <b-form-select
	      v-model="yamafudatoside"
	      :options="maisuu"
	      ></b-form-select>
	  </b-col>
	  <b-col>
	    <button type="button" @click="selectCardFromTop({'name':'deckcards', 'num':yamafudatoside});moveSelectedCard({'from':'deckcards','out':'sidecards','rev':true});setSelectedCardsProp({'name':'sidecards', 'ura':true});allUnSelected({'name':'sidecards'});modalShow=!modalShow;" class="btn btn-outline-primary btn-lg btn-block">枚山札からサイドへ</button>
	  </b-col>
	</b-row>

	<b-row class="mb-1">	
	  <b-col cols="3">
	    <b-form-select
	      v-model="negaiboshi"
	      :options="maisuu"
	      ></b-form-select>
	  </b-col>
	  <b-col>
	    <button type="button" @click="selectCardFromTop({'name':'deckcards', 'num':negaiboshi});setSelectedCardsProp({'name':'deckcards', 'ura':false});allUnSelected({'name':'deckcards'});cardmodalShow=!cardmodalShow;dblclicknm='deckcards'" class="btn btn-outline-primary btn-lg btn-block">枚山札を開く（ねがいぼし）</button>
	  </b-col>
	</b-row>	
	
	<b-row class="mb-1">		
	  <b-col>	    	    
	    <button type="button" @click="myShuffleCards();allSelected({'name':'mycards'});moveSelectedCard({'from':'mycards','out':'deckcards', 'rev':false});setSelectedCardsProp({'name':'deckcards', 'ura':true});allUnSelected({'name':'deckcards'});modalShow=!modalShow;" class="btn btn btn-outline-info btn-lg btn-block">手札をすべて山札の下に(マリィ)</button>
	  </b-col>
	</b-row>

	<b-row class="mb-1">		
	  <b-col>	    	    
	    <button type="button" @click="deckShuffleCards();modalShow=!modalShow;" class="btn btn btn-outline-warning btn-lg btn-block">山札をシャッフル</button>
	  </b-col>
	</b-row>    
	<b-row class="mb-1">		
	  <b-col>	    	    
	    <button type="button" @click="resetMyDecks();modalShow=!modalShow;" class="btn btn btn-danger btn-lg btn-block">最初からやり直す</button>
	  </b-col>
	</b-row>
      </b-container>
    </b-modal>
    <b-modal v-model="cardmodalShow"  size="xl" centered :title="titles[dblclicknm]" ok-only>
      <okiba :cardsname="dblclicknm" :cardwidth=100></okiba>
    </b-modal>

  </div>
</template>

<script>
import cardokiba from './cardokiba'
import okiba from './okiba'
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import draggable from 'vuedraggable'
import cardimg from './cardimg'
import { CardClass } from '../PokemonCard.js'
export default {
    name: "root",
    components: { cardokiba , okiba, draggable,cardimg},
    data: () => ({
	maisuu : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
	negaiboshi:5,
	yamafudatomy : 1,
	yamafudatoside : 6,
	modalShow: false,
cardmodalShow: false,
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
	}
    }),
    created() {
	this.getPockemonJsonAction();
    },
    methods: {
	...mapMutations([
	    'allSelected',
	    'allUnSelected',
	    'moveSelectedCard',
	    'selectCardFromTop',
	    'setSelectedCardsProp',
	    'allOmote'
	]),
	...mapActions([
	    'getPockemonJsonAction',
	    'chgDblClickMode',
	    'resetMyDecks'
	]),
	myShuffleCards : function() {
	    this.$store.commit('setMyCards',CardClass.shuffleCards(this.$store.getters.getMyCards));
	},
	deckShuffleCards : function() {
	    this.$store.commit('setDeckCards',CardClass.shuffleCards(this.$store.getters.getDeckCards));
	}	
    },
    computed: {
	deckcd : {
	     get() {
		 return this.$store.state.deckcd;
	     },
	     set(value) {
		 this.$store.commit('setDeckcd',value);
	     }
	},
	dblclicknm : {
	    get() {
		return this.$store.state.dblclicknm;
	    },
	    set(value) {
		this.$store.commit('setDblclicknm',value);
	    }
	},
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
	battlecards : {
	     get() {
		 return this.$store.state.battlecards;
	     },
	     set(value) {
		 this.$store.commit('setBattleCards',value);
	     }
	},
	studiumscards : {
	     get() {
		 return this.$store.state.studiumscards;
	     },
	     set(value) {
		 this.$store.commit('setStudiumsCards',value);
	     }
	},
	bench1cards : {
	     get() {
		 return this.$store.state.bench1cards;
	     },
	     set(value) {
		 this.$store.commit('setBench1Cards',value);
	     }
	},
	bench2cards : {
	     get() {
		 return this.$store.state.bench2cards;
	     },
	     set(value) {
		 this.$store.commit('setBench2Cards',value);
	     }
	},
	bench3cards : {
	     get() {
		 return this.$store.state.bench3cards;
	     },
	     set(value) {
		 this.$store.commit('setBench3Cards',value);
	     }
	},
	bench4cards : {
	     get() {
		 return this.$store.state.bench4cards;
	     },
	     set(value) {
		 this.$store.commit('setBench4Cards',value);
	     }
	},
	bench5cards : {
	     get() {
		 return this.$store.state.bench5cards;
	     },
	     set(value) {
		 this.$store.commit('setBench5Cards',value);
	     }
	},  						
    }
}
</script>

<style>
  .item {
    display: inline-block;
    margin: 10px;
    padding: 10px;
    border: 1px solid #7f7f7f;
    border-radius: 10px;
    background-color: #ffffff;
  }
  .item:hover {
    cursor: grab;
  }
  .zoomable:hover {
    cursor: pointer;
  }
  .item:active {
    cursor: grabbing;
  }
</style>


