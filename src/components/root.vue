<template>
  <div>
    <b-container>
      <b-row style='height: 80px'>
	<b-col class="bg-light border"><deckcards cardsname="deckcards" :cardwidth=40 title="山札"></deckcards></b-col>
	<b-col class="bg-light border"><draggable v-model="sidecards" group="myGroup" @start="drag=true" @end="drag=false">サイド({{sidecards.length}})</draggable></b-col>
	<b-col class="bg-light border"><draggable v-model="battlecards" group="myGroup" @start="drag=true" @end="drag=false">バトル場({{battlecards.length}})</draggable></b-col>
	<b-col class="bg-light border">
	  <cardokiba cardsname="studiumscards"　title="スタジアム" :cardwidth=10></cardokiba></b-col>
	<b-col class="bg-light border"><draggable v-model="trashcards" group="myGroup" @start="drag=true" @end="drag=false">トラッシュ({{trashcards.length}})</draggable></b-col>
	<b-col class="bg-light border"><draggable v-model="lostzonecards" group="myGroup" @start="drag=true" @end="drag=false">ロストゾーン({{lostzonecards.length}})</draggable></b-col>
      </b-row>      
      <b-row style='height: 80px'>
	<b-col class="bg-light border">
	  <cardokiba cardsname="bench1cards"　title="ベンチ1" :cardwidth=10></cardokiba>
	</b-col>
	<b-col class="bg-light border">
	  <cardokiba cardsname="bench2cards"　title="ベンチ2" :cardwidth=10></cardokiba>
	</b-col>
	<b-col class="bg-light border">
	  <cardokiba cardsname="bench3cards"　title="ベンチ3" :cardwidth=10></cardokiba>
	</b-col>
	<b-col class="bg-light border">
	  <cardokiba cardsname="bench4cards"　title="ベンチ4" :cardwidth=10></cardokiba>
	</b-col>
	<b-col class="bg-light border">
	  <cardokiba cardsname="bench5cards"　title="ベンチ5" :cardwidth=10></cardokiba>
	</b-col>	
      </b-row>
    </b-container>      
    <b-container>
      <b-row class="row item">
	<b-col>        
	  <cardokiba cardsname="mycards"　title="手札" :cardwidth=60></cardokiba>
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
	    <button type="button" @click="selectCardFromTop({'name':'deckcards', 'num':yamafudatomy});moveSelectedCard({'from':'deckcards','out':'mycards'});setSelectedCardsProp({'name':'mycards', 'ura':false});allUnSelected({'name':'mycards'});modalShow=false;" class="btn btn-outline-primary btn-lg btn-block">枚山札から引く</button>
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
	    <button type="button" @click="selectCardFromTop({'name':'deckcards', 'num':yamafudatoside});moveSelectedCard({'from':'deckcards','out':'sidecards'});setSelectedCardsProp({'name':'sidecards', 'ura':true});allUnSelected({'name':'sidecards'});modalShow=false;" class="btn btn-outline-primary btn-lg btn-block">枚山札からサイドへ</button>
	  </b-col>
	</b-row>	
	<b-row class="mb-1">		
	  <b-col>	    	    
	    <button type="button" class="btn btn btn-danger btn-lg btn-block">最初からやり直す</button>
	  </b-col>
	</b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import cardokiba from './cardokiba'
import okiba from './okiba'
import lostzonecards from './lostzone'    
import deckcards from './deckcards'
import sidecards from './sidecards'
import trashcards from './trashcards'
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import draggable from 'vuedraggable'
import cardimg from './cardimg'

export default {
    name: "root",
    components: { cardokiba , okiba, lostzonecards, deckcards , sidecards , trashcards, draggable,cardimg},
    data: () => ({
	maisuu : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
	yamafudatomy : 1,
	yamafudatoside : 6,
        deccd : '2pMEMp-1MQ78m-y2pppX',
	modalShow: false,
	options: {
            group: "myGroup",
            animation: 200
        },
    }),
    created() {
	this.getPockemonJsonAction({'deccd':this.deccd});
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
	    'isShowColumn'
	]),
    },
    computed: {
	dblclicknm : {
	    get() {
		return this.$store.state.dblclicknm;
	    },
	    set(value) {
		setDblclicknm(value);
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
  .item:active {
    cursor: grabbing;
  }

</style>
