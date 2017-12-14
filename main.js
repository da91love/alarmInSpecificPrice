var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
var fs = require('fs');

var request = require('request');
var cheerio = require('cheerio');
var player = require('play-sound')({player: "C:/Program Files/Daum/PotPlayer/PotPlayer64.exe"});


function findPrice(){
	var player = require('play-sound')({player: "C:/Program Files/Daum/PotPlayer/PotPlayer64.exe"});
	var pagdAddr = 'https://www.coingecko.com/ja/%E7%9B%B8%E5%A0%B4%E3%83%81%E3%83%A3%E3%83%BC%E3%83%88/%E3%83%AA%E3%83%83%E3%83%97%E3%83%AB/jpy';
	request(pagdAddr, function (error, response, body) {
		if(error){
			console.log('에러발생');
		}
		else{
			var $ = cheerio.load(body);
			var price = $('.coin-value').children('span').text();
			var percent = $('.stat-percent-lg').text();	
			
			price = price.trim().substring(0,price.trim().length-1);
			percent = percent.trim().substring(0,percent.trim().length-1);
			console.log(price.trim());
			console.log(percent.trim());
			
			if(parseInt(percent)>30){
				player.play('./sound/alarm.mp3', function(err){
					  if (err) throw err
				});
				setTimeout(function(){
					player.pause();}
					, 3000);
			}
			
		}
	});	
}

setInterval(function(){
	findPrice();
	}, 3000);