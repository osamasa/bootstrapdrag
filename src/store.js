import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { CardClass } from './PokemonCard.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
	cardmodalShow: {
	    'deckcards': false,
	    'battlecards': false,
	    'bench1cards': false,
	    'bench2cards': false,
	    'bench3cards': false,
	    'bench4cards': false,
	    'bench5cards': false,
	    'lostzonecards': false,
	    'trashcards': false,
	    'mycards': false,
	    'studiumscards': false,
	    'sidecards': false
	},
	    selectrev: {
		'deckcards' : true,
		'battlecards' : false,
		'bench1cards' : false, 
		'bench2cards' : false,
		'bench3cards' : false,
		'bench4cards' : false,
		'bench5cards' : false,
		'lostzonecards' : false,
		'trashcards' : false,
		'mycards' : false,
		'sidecards' : false,
		'studiumscards' : false
	    },
	    selectura: {
		'deckcards' : true,
		'battlecards' : false,
		'bench1cards' : false, 
		'bench2cards' : false,
		'bench3cards' : false,
		'bench4cards' : false,
		'bench5cards' : false,
		'lostzonecards' : false,
		'trashcards' : false,
		'mycards' : false,
		'sidecards' : true,
		'studiumscards' : false
	    },
	moveabeldecknames : [
		{ value: 'deckcards', text: '山札へ' },
		{ value: 'sidecards', text: 'サイドへ' },
		{ value: 'studiumscards', text: 'スタジアムへ' },
		{ value: 'battlecards', text: 'バトル場へ' },
		{ value: 'lostzonecards', text: 'ロストゾーンへ' },
		{ value: 'trashcards', text: 'トラッシュへ' },
		{ value: 'bench1cards', text: 'ベンチ１へ' },
		{ value: 'bench2cards', text: 'ベンチ２へ' },
		{ value: 'bench3cards', text: 'ベンチ３へ' },
		{ value: 'bench4cards', text: 'ベンチ４へ' },
		{ value: 'bench5cards', text: 'ベンチ５へ' },
		{ value: 'mycards', text: '手札へ' }
		    ],

	isLoading: false,	
	deckcards : [],
	battlecards: [],
	bench1cards : [],
	bench2cards : [],
	bench3cards : [],
	bench4cards : [],
	bench5cards : [],
	lostzonecards : [],
	trashcards: [],
	mycards: [],
	studiumscards : [],
	sidecards:[],
	deckcd: '6H6ggn-GcjdrT-LQnnHg',
    },
    getters: {
	getMoveabeldeckNames: (state) => (prop) => {
	    const self_cardsname = prop;
	    let ret = [];
	    ret = state.moveabeldecknames.filter( hashv => hashv.value !== self_cardsname );
	    return ret;
	},		
	getCardmodalShow: (state) => (prop) => {
	    return state.cardmodalShow[prop];
	},
	getSelectrev:  (state) => (prop) => {
	    return state.selectrev[prop];
	},
	getSelectura:  (state) => (prop) => {
	    return state.selectura[prop];
	},
	getIsLoading: (state) => {
	    return state.isLoading;
	},	
	getDeckcd: (state) => {
	    return state.deckcd;
	},
	getDeckCards: (state) => {
	    return state.deckcards;
	},
	getBattleCards: (state) => {
	    return state.battlecards;
	},
	getBench1Cards: (state) => {
	    return state.bench1cards;
	},
	getBench2Cards: (state) => {
	    return state.bench2cards;
	},
	getBench3Cards: (state) => {
	    return state.bench3cards;
	},
	getBench4Cards: (state) => {
	    return state.bench4cards;
	},
	getBench5Cards: (state) => {
	    return state.bench5cards;
	},	
	getLostzoneCards: (state) => {
	    return state.lostzonecards;
	},
	getTrashCards: (state) => {
	    return state.trashcards;
	},
	getMyCards: (state) => {
	    return state.mycards;
	},
	getStudiumsCards: (state) => {
	    return state.studiumscards;
	},
	getSideCards: (state) => {
	    return state.sidecards;
	}
    },    
    mutations: {
	setCardmodalShow: (state,payload) => {
	    state.cardmodalShow[payload.name] = payload.value;
	},	
	setIsLoading: (state,payload) => {
	    state.isLoading = payload;
	},	
	setDeckCards: (state,value) => {
	    state.deckcards = value;
	},
	setBattleCards: (state,value) => {
	    state.battlecards = value;
	},
	setBench1Cards: (state,value) => {
	    state.bench1cards = value;
	},
	setBench2Cards: (state,value) => {
	    state.bench2cards = value;
	},
	setBench3Cards: (state,value) => {
	    state.bench3cards = value;
	},
	setBench4Cards: (state,value) => {
	    state.bench4cards = value;
	},
	setBench5Cards: (state,value) => {
	    state.bench5cards = value;
	},
	setLostzoneCards: (state,value) => {
	    state.lostzonecards = value;
	},
	setTrashCards: (state,value) => {
	    state.trashcards = value;
	},
	setMyCards: (state,value) => {
	    state.mycards = value;
	},
	setStudiumsCards: (state,value) => {
	    state.studiumscards = value;
	},
	setSideCards: (state,value) => {
	    state.sidecards = value;
	},					
	setDeckcd: (state,value) => {
	    state.deckcd = value;
	},
	setSelectedCardsProp(state,payload) {
	    const name = payload.name;
	    const ura = payload.ura || false;
	    const dmg = payload.damages !== undefined ? payload.damages : -1;

	    const result = state[name]
		  .filter(card => card.isSelected===true)
		.forEach(card => {
		    card.isUra=ura;
		    if(dmg > -1) {
			card.damages=dmg;
		    }
		    card.isPoison=false;
		    card.isParalysis=false;
		    card.isBurn=false;		    
		    card.isSleep=false;
		    card.isConfusion=false;		    
		})
	},	
	selectCardFromTop: (state,payload) => {
	    const name = payload.name;
	    const num = payload.num;
	    const result = state[name].filter(card => card.isSelected==true);
	    
	    result.forEach(card => { card.isSelected=false });
	    
	    for(let i=0;i<num;i++) {
		state[name][i].isSelected=true;
	    }
	},
	moveSelectedCard(state,payload) {
	    const rev = payload.rev;
	    const tmp = state[payload.from]
		  .filter(card => card.isSelected==true);
	    while(tmp.length > 0) {
		if(!rev) {		
		    state[payload.out].push(tmp.shift());
		} else {
		    state[payload.out].unshift(tmp.shift());		    
		}
	    };
	    const tmp2 = state[payload.from]
		  .filter(card => card.isSelected!=true);
	    state[payload.from] = tmp2;
	},
	allSelected(state,payload) {
	    state[payload.name].filter(c => c.isSelected == false).forEach(card => { card.isSelected=true; });
	},
	allUnSelected(state,payload) {
	    state[payload.name].filter(c => c.isSelected == true).forEach(card => { card.isSelected=false; });
	},
	allOmote(state,payload) {
	    state[payload.name].filter(c => c.isUra == true).forEach(card => { card.isUra=false; });
	},
	allUra(state,payload) {
	    state[payload.name].filter(c => c.isUra == false).forEach(card => { card.isUra=true; });
	},
	addCards(state,payload) {
	    state[payload.name].unshift(payload.card);
	}
    },
    actions: {
	async isShowColumn(context,payload) {
	    let retvalue = false;
	    const cardsname = payload.cardsname;
	    if(context.getters['getDblclicknm'] === cardsname) {
		retvalue = true;
	    }

	    return retvalue;
	},
	async chgDblClickMode(context,payload) {
	    const cardsname = payload.cardsname;
	    if(context.getters['getDblclicknm'] === cardsname) {
		context.commit('setDblclicknm','');
	    } else {
		context.commit('setDblclicknm', cardsname);		
	    }
	},
	async resetMyDecks(context,payload) {
	    const works=['mycards','bench5cards','bench4cards','bench3cards','bench2cards','bench1cards','lostzonecards','trashcards','sidecards','studiumscards','battlecards'];
	    works.forEach(cardname => {
		if(context.state[cardname].length > 0) {
		    context.commit('allSelected',{'name' : cardname});
		    context.commit('moveSelectedCard',{'from':cardname,'out':'deckcards', 'ref' : false});
		}
	    });
	    context.commit('setDeckCards',CardClass.shuffleCards(context.getters.getDeckCards));
	    context.commit('selectCardFromTop',{'name':'deckcards', 'num':7});
	    context.commit('moveSelectedCard',{'from':'deckcards','out':'mycards', 'ref' : false});
	    context.commit('allOmote',{'name':'mycards'});
	    context.commit('allUnSelected',{'name':'mycards'});
	    context.commit('allUnSelected',{'name':'deckcards'});
	},
	async getPockemonJsonAction(context,payload) {
	    context.commit( 'setIsLoading',true);
	    const functions = firebase.functions();
	    if (process.env.NODE_ENV == "development") {
		functions.useFunctionsEmulator("http://localhost:5000");
	    }
	    const func = functions.httpsCallable("getPokemonCard");
	    func({ deccd: context.getters.getDeckcd }).then(res => {
		const cards = [];
		res.data.forEach( rec => {cards.push({'id':CardClass.count() ,'img':rec.img,'alt':rec.alt, 'isUra':true, 'isSelected':false })});
		context.commit('setDeckCards',CardClass.shuffleCards(cards));
		context.commit('setMyCards',[]);
		context.commit('setBattleCards',[]);
		context.commit('setBench1Cards',[]);
		context.commit('setBench2Cards',[]);
		context.commit('setBench3Cards',[]);
		context.commit('setBench4Cards',[]);
		context.commit('setBench5Cards',[]);		
		context.commit('setLostzoneCards',[]);
		context.commit('setTrashCards',[]);

		context.commit('setStudiumsCards',[]);
		context.commit('setSideCards',[]);
		
		context.commit('selectCardFromTop',{'name':'deckcards', 'num':7});
		context.commit('moveSelectedCard',{'from':'deckcards','out':'mycards'});
		context.commit('allOmote',{'name':'mycards'});
		context.commit('allUnSelected',{'name':'mycards'});
		
		context.commit( 'setIsLoading',false);
	    }).catch(e => {
		console.log(e);
		context.commit( 'setIsLoading',false);
	    });
	}

  }
})
