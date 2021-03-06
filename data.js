var data = [
	{
		"regExp" :/euro-pic\.eu\/share-(.*)\.html/i,
		"target" :'euro-pic.eu/image.php?id=$1'
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
		"regExp" :/imagepdb\.com\/\?p=(.*\S)/i,
		"target" :'imagepdb.com/images/$1.jpg'
	},
	{
		"regExp" :/imagepdb\.com\/\?v=(.*\S)/i,
		"target" :'imagepdb.com/images/$1.jpg'
	},
	{
		"regExp" :/imgsure\.com\/\?v=(.*\S)/i,
		"target" :'imgsure.com/images/$1.jpg'
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
		"regExp" :/seedimage\.com\/X\/viewer.php\?file=(.*\S)/i,
		"target" :'seedimage.com/X\/images/$1'
	},
	{
		"regExp" :/imageview\.me\/viewer.php\?file=(.*\S)/i,
		"target" :'imageview.me/images/$1'
	},
	{
		"regExp" :/244pix\.com\/viewer.php\?file=(.*\S)/i,
		"target" :'244pix.com/images/$1'
	},
	{
		"regExp" :/xxxhost\.me\/viewer.php\?file=(.*\S)/i,
		"target" :'xxxhost.me/files/$1',
		"hotlink" : true
	},
	{
		"regExp" :/xxxces\.com\/viewer.php\?file=(.*\S)/i,
		"target" :'xxxces.com/files/$1',
		"hotlink" : true
	},
	{
		"regExp" :/imgnip\.com\/viewer\.php\?file=(.*\S)/i,
		"target" :'imgnip.com/images/$1',
		"hotlink" : true
	},
	{
		"regExp" :/imgboxxx\.com\/viewer.php\?file=(.*\S)/i,
		"target" :'imgboxxx.com/images/$1',
		"hotlink" : true
	},
	{
		"regExp" :/imagecurl\.org\/viewer.php\?file=(.*\S)/i,
		"target" :'imagecurl.org/images/$1',
		"hotlink" : true
	},
	{
		"regExp" :/imghoney\.com\/viewer.php\?file=(.*\S)/i,
		"target" :'imghoney.com/images/$1',
		"hotlink" : true
	},
	/* {
		"regExp" :/imagesnake\.org\/show\/(.*\S)/i,
		"target" :/(imagesnake\.org\/tn\/.*?)"/i,
		"load" : true,
		"hotlink" : true
	}, */
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
		"regExp" :/picturevip\.com\/x\/clean\/(.*\S)/i,
		"target" :/(picturevip\.com\/x\/clean\/images\/.*?)"/i,
		"load" : true
	},
	{
		"regExp" :/picturescream\.com\/x\/clean\/(.*\S)/i,
		"target" :/(picturescream\.com\/x\/clean\/images\/.*?)"/i,
		"load" : true
	},
	{
		"regExp" :/picturescream\.asia\/soft\/(.*\S)/i,
		"target" :/(picturescream\.asia\/soft\/images\/.*?)"/i,
		"load" : true
	},
	{
		"regExp" :/imagescream\.com\/img\/soft\/(.*\S)/i,
		"target" :/(imagescream\.com\/img\/soft\/images\/.*?)"/i,
		"load" : true
	},
	{
		"regExp" :/mypornimage\.com\/adultimage\/(.*\S)/i,
		"target" :/(mypornimage\.com\/images\/.*?)"/i,
		"load" : true
	},
	{
		"regExp" :/imagedomino\.com\/\?g=(.*\S)/i,
		"find" :/imagedomino\.com\/\?v=(.*)'/gi,
		"target" :'imagedomino.com/images/$1.jpg',
		"multi" : true
	},
];