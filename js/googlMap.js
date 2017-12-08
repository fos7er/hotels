	
  function initMap() {
  	var activeFilter = document.querySelector('input[name=map-filter]:checked').value;
  	var filteredHotels = [];
  	
  	filterHotels(activeFilter);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: {lat: -37.93, lng: 150.91},
      mapTypeId: 'terrain'
    });
    var label = 'Название отеля';
    var markers = createMarkers();

    // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
             maxZoom: 12
        		});
        mapFilter.addEventListener('click', function (e){
	
					var newFilter = document.querySelector('input[name=map-filter]:checked').value;

					if (newFilter == activeFilter) {
						activeFilter = newFilter;
						return
					}

					activeFilter = newFilter;
					filterHotels(activeFilter);
					markerCluster.clearMarkers();
					markers = createMarkers();
					markerCluster.addMarkers(markers);

					

				});


        function filterHotels(filter) {
	        switch(filter){
	      		case 'all':
	      		filteredHotels = hotels;
	      		break;

	      		case 'ecvi':
	      		 filteredHotels = hotels.filter(function(item){
	      			return item.type=='ECVI';
	      		});
	      		break;
	      		case 'edelweiss':
	      		 filteredHotels = hotels.filter(function(item){
	      			return item.type=='EDW';
	      		});
	      		break;
	      		default: console.log('unknown sortType');

	      	}
        }
        function createMarkers(){
        	return filteredHotels.map(function(hotel, i) {
	        	var img = (hotel.type == 'EDW') ? "img/icon-map-marker.svg" : "img/ecvi-marker.svg";

	          return new google.maps.Marker({
	            position: hotel.location,
	            title: hotel.name,
	            icon: {
						url: img,
						scaledSize: new google.maps.Size(40, 40)
					  } 
	           


	          });
	        });

        }
  }


  var hotels = [
  	{ name: 'Hotel1', location: {lat: -31.563910, lng: 147.154312}, type: 'ECVI' },
  	{ name: 'Hotel2', location: {lat: -33.718234, lng: 150.363181}, type: 'EDW' },
  	{ name: 'Hotel3', location: {lat: -33.727111, lng: 150.371124}, type: 'ECVI' },
  	{ name: 'Hotel4', location: {lat: -33.848588, lng: 151.209834}, type: 'EDW' },
  	{ name: 'Hotel5', location: {lat: -33.851702, lng: 151.216968}, type: 'ECVI' },
  	{ name: 'Hotel6', location: {lat: -34.671264, lng: 150.863657}, type: 'EDW' },
  	{ name: 'Hotel7', location: {lat: -37.759859, lng: 145.128708}, type: 'EDW' },
  	{ name: 'MAZAFAKA', location: {lat: -42.734350, lng: 147.439506}, type: 'ECVI' },
  	{ name: 'MAZA', location: {lat: -42.734358, lng: 147.501315}, type: 'ECVI' },
  	{ name: 'FAKA', location: {lat: -43.999792, lng: 170.463352}, type: 'EDW' }


  ];
    