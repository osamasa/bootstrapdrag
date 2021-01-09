<template>
  <div>
    <b-container>
      <b-row style='height: 130px'>
	<b-col class="bg-light border" @click="setCardmodalShow({'name':'battlecards', 'value':true});">
	  <small  class="text-muted">
	    <okiba cardsname="battlecards" :nottile=true title="ﾊﾞﾄﾙ場" :cardwidth=100 :showuraomote=false></okiba>
    	    <cardokiba cardsname="battlecards" :cardwidth=60></cardokiba>	  
	  </small>
	</b-col>

	<b-col class="bg-light border" @click="setCardmodalShow({'name':'studiumscards', 'value':true});">
	  <small  class="text-muted">
	    <okiba cardsname="studiumscards" :nottile=true title="ｽﾀｼﾞｱﾑ" :cardwidth=100></okiba>
    	    <cardokiba cardsname="studiumscards" :cardwidth=60></cardokiba>
	  </small>
	</b-col>	
	<b-col>
	  <b-row class="h-50">
	    <b-col @click="setCardmodalShow({'name':'deckcards', 'value':true});" class="zoomable bg-light border"><small class="text-muted">
		<okiba cardsname="deckcards" :nottile=false title="山札" :cardwidth=100></okiba>
	    </small></b-col>
	  </b-row>
	  <b-row class="h-50">
	    <b-col @click="setCardmodalShow({'name':'sidecards', 'value':true});" class="zoomable bg-light border">
	      <small class="text-muted">
		<okiba cardsname="sidecards" :nottile=false title="サイド" :cardwidth=100></okiba>
	    </small></b-col>
	  </b-row>
	</b-col>
	<b-col>
	  <b-row class="h-50">    
	    <b-col @click="setCardmodalShow({'name':'trashcards', 'value':true});" class="zoomable bg-light border">
	      <small class="text-muted">
		<okiba cardsname="trashcards" :nottile=false title="トラッシュ" :cardwidth=100></okiba>
	    </small></b-col>
	  </b-row>
	  <b-row class="h-50">    
	    <b-col @click="setCardmodalShow({'name':'lostzonecards', 'value':true});" class="zoomable bg-light border"><small class="text-muted">
		<okiba cardsname="lostzonecards" :nottile=false title="ロストゾーン" :cardwidth=100></okiba>		
	    </small></b-col>
	  </b-row>
	</b-col>
      </b-row>
      <b-row style='height: 140px'>
	<b-col v-for="index of isMugenDinner ? 8 : 5" :key="index" class="bg-light border" @click="setCardmodalShow({'name': getBentchName(index) , 'value':true});">
	  <small  class="text-muted">
	    <okiba :cardsname="getBentchName(index)" :nottile=true :title="getDecktitles(getBentchName(index))" :cardwidth=80></okiba>	    
	    <cardokiba :cardsname="getBentchName(index)" :cardwidth="isMugenDinner ? 30 : 60"></cardokiba>
	  </small>

	</b-col>
      </b-row>

      <b-row  class="item">
	<b-col>
	  <b-row>
	    <b-col cols="2">
	      <small class="text-muted">{{getDecktitles('mycards')}}</small>
	    </b-col>
	    <b-col  cols="4">
	      <b-button class="mr-1 mb-1" size="sm" variant="primary" @click="allSelected({'name' : 'mycards'})">全選択</b-button>
	      <b-button class="mb-1" size="sm" variant="primary" @click="allUnSelected({'name' : 'mycards'})">全解除</b-button>
	    </b-col>
	    <b-col v-if="hasSelectedCard('mycards')">
	      <b-input-group>
		<b-form-select
		  v-model="selecdeck"
		  :options="getMoveabeldeckNames('mycards')"
		  ></b-form-select>
		<b-input-group-append>    
		  <b-button  size="sm" variant="info" @click="moveSelectedCard({'from':'mycards' ,'out': selecdeck.n,'rev':selecdeck.r});allSelected({'name' : selecdeck.n});setSelectedCardsProp({'name':selecdeck.n, 'ura':selecdeck.u});allUnSelected({'name':selecdeck.n})">移動</b-button>
		</b-input-group-append>
	      </b-input-group>
	    </b-col>	    
	  </b-row>      	    
	  <b-row>      
	    <tefuda cardsname='mycards' :cardwidth=60></tefuda>
	  </b-row>    	    
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
	    <button type="button" @click="selectCardFromTop({'name':'deckcards', 'num':yamafudatomy});moveSelectedCard({'from':'deckcards','out':'mycards','rev':false});setSelectedCardsProp({'name':'mycards', 'ura':false});allUnSelected({'name':'mycards'});modalShow=!modalShow;" class="btn btn-outline-primary btn-lg btn-block">枚山札から引く</button>
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
	    <button type="button" @click="selectCardFromTop({'name':'deckcards', 'num':yamafudatoside});moveSelectedCard({'from':'deckcards','out':'sidecards','rev':false});setSelectedCardsProp({'name':'sidecards', 'ura':true});allUnSelected({'name':'sidecards'});modalShow=!modalShow;" class="btn btn-outline-primary btn-lg btn-block">枚山札からサイドへ</button>
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
	    <button type="button" @click="deckShuffleCards();modalShow=!modalShow;" class="btn btn-outline-warning btn-lg btn-block">山札をシャッフル</button>
	  </b-col>
	</b-row>
	<b-row class="mb-1">		
	  <b-col>	    	    	
	      <div align="right">
		<button
		  class="btn btn-outline-danger btn-lg btn-block"
		  v-clipboard:copy="getGameURL"
		  v-clipboard:success="onCopy"
		  v-clipboard:error="onError"
		  variant="danger">URLをコピーする</button>
	      </div>
	  </b-col>
	</b-row>
	<b-row class="ma-2 mb-3">		
	  <b-col>
	    <b-form-checkbox class="lead" v-model="isMugenDinner" name="check-button" switch>
	      {{ isMugenDinner ? 'ムゲンダイナモード中' : '通常ベンチ数' }} ({{ isMugenDinner ? 'ベンチ数８' : 'ベンチ数５' }})
	    </b-form-checkbox>
	  </b-col>
	</b-row>    	
	<b-row class="mb-1">		
	  <b-col>	    	    
	    <button type="button" @click="resetMyDecks();modalShow=!modalShow;" class="btn btn btn-danger btn-lg btn-block">最初からやり直す</button>
	  </b-col>
	</b-row>
      </b-container>
    </b-modal>
    <b-modal v-model="modalShow2" v-if="clicknm!=='mycards' && countDeckLength(clicknm)" centered :title="getDecktitles(clicknm)">
      <b-container>
	<b-row>
	<b-col>
	  <b-row>
	    <b-col cols="2">
	      <small class="text-muted">{{getDecktitles(clicknm)}}</small>
	    </b-col>
	    <b-col cols="4">
	      <b-button class="mr-1" size="sm" variant="primary" @click="allSelected({'name' : clicknm})">全選択</b-button>
	      <b-button size="sm" variant="primary" @click="allUnSelected({'name' : clicknm})">全解除</b-button>
	    </b-col>
	    <b-col v-if="hasSelectedCard(clicknm)">
	      <b-input-group>
		<b-form-select
		  v-model="selecdeck"
		  :options="getMoveabeldeckNames(clicknm)"
		  ></b-form-select>
		<b-input-group-append>    
		  <b-button  size="sm" variant="info" @click="moveSelectedCard({'from':clicknm ,'out': selecdeck.n,'rev':selecdeck.r});allSelected({'name' : selecdeck.n});setSelectedCardsProp({'name':selecdeck.n, 'ura':selecdeck.u});allUnSelected({'name':selecdeck.n})">移動</b-button>
		</b-input-group-append>
	      </b-input-group>
    </b-col>
    <b-col v-else>
    </b-col>
	    <b-col cols="1">
	      <button type="button" @click="clicknm='mycards'" class="close" aria-label="Close">
		<span aria-hidden="true">&times;</span>
	      </button>
	    </b-col>
	  </b-row>      	    
	  <b-row>      
	    <tefuda :cardsname=clicknm :cardwidth=60></tefuda>
	  </b-row>    	    
	</b-col>
      </b-row>
      </b-container>
    </b-modal>	
  </div>
</template>

<script>
import cardokiba from './cardokiba'
import tefuda from './tefuda'
import okiba from './okiba'
import VueClipboard from 'vue-clipboard2'
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { CardClass } from '../PokemonCard.js'
export default {
    name: "root",
    components: { cardokiba , tefuda, okiba},
    data: () => ({
	maisuu : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
	negaiboshi:5,
	yamafudatomy : 1,
	yamafudatoside : 6,
	modalShow: false,
	modalShow2: false,	
        selecdeck : null,	
	options: {
            group: "myGroup",
            animation: 200
        },
	clicknm : 'mycards',
	motonm : ''
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
	    'setCardmodalShow',
	    'setIsMugenDinner'
	]),
	...mapActions([
	    'getPockemonJsonAction',
	    'chgDblClickMode',
	    'resetMyDecks'
	]),
	onCopy: function (e) {
	    alert('コピーしました: ' + e.text)
	},
	onError: function (e) {
	    alert('Failed to copy texts')
	},		
	myShuffleCards : function() {
	    this.$store.commit('setMyCards',CardClass.shuffleCards(this.$store.getters.getMyCards));
	},
	deckShuffleCards : function() {
	    this.$store.commit('setDeckCards',CardClass.shuffleCards(this.$store.getters.getDeckCards));
	},
	setDblClickMode : function (prop) {
            if (( this.clicknm !== prop ) && (this.$store.state[prop].length>0)) {
//		this.modalShow2=!this.modalShow2
		this.motonm = this.clicknm;
		this.clicknm = prop;
	    } else  {
		this.clicknm = 'mycards';
		this.motonm = ''
	    }
	},
	setMydeckClick : function() {
	    if( this.clicknm !== 'mycards') {
		this.clicknm = 'mycards';
		this.motonm = ''
	    }
	}
    },
    computed: {
	...mapGetters([
  	    'getDecktitles',
	    'getMoveabeldeckNames',
	    'getIsMugenDinner'
	]),
	getGameURL: function() {
	    return 'https://pokemoncard-31df1.web.app/m/' + this.$store.getters.getDeckcd;
	},
	isMugenDinner : {
	    get() {
		return this.getIsMugenDinner;
	    },
	    set(value) {
		this.setIsMugenDinner(value);
	    }
	},
	countDeckLength : function() {
	    return function(decknm) {
		if(this.$store.state[decknm].length == 0) {
		    this.clicknm='mycards';
		    return false;
		} else {
		    return true;
		}
	    }
	},
	hasSelectedCard : function() {
	    return function(targetname) {
	    	return CardClass.hasSelectedCard(this.$store.state[targetname]);
	    }
	},
	getBentchName : function() {
	    return function(index) {
		return 'bench' + index + 'cards';
	    }
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


