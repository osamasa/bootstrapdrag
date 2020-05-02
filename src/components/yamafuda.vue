<template>
  <div>
    <div @dblclick="showModal();">
      <draggable v-model="deckcards" group="myGroup" @start="drag=true" @end="drag=false" :options="options">
	山札({{ this.deckcards.length}})
      </draggable>
    </div>
    <b-modal ref="my-modal" hide-footer :title="this.title">
      <div class="item m-0" v-for="(item,index) in deckcards" :key="item.id">
        <img
	  :src="item.isUra===false ? getImageUrl(item.img) : 'https://www.pokemon-card.com/assets/images/noimage/poke_ura.jpg'" style="width:50px"></img>
      </div>
      
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
    </b-modal>  
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    name: "yamafuda",

    components: { draggable },

    props: {
	'title': String
    },
    
    data () {
        return {
            options: {
                group: "myGroup",
                animation: 200
            },
        }
    },
    methods: {
      showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      toggleModal() {
        this.$refs['my-modal'].toggle('#toggle-btn')
      }
    },    
    computed: {
	deckcards : {
	     get() {
		 return this.$store.state.deckcards;
	     },
	     set(value) {
		 this.$store.dispatch('setDeckCards', value)
	     }
	},
	getImageUrl: function() {
	    return function(i) {
		return 'https://www.pokemon-card.com' + i;
	    }
	}
    }
}
</script>
