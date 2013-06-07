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
	
	var results = d.querySelectorAll('#searchResult tr:not(.header)');
	
	if( !results || results.length < 1) return;
	
	var header = d.querySelector('#searchResult tr.header'),
		row = header.insertCell(4),
		th = d.createElement('th'),
		row = row.parentNode.replaceChild(th, row),
		container = d.createElement('div'),
		defaultImage = /(http(|s):\/\/.*?(png|jpg|gif))/i,
		api = 'http://imdbapi.org/?',
		hotlink = 'http://lucasmonteverde.com/dev/hotlink.php?url=';
		
		
	th.innerHTML = "IMDB";
	
	results.forEach(function(e){
	
		var columns = e.querySelectorAll('td'),
			title = columns[1].innerText,
			category = columns[0].innerText,
			imdb = e.insertCell(4);
			
		imdb.innerHTML = '';
		
		//run only for movies;
		if( ( !/movies/i.test(category) && !/filmes/i.test(category) ) || /porn/i.test(category) ){
			return;
		}
	
		
	
		var params = {
			title: sanitizeTitle( title )
			
			
			//episode:
		};
		
		if(params.title == ''){
			return;
		}
		
		console.log( title,params.title  );
		
		var url = api + serialize(params);
		
		
		get( url, function(data){
			console.log( url, data );
			
			if(data && !data.error){
				data.forEach(function(e){
					var html = '<a href="' + e.imdb_url + '" target="_blank">' + (e.rating || 'imdb') + '</a>';
					
					html += e.poster ? ' | <a href="#" class="cov"><span><img src="' + hotlink + e.poster + '"></span></a>': '';
					
					imdb.innerHTML = html;
				});
			}
		});
	});
	
	function get(url, callback){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				//console.log( xhr );
				callback.apply(this, [ JSON.parse(xhr.responseText), xhr]);
			}
		}
		xhr.send();
	}
	
	function serialize(obj, prefix) {
		var str = [];
		for(var p in obj) {
			var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
			str.push(typeof v == "object" ? 
				serialize(v, k) :
				encodeURIComponent(k) + "=" + encodeURIComponent(v));
		}
		return str.join("&");
	}

	function sanitizeTitle(title){
		var result = title.match(/(.*)?2013/i);
		
		//console.log( result );
		return result ? result[1].replace(/\s|\.|\(|\)/ig,'+').trim() : '';
	}

	function destroy(obj){
		if(obj){
			obj.parentNode.removeChild(obj);
			return true;
		}else return false;
	}

}(document));