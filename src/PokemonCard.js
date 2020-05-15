"use strict";

var cardid=0;

export class CardClass {
    static count() { 
	return ++cardid;
    }
    static shuffleCards = (([...array]) => {
	for (let i = array.length - 1; i >= 0; i--) {
	    const j = Math.floor(Math.random() * (i + 1));
	    array[i].isUra=true;
	    array[j].isUra=true;
	    array[i].isSelected=false;
	    array[j].isSelected=false;
	    [array[i], array[j]] = [array[j], array[i]];
	}
	return array;		
    })
    static hasSelectedCard = (([...array]) => {
	return array.filter(card => card.isSelected===true).length > 0;
    })    
}
