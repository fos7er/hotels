var source   = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);
var activeFilter = document.querySelector('input[name=search-filter]:checked').value;
var hotels = [];
var destination = document.querySelector('.search-results-container');
var currentPage = 0;
var PAGE_SIZE = 12;

//  Получение информации с сервера, в первом случае JSONP во втором AJAX
searchForHotels.addEventListener('click', function(e) {
	e.preventDefault();
	var city = cityHotelsSelect.value;
	currentPage = 0;
	switch(city) {
		case 'Moscow':
			var script = document.createElement('script');
			script.src = 'js/hotelsMsc.js';
			document.body.appendChild(script);
			break;
		case 'SPb':
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'js/hotelsSPb.js', true);
			xhr.timeout = 10000;
			xhr.onload = function(e) {
				_getHotelsSPb(JSON.parse(xhr.response));
			}
			xhr.send();
			break;

		
		default: 	
			console.log('Unknown city');

	}
});


// обработчик фильтров отелей

document.querySelector('.search-filter').addEventListener('click', function (e){
	
	var newFilter = document.querySelector('input[name=search-filter]:checked').value;

	if (newFilter == activeFilter) {
		activeFilter = newFilter;
		return
	}

	activeFilter = newFilter;
	removeChildren(destination);
	var sortedData = sortHotels(hotels); 
	// добавляем данные из массива в шаблон
	HotelsToTemplate (sortedData, 0);
	colorfullRatings();

});



function _getHotelsMsc (data) {
	removeChildren(destination);
	var sortedData = hotels = sortHotels(data); 
	HotelsToTemplate (sortedData, 0);
	colorfullRatings();

}

function _getHotelsSPb (data) {
	removeChildren(destination);
	var sortedData = hotels = sortHotels(data); 
	HotelsToTemplate (sortedData, 0);
	colorfullRatings();

}

// добавление элемнетов при скролле странциы вниз

window.addEventListener('scroll', function(){
	// if ( scrollBy(0, -1) ) return;
	var footerCoords = footer.getBoundingClientRect();
	if ( footerCoords.bottom - window.innerHeight <= footerCoords.height ) {
		HotelsToTemplate(hotels, ++currentPage);
		colorfullRatings();
	}
	
});

//  прогоняем отели через шаблонизатор
function HotelsToTemplate (sortedData, pageNumber) {
	var fragment = document.createDocumentFragment();
	var from = pageNumber * PAGE_SIZE;
	var to = from + PAGE_SIZE;
	var pageHotels = sortedData.slice(from, to);
	;
	if (from != from) {

		console.log('pageNumber or PAGE_SIZE not a number');
	}

		// добавляем данные из массива в шаблон
	pageHotels.forEach( function (element, index){
		var node = document.createElement('div');
		 node.innerHTML = template(element);
		fragment.appendChild(node);
	});
	destination.appendChild(fragment);

}

// удаление всех элементов из родителя
function removeChildren(elem) {
  while (elem.lastChild) {
    elem.removeChild(elem.lastChild);
  }
}

// цветные рейтинги у отелей
function colorfullRatings(){
	var allRatings = document.querySelectorAll('.hotel-rating');
	allRatings.forEach(function(elem, index) {

		var value = parseFloat(elem.textContent);
		
		if (value < 5.5) {
			elem.classList.add('low-rating');
		}
		else if (value > 5.5 && value < 8.0) {
			elem.classList.add('medium-rating');
		}
		else {
			elem.classList.add('high-rating');
		}
	});

}

// варианты сортировки
function sortHotels (hotels) {
	if ( !Array.isArray(hotels) ) {
		console.log('Ошибка: Данные с сервера не массив!');
	}
	var sortType = activeFilter;
	switch (sortType) {
		case 'rating+':
			 return sortHotelsByRatingPlus(hotels);
			
		case 'rating-': 
			 return sortHotelsByRatingMinus(hotels);
		
		case 'price+':
			return sortHotelsByPricePlus(hotels);
			
		case 'price-':
			return sortHotelsByPriceMinus(hotels);
			
		default :
			console.log("inknown sortType");				
	}
}

// алгоритмы сортировки

function sortHotelsByRatingPlus(hotels) {
	return hotels.sort(function(a,b){
		return a.rating > b.rating ? 1 : -1;
	})
}

function sortHotelsByRatingMinus(hotels) {
	return hotels.sort(function(a,b){
		return a.rating < b.rating ? 1 : -1;
	})
}

function sortHotelsByPricePlus(hotels) {
	return hotels.sort(function(a,b){
		return a.price > b.price ? 1 : -1;
	})
}

function sortHotelsByPriceMinus(hotels) {
	return hotels.sort(function(a,b){
		return a.price < b.price ? 1 : -1;
	})
}