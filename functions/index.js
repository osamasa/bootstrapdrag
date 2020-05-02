const functions = require("firebase-functions");
const admin = require("firebase-admin");
const puppeteer = require('puppeteer');

admin.initializeApp();

exports.getPokemonCard = functions.https.onCall(async (data, context) => {

    const browser = await puppeteer.launch({
	headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage()
    
    try {
	await page.goto('https://www.pokemon-card.com/deck/confirm.html/deckID/' + data.deccd + '/', {
	    waitUntil: 'domcontentloaded'
	});

	const jsondatas = await page.$$eval('section#cardImagesView > div > div.Grid_item  > table > tbody > tr > td', selector => {
	    const imgregexp = /img\ssrc=["']([^"']+\.jpg)["']/g;
	    const mairegexp=/<span>(\d+)枚<\/span>$/g
	    const datas = [];
	    const images = [];
	    const sheets = [];

	    for (let i=0; i<selector.length; i++) {
		let txt = selector[i].innerHTML;
		let match;
		while((match= imgregexp.exec(txt))!=null) {
		    images.push(match[1]);
		}
		while((match= mairegexp.exec(txt))!=null) {
		    sheets.push(match[1]);
		}
	    }
	    for(let i=0;i<images.length;i++) {
		for(let l=0;l<Number(sheets[i]);l++) {
		    datas.push({
			img : images[i]
		    });
		}
	    }
	    return datas;
	})
	return jsondatas;
    } catch(e) {
	return {'ERROR': e.message };
    } finally {
	await browser.close();
    }
});

exports.echo_onCall = functions.https.onCall((data, context) => {
    console.log('data: ' + JSON.stringify(data))
    console.log('context.auth: ' + JSON.stringify(context.auth))
    if (context.auth) {
	console.log('context.auth.uid: ' + context.auth.uid)
    }
    return data
});
