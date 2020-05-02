import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { CardClass } from './PokemonCard.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
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
	deckcd: ''	
    },
    getters: {
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
	setIsLoading(state,payload)  {
	    state.isLoading = payload;
	},	
	setDeckCards: (state,value) => {
	    console.log('deck',value);
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
	    console.log('mycard',value);
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
	    const tmp = state[payload.from]
		  .filter(card => card.isSelected==true);
	    while(tmp.length > 0) {
		state[payload.out].push(tmp.shift());
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
	}			
    },
    actions: {
	async getPockemonJsonAction(context,payload) {
	    context.commit( 'setIsLoading',true);
	    const functions = firebase.functions();
	    if (process.env.NODE_ENV == "development") {
		functions.useFunctionsEmulator("http://localhost:5000");
	    }
	    const func = functions.httpsCallable("getPokemonCard");
	    func({ deccd: payload.deccd }).then(res => {
		const cards = [];
		res.data.forEach( rec => {cards.push(new CardClass(rec.img))});
		context.commit('setDeckCards',CardClass.shuffleCards(cards));
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
	},	

  }
})
