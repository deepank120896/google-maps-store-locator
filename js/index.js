function initMap() {
    var karnataka = { lat: 15.317277, lng: 75.713890 };
    var bengaluru = { lat: 12.972442, lng: 77.580643 }
        //var sydney = { lat: -33.863276, lng: 151.107977 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: karnataka,
        zoom: 9,
        mapTypeId: 'roadmap'
    });
}

var marker = new google.maps.Marker({ position: myCenter });
marker.setMap(map);