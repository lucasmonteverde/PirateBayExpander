/**
 * The Pirate Bay Expander
 *
 * Copyright (c) 2013 Lucas Monteverde <lucasmonteverde.com>
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
**/
//console.log = function() {}

NodeList.prototype.forEach = HTMLCollection.prototype.forEach = Array.prototype.forEach;

(function(d){
	
	var links = d.querySelectorAll('.nfo a'),
		container = d.createElement('div'),
		html = '',
		hotlink = 'http://lucasmonteverde.com/dev/hotlink.php?url=';
		
	var data = [
		{
			"regExp" :/xxxhost\.me\/viewer.php\?file=(.*\S)/i,
			"target" :'xxxhost.me/files/$1',
			"hotlink" : true
		},
		{
			"regExp" :/euro-pic\.eu\/share-(.*)\.html/i,
			"target" :'euro-pic.eu/image.php?id=$1'
		},
		{
			"regExp" :/imgnip\.com\/viewer\.php\?file=(.*\S)/i,
			"target" :'imgnip.com/images/$1'
		},
		{
			"regExp" :/picbank\.asia\/viewer\.php\?file=(.*\S)/i,
			"target" :'picbank.asia/images/$1'
		},
		{
			"regExp" :/pixsor\.com\/share-(.*)\.html/i,
			"target" :'pixsor.com/image.php?id=$1'
		},
		{
			"regExp" :/imagepdb\.com\/\?v=(.*\S)/i,
			"target" :'imagepdb.com/images/$1.jpg'
		},
		{
			"regExp" :/fastpics\.net\/\?v=(.*\S)/i,
			"target" :'fastpics.net/images/$1'
		},
		{
			"regExp" :/tinypix\.me\/viewer.php\?file=(.*\S)/i,
			"target" :'tinypix.me/images/$1'
		},
		{
			"regExp" :/picrak\.com\/viewer.php\?file=(.*\S)/i,
			"target" :'picrak.com/images/$1'
		},
		{
			"regExp" :/bayimg\.com\/(.*\S)/i,
			"target" :/(image\.bayimg\.com\/.*?)"/i,
			"load" : true
		},
		{
			"regExp" :/baypic\.net\/img-(.*)\.html/i,
			"target" :/(baypic\.net\/upload\/big.*?)'/i, //'baypic.net/dlimg.php?id=$1',
			"load" : true
		},
		{
			"regExp" :/imagedomino\.com\/\?g=(.*\S)/i,
			"find" :/imagedomino\.com\/\?v=(.*)'/gi,
			"target" :'imagedomino.com/images/$1.jpg',
			"multi" : true
		},
	];
		
	container.id = 'container';
	
	links.forEach(function(e){
		var link = e.href;
		
		data.forEach(function(item){
			
			//console.log(link, item.regExp.test(link) );
			
			if(item.regExp.test(link)){
			
				if( item.load ){
					get(e.href, item, container, load);
					return;
				}
				
				if( item.multi ){
					get(e.href, item, container, multi);
					return;
				}
				
				var url = e.href.replace(item.regExp, item.target ),
					image = document.createElement('img');
				
				//console.log(url);

				image.src = ( item.hotlink ? hotlink: '') + encodeURI(url);
				
				container.appendChild(image);
			}
		
		});
		
	});
	
	//container.innerHTML = html;
	d.querySelectorAll('#content')[0].appendChild( container );

}(document));


function get(url, item, container, callback){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			callback.apply(this, [xhr, item, container]);
		}
	}
	xhr.send();
}

function load(xhr, item, container){
	var result = item.target.exec(xhr.responseText),
		image = document.createElement('img');
	image.src = 'http://' + result[1];
	
	container.appendChild(image);
}

function multi(xhr, item, container){
	var result = xhr.responseText.match(item.find);
	
	result.forEach(function(e){
	
		var image = document.createElement('img');
		image.src = 'http://' + e.replace(item.find, item.target );
	
		container.appendChild(image);
	});
}