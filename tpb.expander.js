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
		defaultImage = /(http(|s):\/\/.*?(png|jpg|gif))/i,
		hotlink = 'http://lucasmonteverde.com/dev/hotlink.php?url=';
		
	container.id = 'container';
	
	links.forEach(function(e){
		var link = e.href, found = false;
		
		data.forEach(function(item){
			
			//console.log(link, item, item.regExp.test(link) );
			
			if(item.regExp.test(link)){
				found = true;
				
				if( item.load ){
					load(e.href, item);
					return;
				}
				
				if( item.multi ){
					multi(e.href, item);
					return;
				}
				
				var url = e.href.replace(item.regExp, item.target );
				appendImage( ( item.hotlink ? hotlink : '') + url );
			}
		
		});
		
		if( !found && defaultImage.test(link) ){
			appendImage( link );
		}
		
	});
	
	d.querySelectorAll('#content')[0].appendChild( container );
	
	function appendImage(url){
		//console.log(url);
		
		var image = document.createElement('img');
		image.src = encodeURI(url);
		image.onerror = function(a,b,c){
			destroy(this);
		};
	
		container.appendChild(image);
	}
	
	function load(url, item){
		get(url, function(data){
			var result = item.target.exec(data);
			
			appendImage( 'http://' + result[1] );
		});
	}

	function multi(url, item){
		get(url, function(data){
		
			var result = data.match(item.find);
		
			result.forEach(function(e){
				appendImage( 'http://' + e.replace(item.find, item.target ) );
			});
		
		});
	}
	
	function get(url, callback){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				console.log( xhr );
				callback.apply(this, [xhr.responseText, xhr]);
			}
		}
		xhr.send();
	}

	function destroy(obj){
		if(obj){
			obj.parentNode.removeChild(obj);
			return true;
		}else return false;
	}

}(document));