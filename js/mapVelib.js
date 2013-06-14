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
var instruction;


function showMap(){


        var latlng = new google.maps.LatLng(48.8566140	, 2.3522219);

        var options = {
        center: latlng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };

    //constructeur de la carte qui prend en paramêtre le conteneur HTML
    //dans lequel la carte doit s'afficher et les options
     map = new google.maps.Map(document.getElementById("carte"), options);
    $(window).bind("load", parseXml());

    $("a.ajax").click(function() {
        $.ajax({
            type:"GET",
            url:$(this).attr("href"),
            success: function(retour){
                $("#content").empty().append(retour);
            }
        });
        return false;
    });
}


function parseXmlInfo(station_number){
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET","infoXml.php?station_number="+station_number,false);
    xmlhttp.send();
    var station = JSON.parse(xmlhttp.responseText);

    available = station.available;
    free = station.free;
    total = station.total;

}

function parseXml(){
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }


    xmlhttp.open("GET","velibCarto.xml",false);
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


        var html = "lol";

        /**+
         '</div>';**/


        var marker = new google.maps.Marker({
            map: map,
            position: point,
            number: station_number,
            html: html

        });


        google.maps.event.addListener(marker, 'click', function() {
            parseXmlInfo(this.number);
            ib.open(map,this);
            ib.setContent(this.html+'<p class="number">Vélos disponibles: '+available+'<br/>Emplacements Libres: '+free+'<br/>Nombre d\'emplacement: '+total+'</p>');
            map.setZoom(14);
            map.setCenter(point);

        });

    }


}

function loadvelibXml(){
    $.get('../view/velibXml.php');
    return false;
}