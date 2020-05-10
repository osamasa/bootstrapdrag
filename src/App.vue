<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-primary">
      <a class="navbar-brand" href="/"><h3>一人で回すポケモンカード</h3></a>        </nav>
    <p class="lead">
      移動はカードをドラッグしながら、違うカード置き場に持っていくか、各カード置き場にあるOPENボタンを開いて移動するカードを選択して移動させます。</br>
      カードをダブルクリックすると画像が拡大し詳細を確認できます。
    </p>
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
	//
    }),
};
</script>
