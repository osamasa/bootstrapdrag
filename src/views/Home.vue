<template>
<div>
<h3>一人で回すポケモンカード</h3>
<p class="lead">
移動はカードをドラッグしながら、違うカード置き場に持っていくか、各カード置き場にあるOPENボタンを開いて移動するカードを選択して移動させます。</br>
カードをダブルクリックすると画像が拡大し詳細が確認できます。
</p>
  <hello-world />
</div>
</template>

<script>
  import HelloWorld from '../components/root'

  export default {
    name: 'Home',

    components: {
      HelloWorld,
    },
  }
</script>
