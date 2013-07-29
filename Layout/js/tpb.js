NodeList.prototype.forEach = HTMLCollection.prototype.forEach = Array.prototype.forEach;

$(document).ready(function(){
	var browserW = $(window).width();
	var browserH = $(window).height();
	
	
	$(document).on('click', '#btnAdSearch',function(){
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
    });
	
	
	$(document).on('click', '.torrent', function(){
	
		$.load( $(this).attr('href'), function(){
		
		
		
		});
	
	});
	
	var templateData = {
		categories : [],
		links: [],
		items: [],
		searchform: ''
	};
	
		
	templateData.footer = document.querySelector('#footer').innerHTML;
	
	templateData.title = document.querySelector('h2').innerText;
	
	var searchForm = document.querySelectorAll('form input[type="hidden"]');
	
	searchForm.forEach(function(self){
		templateData.searchform += self.outerHTML;
	});

	var categories = document.querySelectorAll('#category optgroup');

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
			subcategories: _.map(self.children,function(self, index){
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
			})
		}
		templateData.categories.push( cat );
	});
	
	var links = document.querySelectorAll('#foot > p a');
	
	links.forEach(function(self){
		if( /coin/i.test(self.href) ) return;
		var link = {
			name : self.title || self.text,
			url : self.href
		}
		templateData.links.push( link );
	});
	
	var items = document.querySelectorAll('#searchResult tr:not(.header)');
	
	items.forEach(function(self){
	
		var columns = self.querySelectorAll('td'),
			title = columns[1].querySelector('a'),
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
		}
		
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
		
		templateData.items.push( item );
		return;
	});
	
	var item = document.querySelector('#detailsframe');
	
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
		
		console.log( templateData.item );
	}
	
	
	
	
	
	console.log( templateData );
	
	$('body').html("");

	$.get('../template.html', function(template) { 
		//var template = $(template).html();
		
		$('body').append(Mustache.render(template, templateData));
		//document.body.innerHTML = Mustache.render(template, templateData);
		//$('body').append( Mustache.to_html(template, templateData) );
	});

	
});
