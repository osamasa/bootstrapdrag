<template>
  <div class="container">
    <div class="row">
      <div class="col-3 item">
	<cardokiba :cardwidth=80 cardsname="battlecards" title="バトル場"></cardokiba>
      </div>
      <div class="col-1 item">
	<okiba cardsname="lostzonecards" title="ロストーン"></okiba>
      </div>
      <div class="col-1 item">
	<okiba cardsname="trashcards" title="トラッシュ"></okiba>
      </div>
      <div class="col-1 item">
	<yamafuda title="山札"></yamafuda>
      </div>
      <div class="col-1 item">
	<okiba cardsname="sidecards" title="サイド"></okiba>
      </div>      
      <div class="col-1 item">
	<cardokiba :cardwidth=60 cardsname="studiumscards" title="スタディアム"></cardokiba>
      </div>                        
    </div>
    <div class="row item">
      <div class="col-2 item">
	<cardokiba :cardwidth=60 cardsname="bench1cards" title="ベンチ１"></cardokiba>
      </div>
      <div class="col-2  item">
	<cardokiba :cardwidth=60 cardsname="bench2cards"　title="ベンチ２"></cardokiba>
      </div>
      <div class="col-2  item">
	<cardokiba :cardwidth=60 cardsname="bench3cards"　title="ベンチ３"></cardokiba>
      </div>
      <div class="col-2  item">
	<cardokiba :cardwidth=60 cardsname="bench4cards"　title="ベンチ４"></cardokiba>
      </div>
      <div class="col-2  item">
	<cardokiba :cardwidth=60 cardsname="bench5cards"　title="ベンチ５"></cardokiba>
      </div>
    </div>
    <div class="row item">
      <div class="col">        
	<cardokiba cardsname="mycards"　title="手札" :cardwidth=80></cardokiba>                     </div>
    </div>
    <div class="fixed-bottom d-flex flex-row-reverse p-2">
      <button @click="modalShow = !modalShow" type="button" class="btn btn-primary rounded-circle p-0" style="width:4rem;height:4rem;">＋</button>
    </div>
    <b-modal v-model="modalShow" centered title="操作">
      <button type="button" class="btn btn-outline-primary btn-lg btn-block">山札から一枚持ってくる</button>
      <button type="button" class="btn btn btn-outline-primary btn-lg btn-block">山札から７枚引き直す</button>
      <button type="button" class="btn btn btn-outline-primary btn-lg btn-block">サイドから1枚引く</button>
      <button type="button" class="btn btn btn-danger btn-lg btn-block">ベンチとバトル操作</button>
      <button type="button" class="btn btn btn-primary btn-lg btn-block">その他山札からドロー操作</button>
      <button type="button" class="btn btn btn-primary btn-lg btn-block">選択したカードをトラッシュへ</button>
      <button type="button" class="btn btn btn-outline-primary btn-lg btn-block">最初からやり直す</button>
    </b-modal>
  </div>  
</template>

<script>
import cardokiba from './cardokiba'
import okiba from './okiba'
import yamafuda from './yamafuda'  
import { mapActions } from 'vuex'

export default {
    name: "root",
    components: { cardokiba ,okiba, yamafuda},
    data: () => ({      
        deccd : '2pMEMp-1MQ78m-y2pppX',
	modalShow: false
    }),
    created() {
	this.getPockemonJsonAction({'deccd':this.deccd});
    },
    methods: {
	...mapActions([
	    'getPockemonJsonAction'	    
	]),
    },
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
