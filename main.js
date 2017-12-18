var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
var fs = require('fs');

var request = require('request');
var rp = require('request-promise');
var cheerio = require('cheerio');
//var player = require('play-sound')({player: "C:/Program Files/Daum/PotPlayer/PotPlayer64.exe"});
var player = require('play-sound')({player: "C:/Program Files/Daum/PotPlayer/PotPlayer64.exe"});

function coinPrice(coinName){
	var priceArr=[];
	setInterval(function(){
		var encoding1 =encodeURIComponent('相場チャート');
		var encoding2 =encodeURIComponent(coinName);
		var reqParam = 'https://www.coingecko.com/ja/'+encoding1+'/'+encoding2+'/jpy';

		request(reqParam, function (error, response, body) {
			var $ = cheerio.load(body);

			var price = $('.mt-2').find('td').eq(2).children('span').text().trim();
			console.log('price : ' + price);
			console.log('timestrap :' + Math.floor(Date.now() / 1000));
			price = price.substring(0,price.length-1);
			price = price.replace(/[,]/g,"");
			price = parseFloat(price);

			if(priceArr[0]===undefined){
//				console.log('if priceArr[0]: ' + priceArr[0]);
//				console.log('if price: ' + priceArr[0]);
				priceArr[0] = price;
			}
			else{
//				console.log('else priceArr[0]: ' + priceArr[0]);
//				console.log('else price: ' + priceArr[0]);
				var variation = ((price-priceArr[0])/priceArr[0])*100;
				console.log(variation + '%');
				if (((price-priceArr[0])/priceArr[0])*100 > 2){
					console.log('attention');
				}
				priceArr[0] = price;

			}
		})

		},60000);
}

coinPrice('モナーコイン');
