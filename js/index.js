var source   = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);

searchForHotels.addEventListener('click', function(e) {
	event.preventDefault();
	var city = cityHotelsSelect.value;
	switch(city) {
		case 'Moscow':
			var script = document.createElement('script');
			script.src = 'js/hotelsMsc.js';
			document.body.appendChild(script);
			break;
		case 'SPb':
			var script = document.createElement('script');
			script.src = 'js/hotelsSPb.js';
			document.body.appendChild(script);
			break;
		default: 	
		console.log('Unknown city');

	}
});

var loadedHotels = null;

function _getHotelsMsc (data) {
	var destination = document.querySelector('.search-results-container');
	removeChildren(destination);
	var sortedData = sortHotels(data); 
	// добавляем данные из массива в шаблон
	sortedData.forEach( function (element, index){
		var node = document.createElement('div');
		 node.innerHTML = template(element);
		destination.appendChild(node);
	});
	colorfullRatings();

}

function _getHotelsSPb (data) {
	var destination = document.querySelector('.search-results-container');
	removeChildren(destination);
	var sortedData = sortHotels(data); 
	// добавляем данные из массива в шаблон
	sortedData.forEach( function (element, index){
		var node = document.createElement('div');
		 node.innerHTML = template(element);
		destination.appendChild(node);
	});
	colorfullRatings();

}

// удаление всех элементов родителя
function removeChildren(elem) {
  while (elem.lastChild) {
    elem.removeChild(elem.lastChild);
  }
}

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

function sortHotels (hotels) {
	var sortType = document.querySelector('input[name=search-filter]:checked').value;
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

function sortHotelsByRatingPlus(hotels) {
	return hotels.sort(function(a,b){
		return a.rating > b.rating;
	})
}

function sortHotelsByRatingMinus(hotels) {
	return hotels.sort(function(a,b){
		return a.rating < b.rating;
	})
}

function sortHotelsByPricePlus(hotels) {
	return hotels.sort(function(a,b){
		return a.price > b.price;
	})
}

function sortHotelsByPriceMinus(hotels) {
	return hotels.sort(function(a,b){
		return a.price < b.price;
	})
}