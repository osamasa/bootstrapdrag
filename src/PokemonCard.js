"use strict";

var cardid=0;

export class CardClass {
    constructor(img,id=0) {
	this._img = img;
	if(id==0) {
	    this._id=CardClass.count();
	} else {
	    this._id=id;
	}
	this._isUra=true;
	this._isSelected=false;	
    }
    get img() {
	return this._img
    }
    get id() {
	return this._id;
    }
    get isUra() {
	return this._isUra;
    }
    set isUra(isUra) {
	this._isUra = isUra;
    }    
    get isSelected() {
	return this._isSelected;
    }
    set isSelected(isSelected) {
	this._isSelected = isSelected;
    }
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

export class TanePokemonClass extends CardClass {
    constructor( obj ) {
	this._damage = 0;
	this._IsPoison = false;
	this._IsConfusion = false;
	this._IsParary =false;
	this._IsSleep = false;
	super(obj.img,obj.id);	
    }
    get damage() {
        return this._damage;
    }
    set damage(damage) {
        this._damage = damage;
    }    

    get IsPoison() {
	return this._IsPoison;
    }
    set IsPoison(IsPoison) {
    	this._IsPoison = IsPoison;
    }

    get IsConfusion() {
	return this._IsConfusion;
    }
    set IsConfusion(IsConfusion) {
	this._IsConfusion = IsConfusion;
    }    
    get IsParary() {
	return this._IsParary;
    }
    set IsParary(IsParary) {
	this._IsParary = IsParary;
    }    
    get IsSleep() {
	return this._IsSleep;
    }
    set IsSleep(IsSleep) {
	this._IsSleep = IsSleep;
    }    
    
}

export class ShinkaPokemonClass extends CardClass {
    constructor( obj , parentid, shinkanumber) {
	this._parentid = parentid;
	this._shinkanumber = shinkanumber;
	super(obj.img,obj.id);
    }

    get parentid() {
	return this._parentid;
    }
    set parentid(parentid) {
	this._parentid = parentid;
    }

    get shinkanumber() {
	return this._shinkanumber;
    }
    set shinkanumber(shinkanumber) {
	this._shinkanumber=shinkanumber;
    }
}

export class EnergeyClass extends CardClass {
    constructor( obj , parentid ) {
	this._parentid = parentid;
	super(obj.img, obj.id);
    }
    get parentid() {
	return this._parentid;
    }
}

export class DouguClass extends CardClass {
    constructor( obj , parentid ) {
	this._parentid = parentid;
	super(obj.img, obj.id);
    }
    get parentid() {
	return this._parentid;
    }
}
