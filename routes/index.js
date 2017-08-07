var optionsJSON = require('../options.json');
var dataJSON = require('../data.json');

// home
exports.home = function(req, res) {
	res.render('home', {
		title: optionsJSON.title,
		tags: dataJSON.tags,
		images: dataJSON.images,
		homepageLink: false
	});
};

// tag
exports.tag = function(req, res) {

	var currentTag = dataJSON.tags.find(function(el) {
		if(el.title == req.params.tag ) return true;
	});

	if(currentTag) {
		var images = dataJSON.images.filter(function(img) {
			var hasTag = img.tags.find(function(tag) {
				if(tag == currentTag.id) return true;
			});

			if(hasTag) return img;
		});
		
		res.render('home', {
			title: currentTag.title,
			tags: dataJSON.tags,
			images: images,
			homepageLink: true
		});
	} else {
		res.render('tagNotFound', {
			title: 'Tag is not found',
			homepageLink: true
		});
	}
};

// notFound
exports.notFound = function(req, res) {
	res.render('notFound', {
		title: optionsJSON.page404,
		homepageLink: false
	});
};