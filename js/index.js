window.onload = function() {}

var map;
var markers = [];
var infoWindow;

function initMap() {
    // var karnataka = { lat: 15.317277, lng: 75.713890 };
     var bengaluru = { lat: 12.972442, lng: 77.580643 }
    //var losAngeles = { lat: +34.063380, lng: -118.358080 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: bengaluru,
        zoom: 10,
        mapTypeId: 'roadmap'
    });
    //displayStores();
    //showStoreMarkers();
    // setOnClickListener();
    searchStores();

}

function searchStores() {
    let foundStores = [];
    let zipcode = document.getElementById('zip-code-input').value;

    if (zipcode) {
        for (let store of stores) {
            if (zipcode === store['address']['postalCode'].substring(0, 5))
                foundStores.push(store);
        }
    } else {
        foundStores = stores;
    }
    clearLocations();
    //displayStores(foundStores);
    //showStoreMarkers(foundStores);
    setOnClickListener();
}

function clearLocations() {
    // infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;
}

function setOnClickListener() {

    let index = 0;
    let storeElements = document.querySelectorAll('.store-container');
    storeElements.forEach(function(element, index) {
        element.addEventListener('click', function() {
            new google.maps.event.trigger(markers[index], 'click');
        })
    })
}

function displayStores(stores) {
    let storesHtml = '';
    let storeNo = 0;
    for (let store of stores) {

        storeNo++;
        let address = store['addressLines'];
        let phone = store['phoneNumber'];

        storesHtml += `
        
        <div class="store-container">
            <div class="store-container-background">
                <div class="store-info-container">
                    <div class="store-address">
                        <span>${address[0]}</span>
                        <span>${address[1]}</span>
                    </div>
                    <div class="store-phone">
                        <i class="fas fa-phone"></i> ${phone}
                    </div>
                </div>
                <div class="store-no-container">
                    <div class="store-no">
                        ${storeNo}
                    </div>
                </div>
            </div>
        </div>
        `
        document.querySelector('.stores-list').innerHTML = storesHtml;
    }
}

function showStoreMarkers(stores) {

    let bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow();
    let storeCount = 0;

    for (let store of stores) {
        storeCount++;
        let name = store['name'];
        let address = store['addressLines'][0];
        let phoneNumber = store['phoneNumber'];
        let openStatusText = store['openStatusText'];

        let latlng = new google.maps.LatLng(
            store['coordinates']['latitude'],
            store['coordinates']['longitude']);
        bounds.extend(latlng);

        createMarker(latlng, name, address, storeCount, phoneNumber, openStatusText);
    }
    map.fitBounds(bounds);
}

function createMarker(latlng, name, address, storeCount, phoneNumber, openStatusText) {
    var html = `
    <div class="store-info-window">
        <div class="store-info-name">
            ${name}
        </div>
        <div class="store-info-status">
            ${openStatusText}
        </div>
        <div class="store-info-address">
            <div class="circle">
                <i class="fas fa-location-arrow"></i>
            </div>
            
            ${address}
        </div>
        <div class="store-info-phone">
            <div class="circle">
                <i class="fas fa-phone-alt"></i>
            </div>
            ${phoneNumber}
        </div>
    </div>
    `;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        label: storeCount.toString()
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);


}