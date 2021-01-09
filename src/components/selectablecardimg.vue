<template>
<div>
  <b-row>
    <b-col>
      <b-img @dblclick="isZoom=true;modalShow=!modalShow" @click="card.isSelected=!card.isSelected" :src="card.isUra===false ? getImageUrl(card.img) : 'https://www.pokemon-card.com/assets/images/noimage/poke_ura.jpg'"  v-bind:class="card.isSelected ?  'cardborder' : ''" v-bind:style="{width:(cardwidth+(card.isSelected ? 20 : 0))+'px'}"></b-img>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <div v-if="card.isSelected">
	<b-button  @click="isZoom=true;modalShow=!modalShow" size="sm">拡大</b-button>
	<b-button  @click="isZoom=false;modalShow=!modalShow" size="sm">移動</b-button>
      </div>
    </b-col>
  </b-row>
  <b-modal v-model="modalShow" ok-only>
    <div v-if="isZoom">
      <b-img  fluid-grow :src="getImageUrl(card.img)" @dblclick="modalShow=!modalShow" ></b-img>
    </div>
    <div v-else>
      <b-form-group label="移動先" v-slot="{ ariaDescribedby }">
	<b-form-radio-group
          v-model="selecdeck"
          :options="getOptions"
          :aria-describedby="ariaDescribedby"
          name="radios-stacked"
          stacked
	  >
	</b-form-radio-group>
      </b-form-group>
      <b-button @click="moveSelectedCard({'from': cardsname  ,'out': selecdeck.n,'rev':selecdeck.r});allSelected({'name' : selecdeck.n});setSelectedCardsProp({'name':selecdeck.n, 'ura':selecdeck.u});allUnSelected({'name':selecdeck.n});doWithShufftle();modalShow=!modalShow">移動させる</b-button>
    </div>
  </b-modal>
</div>
</template>

<script>
import CardClass from '../PokemonCard'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
export default {
    name: "selectablecardimg",

    props: {
	'card': Object,
	'cardwidth' : Number,
	'shstatus' : { type : Boolean, default : false },
	'cardsname' : { type : String, default : 'mycards' }
    },
    data () {
        return {
	    selecdeck: null,
	    modalShow: false,
	    isZoom:true
        }
    },
    computed: {
	...mapGetters([
	    'getMoveabeldeckNames'
	]),
	getImageUrl: function() {
	    return function(item) {
		return 'https://www.pokemon-card.com' + item;
	    }
	},
	getOptions: function() {
	    return this.getMoveabeldeckNames(this.cardsname).filter(rec => rec.value != null);
	}
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
        doWithShufftle: function() {
	    if(this.shstatus && (this.cardsname==='deckcards')) {
		this.$store.commit(this.setternames[this.cardsname],CardClass.shuffleCards(this.$store.state[this.cardsname]));
	    }
        },	
    }
}
</script>

<style>
  .cardborder {
   border: medium solid #ff00ff;
  }
</style>
