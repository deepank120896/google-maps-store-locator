window.onload = function() {
    toggleZoomScreen();
}

var map;
var markers = [];
var infoWindow;
var mapStyle;

function initMap() {
    var losAngeles = { lat: +34.063380, lng: -118.358080 };
    var options = {
        zoom: 13,
        center : losAngeles,
        mapTypeId: 'roadmap',
        styles: styleRetro,
    }

    map = new google.maps.Map(document.getElementById('map'), options);
    infoWindow = new google.maps.InfoWindow();
    setOnClickListener();
    searchStores();
}

function searchStores() {
    var foundStores = [];
    var zipcode = document.querySelector('#zip-code-input').value;
    // console.log(zipcode)
    if(zipcode)
    {  
        stores.forEach(function(store){
        var postal = store.address.postalCode.substring(0,5);
        if(postal == zipcode){
            foundStores.push(store);
        }
        });
    }
    else{
        foundStores = stores;
    }
    // console.log(foundStores)
    clearLocations();
    displayStores(foundStores);
    showStoreMarkers(foundStores);
    setOnClickListener();
}

function clearLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;
}

function setOnClickListener() {
    var storeElements = document.querySelectorAll('.store-container');
    // console.log(storeElements);
    storeElements.forEach(function(element, index) {
        element.addEventListener('click', function() {
            new google.maps.event.trigger(markers[index], 'click');
        })
    })
}

function displayStores(stores) {
    var storesHtml = '';

    stores.forEach(function(store,index){
        //console.log(store);
        var address = store.addressLines;
        var phone = store.phoneNumber;
         
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
                        ${index+1}
                    </div>
                </div>
            </div>
        </div>
        `;
        });
        document.querySelector('.stores-list').innerHTML = storesHtml;
}

function showStoreMarkers(stores) {
    var bounds = new google.maps.LatLngBounds();
    stores.forEach(function(store,index){
        var latlng = new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude);
        //console.log(latlng);
        var name = store.name;
        var address = store.addressLines[0];
        var phoneNumber = store.phoneNumber;
        var openStatusText = store.openStatusText;
        bounds.extend(latlng);
        createMarker(latlng, name, address,index+1, phoneNumber, openStatusText);
    });
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
    var icon = {
        url:'https://www.cda.eu/first-ever-fast-food-joints-mapped/img/starbucks-icon.png',
        scaledSize: new google.maps.Size(40, 50),
    }
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        icon: icon,
        label: `${storeCount}`,
        animation: google.maps.Animation.DROP,
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);});
    markers.push(marker);
}