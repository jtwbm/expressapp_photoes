var $grid = $('.grid').masonry({
  columnWidth: 250,
  itemSelector: '.grid-item'
});

$("[data-fancybox]").fancybox();

(function($) {

	$.fn.autoSearch = function() {

		var input = this;
		var searchForm = $(".searchForm");

		input.wrap('<div class="searchWrap"></div>');
		input.parent().append('<div class="searchDropdown"></div>');

		var searchDropdown = input.next();

		input.on('focus', function() {
			searchCheck();
		});

		input.on('keyup', function(e) {
			$(".searchDropdown").children().remove();
			searchCheck();
		});

		searchForm.on('submit', function(e) {
			e.preventDefault();

			if(input.val().trim() == '') {
				alert('Некорректное значение поля');
			} else {
				var tagName = input.val();
				document.location.href = '/tag/' + tagName;
			}
		});

		input.next().on('click', '.item', function({ target }) {
			input.val(target.textContent);
			searchDropdown.hide().children().remove();
			searchForm.submit();
		});

		$(document).on('click', function({ target }) {

			if(!($(target).closest('.searchWrap')[0]) && !($(target).hasClass('.searchWrap'))) {
				searchDropdown.slideUp('fast', function() {
					searchDropdown.children().remove();
				});
			}
		});

		function searchCheck() {
			if(input.val().length >= 2) {

				// ajax request
				// SELECT photo_src, photo_width, photo_height FROM photoes WHERE photo_id IN (
				// SELECT photo_id FROM photo_tag WHERE tag_id = 1) 

				// 


				var list = [];
				var allTags = [
						{"title": "woman"},
						{"title": "flower"},
						{"title": "decor"},
						{"title": "cake"},
						{"title": "sweet"},
						{"title": "icecream"},
						{"title": "fruit"}
					];

				for(var i = 0; i < allTags.length; i++) {
					var searchRequestStart = new RegExp("^" + input.val() + ".*", "i");
					var searchRequestMiddle = new RegExp(" " + input.val() + ".*", "i");

					if(searchRequestStart.test(allTags[i].title) || searchRequestMiddle.test(allTags[i].title)) {
						list.push(allTags[i]);
					}
				}

				for(var i = 0; i < list.length; i++) {
					searchDropdown.slideDown('fast').append("<div class='item'><span>" + list[i].title + "</span></div>");
				}

			}
		}

		return input;

	};

	$(document).ready(function() {
		$('#search').autoSearch();
	});

}(jQuery));