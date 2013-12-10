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
NodeList.prototype.map = HTMLCollection.prototype.map = Array.prototype.map;

HTMLElement.prototype.remove = function(){
	try{
		this.parentNode.removeChild(this);
	}catch(e){
		console.error('Remove error:', e);
	}
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function(){
	this.forEach(function(self){
		self.remove();
	})
};

(function(d){

	var $ = function(e){
		
		var el = e;
		
		if(typeof e === "string"){
			el = window[e];
		}
		
		if(!el || el.length === 0){
			el = document.querySelector(e);
		}
		//console.log(el);

		el.bind = function(event, func){
			this.addEventListener(event, func);
		}
		
		el.unbind = function(event, func){
			this.removeEventListener(event, func);
		}
		
		el.hide = function(){
			this.style.display = "none";
		}
		
		el.show = function(){
			this.style.display = "block";
		}
		
		el.toggle = function(){
			this.style.display == "none" ? this.show() : this.hide();
		}
		
		return el;
	}
	
	d.querySelectorAll('link[rel="stylesheet"], style', 'head').remove();
	
	//TODO: run on setup
	document.cookie = 'lw=s;path=/;expires=Fri, 05 Dec 2014 02:05:10 GMT';
	//setCookie('lw','s') //single view
	
	/* $(document).on('click', '#btnAdSearch',function(){
		$(this).data('clicked',!$(this).data('clicked'));
			if ($(this).data('clicked')){
				$('#boxAdSearch').slideToggle('slow', function() {
					// Animation complete.
				});
			}else{
				$('#boxAdSearch').slideToggle('fast', function() {
					// Animation complete.
				});
			}
    }); */
	
	function findSubcategoryByValue(value){
		for (var i = 0, len = templateData.categories.length; i < len; i++) {
			for (var j = 0, jlen = templateData.categories[i].subcategories.length; j < jlen; j++) {
				if(templateData.categories[i].subcategories[j].value == this.type){
					return templateData.categories[i].subcategories[j];
				}
			}
		}
		return;
	}
		
	var Item = function() {
	
		this.category = function(value){
			for (var i = 0, len = templateData.categories.length; i < len; i++) {
				for (var j = 0, jlen = templateData.categories[i].subcategories.length; j < jlen; j++) {
					if(templateData.categories[i].subcategories[j].value == this.type){
						return templateData.categories[i].subcategories[j];
					}
				}
			}
			return;
		}
	}
	
	
	var templateData = {
		categories : [],
		links: [],
		items: [],
		searchform: '',
		page: 0,
	};
	
	try{
		templateData.footer = d.querySelector('#footer').innerHTML;
	
		templateData.title = d.querySelector('h2').innerText;
		
		templateData.search = d.querySelector('input[name="q"]').value;
		
		var segments = location.pathname.split('/');
		templateData.page = segments[3];
	
	}catch(e){
		console.error('QuerySelector error:', e);
	}
	
	var searchForm = d.querySelectorAll('form input[type="hidden"]');
	
	searchForm.forEach(function(self){
		templateData.searchform += self.outerHTML;
	});
	
	var categories = d.querySelectorAll('#category optgroup');

	categories.forEach(function(self){
		var cat = {
			name : self.label,
			value : self.children[0].value - 1,
			link: function() {
				return '/top/' + this.value;
			},
			link2:  function() {
				return '/top/48h' + this.value;
			},
			subcategories: self.children.map(function(self, index){
				return {
					name: self.text,
					value: self.value,
					link: function() {
						return '/top/' + this.value;
					},
					link2:  function() {
						return '/top/48h' + this.value;
					}
				}
			}),
		}
		templateData.categories.push( cat );
	});
	
	var links = d.querySelectorAll('#foot > p a');
	
	links.forEach(function(self){
		if( /coin/i.test(self.href) ) return;
		var link = {
			name : self.title || self.text,
			url : self.href
		}
		templateData.links.push( link );
	});
	
	var items = d.querySelectorAll('#searchResult tr:not(.header)');
	
	items.forEach(function(self){
	
		var columns = self.querySelectorAll('td');
		
		if( columns.length < 6 ) return;
		
		var title = columns[1].querySelector('a'),
			actions = columns[3].querySelectorAll('a');
			
			
		var item = {
			type: parseInt(columns[0].querySelector('a').href.replace(/.*\//,'')),
			name: title.innerText, //innerText
			image: '',
			uploaded: columns[2].innerText,
			url: title.href,
			cover: /cover/i.test(columns[3].innerHTML),
			comments: /comment/i.test(columns[3].innerHTML),
			size: columns[4].innerText,
			imdb: '',
			seeders: parseInt(columns[5].innerText),
			leechers: parseInt(columns[6].innerText)
			/* 
			category: function () {
				var self = this;
				for (var i = 0, len = templateData.categories.length; i < len; i++) {
					for (var j = 0, jlen = templateData.categories[i].subcategories.length; j < jlen; j++) {
						if(templateData.categories[i].subcategories[j].value == self.type){
							return templateData.categories[i].subcategories[j];
						}
					}
				}
			} */
		};
		
		/* var r = columns[3].innerHTML.match(/has.(.*).co/);
		//querySeletor('img[title*="comment"]');
		if(r.length > 0){
			comments = parseInt(r[1]);
		} */
		
		actions.forEach(function(e){
			if( /magnet/.test(e.href) ){
				item.magnet = e.href;
			}else if( /torrents/.test(e.href) ){
				item.torrent = e.href;
			}else if( /trusted/.test(e.innerHTML) ){
				item.trusted = true;
			}else if( /vip/.test(e.innerHTML) ){
				item.vip = true;
			}
		});
		
		//Item.prototype = item;
		
		//console.log( item );
		
		//item.category = findSubcategoryByValue(item.type);
		item.category = findSubcategoryByValue.call(item);
		
		//Object.defineProperty(item, "category", findSubcategoryByValue(item.type));
		
		templateData.items.push( item );
	});
	
	var item = d.querySelector('#detailsframe');
	
	if(item){
	
		var info = item.querySelector('.col1'),
			info2 = item.querySelector('.col2'),
			cover = item.querySelector('.torpicture img'),
			actions = item.querySelectorAll('.download a');
	
		templateData.item = {
			name: item.querySelectorAll('#title').innerText,
			info : info.outerHTML + info2.outerHTML,
			cover: cover && cover.outerHTML,
			description: item.querySelector('.nfo').innerHTML.trim()
		}
		
		actions.forEach(function(e){
			if( /magnet/.test(e.href) ){
				templateData.item.magnet = e.href;
			}else if( /torrents/.test(e.href) ){
				templateData.item.torrent = e.href;
			}
		});
	}
	
	
	
	
	
	var templateURL = chrome.extension.getURL("template.html");
	
	d.body.innerHTML = "";
	
	//console.log(templateData);
	
	get( templateURL, function(template) {
		//var template = $(template).html();
		
		d.body.innerHTML = Mustache.render(template, templateData);
		d.body.style.display = "block";
		//$('body').append( Mustache.to_html(template, templateData) );
		
		
		$('#btnAdSearch').bind('click', function(){
			$('#boxAdSearch').toggle();
		});
		
		//chrome.tabs.executeScript(null, {file: "tpb.expander.js"});
		if(typeof(TPB) !== 'undefined')
			TPB(d);
			
		//setup();
	});
	
	
	
	function setup(){
	
		var section = d.querySelector('section');
	
		window.onscroll = function() {
			var oH = dsection.offsetHeight;
			var oH = d.body.offsetHeight; //section.scrollHeight; //offsetHeight ||clientHeight
			var sT = d.body.scrollTop;
	  
			if( d.documentElement.clientHeight + sT >= oH  ){
				
				
				get( getNextPage(), function(){
				
				})
			}
		}
	}
	
	function getNextPage(){
	
		var segments = location.pathname.split('/');
		segments[3] += 1;
	
		return segments.join();
	}
	
	
	/* 
	
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
		
		
		getJSON( url, function(data){
			console.log( url, data );
			
			if(data && !data.error){
				data.forEach(function(e){
					var html = '<a href="' + e.imdb_url + '" target="_blank">' + (e.rating || 'imdb') + '</a>';
					
					html += e.poster != '' ? ' | <a href="#" class="cov"><span><img src="' + hotlink + e.poster + '"></span></a>': '';
					
					imdb.innerHTML = html;
				});
			}
		});
	}); */
	
	function get(url, callback, JSON){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				callback.apply(this, [ JSON ? JSON.parse(xhr.responseText) : xhr.responseText, xhr]);
			}
		}
		xhr.send();
	}
	
	function getJSON(url, callback){
		get(url, callback, true);
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

}(document));