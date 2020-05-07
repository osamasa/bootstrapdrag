<template>
  <div class="container">
    <div class="row">

    <div v-bind:class="{
		    'col-2':  dblclicknm==='',
		    'col-12': dblclicknm!=='',
		    'item': true
		    }" v-show="dblclicknm==='' || dblclicknm==='deckcards'">
    <deckcards :cardwidth=40 title="山札"></deckcards>
      </div>
    <div v-bind:class="{
		    'col-2':  dblclicknm==='',
		    'col-12': dblclicknm!=='',
		    'item': true
		    }" v-show="dblclicknm==='' || dblclicknm==='sidecards'">
	<sidecards :cardwidth=80 title="サイド"></sidecards>
    </div>
    <div
      v-bind:class="{
		    'col-2':  dblclicknm==='',
		    'col-12': dblclicknm!=='',
		    'item': true
		    }"
      v-show="dblclicknm==='' || dblclicknm==='trashcards'">
	<trashcards :cardwidth=80 title="トラッシュ"></trashcards>
    </div>
    <div v-bind:class="{
		    'col-1':  dblclicknm==='',
		    'col-12': dblclicknm!=='',
		    'item': true
		    }" v-show="dblclicknm==='' || dblclicknm==='lostzonecards'">
	<okiba cardsname="lostzonecards" :cardwidth=80 title="ロストゾーン"></okiba>
      </div>    
      <div class="col-2 item" v-show="dblclicknm===''">
	<cardokiba :cardwidth=60 cardsname="studiumscards" title="スタディアム"></cardokiba>
      </div>                        
    </div>
    <div class="row item" v-show="dblclicknm===''">
      <div class="col-2 item" v-show="dblclicknm===''">
	<cardokiba :cardwidth=40 cardsname="battlecards" title="バトル場"></cardokiba>
      </div>      
      <div class="col-2 item">
	<cardokiba :cardwidth=40 cardsname="bench1cards" title="ベンチ１"></cardokiba>
      </div>
      <div class="col-2  item">
	<cardokiba :cardwidth=40 cardsname="bench2cards"　title="ベンチ２"></cardokiba>
      </div>
      <div class="col-2  item">
	<cardokiba :cardwidth=40 cardsname="bench3cards"　title="ベンチ３"></cardokiba>
      </div>
      <div class="col-2  item">
	<cardokiba :cardwidth=40 cardsname="bench4cards"　title="ベンチ４"></cardokiba>
      </div>
      <div class="col-2  item">
	<cardokiba :cardwidth=40 cardsname="bench5cards"　title="ベンチ５"></cardokiba>
      </div>
    </div>
    <div class="row item">
      <div class="col">        
	<cardokiba cardsname="mycards"　title="手札" :cardwidth=60></cardokiba>                     </div>
    </div>
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

export default {
    name: "root",
    components: { cardokiba , okiba, lostzonecards, deckcards , sidecards , trashcards},
    data: () => ({
	maisuu : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
	yamafudatomy : 1,
	yamafudatoside : 6,
        deccd : '2pMEMp-1MQ78m-y2pppX',
	modalShow: false
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
