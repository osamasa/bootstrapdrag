<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-primary">
      <a class="navbar-brand" href="/"><h3>一人で回すポケモンカード</h3></a>
    </nav>
    <router-view/>
    <div>
      <div class="fluid-container footer">
	<p class="text-center">Copyright &copy 2021, OSAPAPA. All Rights Reserved.</p>
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
