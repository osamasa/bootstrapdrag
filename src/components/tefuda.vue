<template>
  <div>
     <draggable v-model="mycards" group="myGroup" @start="drag=true"  @end="drag=false" :options="options" >
      <div class="itemcard m-0" v-for="(item,index) in mycards" :key="item.id">
      	<selectablecardimg :cardwidth="cardwidth" :card="item"></selectablecardimg></div>
     </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import selectablecardimg from './selectablecardimg'

export default {
    name: "cardokiba",

    components: { draggable, selectablecardimg},

    props: {
	'cardwidth': Number,
    },
    
    data () {
        return {
            options: {
                group: "myGroup",
                animation: 200,

            }
        }
    },
    computed: {
    	mycards : {
	    get() {
		 return this.$store.state.mycards;
	     },
	    set(value) {
		this.$store.commit('setMyCards',value)
	     }
	}
    }	
}
</script>

<style>
  .itemcard {
    display: inline-block;
    margin: 1px;
    padding: 1px;
    background-color: #ffffff;
  }
</style>
