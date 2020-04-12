window.onload = function() {
    displayStores();
}

var map;
var markers = [];
var infoWindow;

function initMap() {
    // var karnataka = { lat: 15.317277, lng: 75.713890 };
    // var bengaluru = { lat: 12.972442, lng: 77.580643 }
    var losAngeles = { lat: 34.063380, lng: -118.358080 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 10,
        mapTypeId: 'roadmap'
    });
    showStoreMarkers();
}

function displayStores() {
    let storesHtml = '';
    let storeNo = 0;
    for (let store of stores) {

        storeNo++;
        let address = store['addressLines'];
        let phone = store['phoneNumber'];

        storesHtml += `
        <div class="store-container">
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
        `
        document.querySelector('.stores-list').innerHTML = storesHtml;
    }
}

function showStoreMarkers() {

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
            <i class="fas fa-location-arrow"></i>
            ${address}
        </div>
        <div class="store-info-phone">
            <i class="fas fa-phone-alt"></i>
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