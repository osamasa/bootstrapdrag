<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-primary">
      <a class="navbar-brand" href="/"><h3>一人で回すポケモンカード</h3></a>
    </nav>
    <b-card
      class="my-1"
      border-variant="Secondary"
      header="このサイトは？"
      header-bg-variant="Secondary"
      v-show="showsetsumei"      
      >
      <b-card-text>
	<ul>
	  <li>自分で作った<b-link href="https://www.pokemon-card.com/deck/deck.html">カードデッキ</b-link>を一人回し出来るシステムです。</li>
	  <li>一人回しを行うことにより、作成したカードデッキの検証が行えます</li>
	  </ul>
      </b-card-text>
      <b-button @click="showsetsumei=!showsetsumei" variant="secondary">HIDE</b-button>
    </b-card>
    <b-button v-show="!showsetsumei" @click="showsetsumei=!showsetsumei" variant="secondary">説明をもう一度開く</b-button>
    <b-card
      class="my-1"
      border-variant="info"
      header="遊び方"
      header-bg-variant="info"
      header-text-variant="white"
      v-show="showasobikata"
      >
      <b-card-text>
	<ul>
	  <li>検証したいデッキのデッキコードをトップ画面で入力します。</li>
	  <li>次の画面で手札に７枚カードが配られたら一人回しの開始です</li>
	  <li>すべての置き場のカードはOPENボタンを開いて(選択モード)移動するカードを選択して移動させることも出来ます。</li>
	  <li>選択モード（OPENボタンを押した状態）では、複数枚のカードを一遍に移動することが出来ます。</li>	  
	  <li>手札にあるカードのみドラッグで他の置き場に移動することが出来ます。</li>
	  <li>カードをダブルクリックすると画像が拡大し詳細を確認できます。</li>
	  <li>選択モード（OPENボタンを押した状態）では、カードの並び順をドラッグで変えることが出来ます。</li>	  
	  </ul>
      </b-card-text>
      <b-button @click="showasobikata=!showasobikata" variant="info">HIDE</b-button>      
    </b-card>
    <b-button v-show="!showasobikata" @click="showasobikata=!showasobikata" variant="info">遊び方をもう一度開く</b-button>    
    <router-view/>
    <div>
      <div class="fluid-container footer">
	<p class="text-center">Copyright &copy 2020, OSAPAPA. All Rights Reserved.</p>
      </div>
    </div>    
  </div>
</template>

<script>

export default {
    name: 'App',

data: () => ({
showsetsumei : true,
showasobikata : true
	//
    }),
};
</script>
