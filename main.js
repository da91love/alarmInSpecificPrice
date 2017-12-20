var dialog = require('dialog');

var request = require('request');
var rp = require('request-promise');
var cheerio = require('cheerio');
//var player = require('play-sound')({player: "C:/Program Files/Daum/PotPlayer/PotPlayer64.exe"});
var player = require('play-sound')({player: "C:/Program Files/Daum/PotPlayer/PotPlayer64.exe"});

function coinPrice(coinName){
	var priceArr=[];
	setInterval(function(){
		var d = new Date();
		var encoding1 =encodeURIComponent('相場チャート');
		var encoding2 =encodeURIComponent(coinName);
		var reqParam = 'https://www.coingecko.com/ja/'+encoding1+'/'+encoding2+'/jpy';

		request(reqParam, function (error, response, body) {
			var $ = cheerio.load(body);
			var price = $('.mt-2').find('td').eq(2).children('span').text().trim();
			console.log('**************'+coinName+'**************');
			console.log(coinName+'price : ' + price);
			var timestrap = 'timestrap :' + d.getFullYear() + "/"+d.getMonth()+"/"+ d.getDate()+" "
			+ d.getHours() +':'+ d.getMinutes() +':'+ d.getSeconds();
			console.log(timestrap);
			price = price.substring(0,price.length-1);
			price = price.replace(/[,]/g,"");
			price = parseFloat(price);

			if(priceArr[0]===undefined){
				priceArr[0] = price;
			}
			else{
				var variation = ((price-priceArr[0])/priceArr[0])*100;
				console.log(coinName+'variation:'+variation + '%');
				if (((price-priceArr[0])/priceArr[0])*100 > 1){
//					var soundPath ='./sound/Alarm.mp3';
//					player.play(soundPath, function(err){
//						  if (err) throw err
//						});
					dialog.info(coinName + '\n'+ timestrap + '\n'+variation+'1%이상 가격상승');
				}

				else if(((price-priceArr[0])/priceArr[0])*100 < -1){
//					var soundPath ='./sound/Alarm.mp3';
//					player.play(soundPath, function(err){
//						  if (err) throw err
//						});
					dialog.info(coinName + '\n'+ timestrap + '\n'+variation+'1%이하 가격하락');
				}
				priceArr[0] = price;
			}
		})
		},30000);
}

coinPrice('モナーコイン');
coinPrice('リップル');
