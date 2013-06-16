/**
 * Created with JetBrains PhpStorm.
 * User: occul_000
 * Date: 14/06/13
 * Time: 02:14
 * To change this template use File | Settings | File Templates.
 */

var map;
var available;
var free;
var total;
var calculate;
var direction;
var panel;
var infoWindow = new google.maps.InfoWindow;


function showMap(){


    var latlng = new google.maps.LatLng(48.8566140	, 2.3522219);

    var options = {
        center: latlng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    map = new google.maps.Map(document.getElementById("carte"), options);

    direction = new google.maps.DirectionsRenderer({
        map   : map
    });

    direction.setPanel(document.getElementById('panel'));

    $(window).bind("load", leachXml());


}


calculate = function(){
    origin     = document.getElementById('depart').value; // Le point départ
    destination = document.getElementById('arrive').value; // Le point d'arrivé
    if(origin && destination){
        var request = {
            origin      : origin,
            destination : destination,
            travelMode  : google.maps.DirectionsTravelMode.DRIVING // Type de transport
        }
        var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
        directionsService.route(request, function(response, status){ // Envoie de la requête pour calculer le parcours
            if(status == google.maps.DirectionsStatus.OK){
                direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
            }
        });
    } //http://code.google.com/intl/fr-FR/apis/maps/documentation/javascript/reference.html#DirectionsRequest
};

function parseXmlInfo(station_number){
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET","info_velib.php?station_number="+station_number,false);
    xmlhttp.send();
    var station = JSON.parse(xmlhttp.responseText);

    available = station.available;
    free = station.free;
    total = station.total;

}

function leachXml(){
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }


    xmlhttp.open("GET","velib_map.xml",false);
    xmlhttp.send();
    var xmlVelib = xmlhttp.responseXML;



    var markers = xmlVelib.documentElement.getElementsByTagName("marker");

    for(var i= 0; i < markers.length ; i++){
        var name = markers[i].getAttribute("name");
        var station_number = markers[i].getAttribute("number");
        var address = markers[i].getAttribute("fullAddress");
        var point = new google.maps.LatLng(
            parseFloat(markers[i].getAttribute("lat")),
            parseFloat(markers[i].getAttribute("lng")));


        var html = '<div id="box-info">' +
            '<span>Station ' + name + '</span><br/>' +
            '<p>' + address +'</p> ' +
            '<a href="favoris.php?name='+name+'&&address='+address+'">Favoris </a> ' +
            '<a href="../view/dashboard.php?velibAdresse='+address+'">GPS  </a>';



        var marker = new google.maps.Marker({
            map: map,
            position: point,
            number: station_number,
            html: html

        });


        google.maps.event.addListener(marker, 'click', function() {
            parseXmlInfo(this.number);
            infoWindow.open(map,this);
            infoWindow.setContent(this.html+'<p class="number">Vélos disponibles: '+available+'<br/>Emplacements Libres: '+free+'<br/>Nombre d\'emplacement: '+total+'</p>');
            map.setZoom(14);
            map.setCenter(point);

        });

    }

}