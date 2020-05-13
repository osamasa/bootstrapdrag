<template>
  <div>
    <b-container>
      <b-row style='height: 130px'>
	<b-col class="bg-light border">
	  <small class="text-muted">
	    <cardokiba cardsname="battlecards" :cardwidth=20></cardokiba>
	    <okiba cardsname="battlecards" :nottile=true title="ﾊﾞﾄﾙ場" :cardwidth=100></okiba>
	  </small>
	</b-col>
	<b-col class="bg-light border">
	  <small class="text-muted">    
	    <cardokiba cardsname="studiumscards"  :cardwidth=60></cardokiba>
	    <okiba cardsname="studiumscards" :nottile=true title="ｽﾀｼﾞｱﾑ" :cardwidth=100></okiba>	    
	</small></b-col>
	<b-col>
	  <b-row class="h-50">
	    <b-col class="zoomable bg-light border"><small class="text-muted">
		<okiba cardsname="deckcards" :nottile=false title="山札" :cardwidth=100></okiba>
	    </small></b-col>
	  </b-row>
	  <b-row class="h-50">
	    <b-col class="zoomable bg-light border">
	      <small class="text-muted">
		<okiba cardsname="sidecards" :nottile=false title="サイド" :cardwidth=100></okiba>
	    </small></b-col>
	  </b-row>
	</b-col>
	<b-col>
	  <b-row class="h-50">    
	    <b-col class="zoomable bg-light border">
	      <small class="text-muted">
		<okiba cardsname="trashcards" :nottile=false title="トラッシュ" :cardwidth=100></okiba>
	    </small></b-col>
	  </b-row>
	  <b-row class="h-50">    
	    <b-col class="zoomable bg-light border"><small class="text-muted">
		<okiba cardsname="lostzonecards" :nottile=false title="ロストゾーン" :cardwidth=100></okiba>		
	    </small></b-col>
	  </b-row>
	</b-col>
      </b-row>      
      <b-row style='height: 140px'>
	<b-col class="bg-light border">
	  <small class="text-muted">
	    <cardokiba cardsname="bench1cards" :cardwidth=20></cardokiba>
	    <okiba cardsname="bench1cards" :nottile=true title="ベンチ1"  :cardwidth=100></okiba>
	  </small>
	</b-col>
	<b-col class="bg-light border">
	  <small class="text-muted">    
	    <cardokiba cardsname="bench2cards"  :cardwidth=20></cardokiba>
	    <okiba cardsname="bench2cards" :nottile=true title="ベンチ2"  :cardwidth=100></okiba>	    
	  </small>
	</b-col>
	<b-col class="bg-light border">
	  <small class="text-muted">        
	    <cardokiba cardsname="bench3cards" :cardwidth=20></cardokiba>
	    <okiba cardsname="bench3cards" :nottile=true title="ベンチ3"  :cardwidth=100></okiba>	    	    
	  </small>
	</b-col>
	<b-col class="bg-light border">
	  <small class="text-muted">            
	    <cardokiba cardsname="bench4cards"  :cardwidth=20></cardokiba>
	    <okiba cardsname="bench4cards" :nottile=true title="ベンチ4" :cardwidth=100></okiba>	    	    	    
	  </small>
	</b-col>
	<b-col class="bg-light border">
	  <small class="text-muted">
	    <cardokiba cardsname="bench5cards" :cardwidth=20></cardokiba>
	    <okiba cardsname="bench5cards"  :nottile=true title="ベンチ5" :cardwidth=100></okiba>		  </small>
	</b-col>	
      </b-row>
      <b-row class="row item">
	<b-col>
	  <small class="text-muted">
	    <okiba cardsname="mycards" :nottile=false title="手札" :cardwidth=100></okiba>
	    <cardokiba cardsname="mycards" :cardwidth=60></cardokiba>
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
	    <button type="button" @click="selectCardFromTop({'name':'deckcards', 'num':negaiboshi});setSelectedCardsProp({'name':'deckcards', 'ura':false});allUnSelected({'name':'deckcards'});setCardmodalShow({'name':'deckcards', 'value':true});modalShow=!modalShow" class="btn btn-outline-primary btn-lg btn-block">枚山札を開く（ねがいぼし）</button>
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
	options: {
            group: "myGroup",
            animation: 200
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
	    'allOmote',
	    'setCardmodalShow'
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


