/*

pour l'accès au données de station : 'http://www.velib.paris.fr/service/stationdetails/[id]'
de la forme :

 <station>
    <available>0</available> <- disponibles
    <free>28</free> <- déjà pris
    <total>28</total>
    <ticket>1</ticket>
    <open>1</open>
    <updated>1363357271</updated>
    <connected>1</connected>
 </station>

=> chercher comment rendre le chargement évenementiel et asynchrone.

 */



var XmlParser = {};
var map;
var doc;
var needRefresh =0;


XmlParser.markers = new Array();

XmlParser.starter = function (){

    XmlParser.mapConstructor();
    XmlParser.parserXML();
}

XmlParser.showDetailsStation=function(id){
    if (window.XMLHttpRequest) {
        var request=new XMLHttpRequest();
    }
    try{
        request.open("GET", "http://www.velib.paris.fr/service/stationdetails/"+id, false);
        request.send(null);
        var stationXmlDoc = request.responseXML;
    }
    catch (e){
        alert('Impossible d\'accéder aux données de la station');
    }
}

XmlParser.findDestination = function(){
    if (needRefresh==1){
        map=null;
        needRefresh=0;
        XmlParser.starter();
    }
    GMaps.geocode({
        address: $('#address').val().trim(),
        callback: function(results, status)
        {
            if(status=='OK')
            {
                var latlng = results[0].geometry.location;
                map.setCenter(latlng.lat(), latlng.lng());
                map.setZoom(15);
                map.addMarker(
                {
                    icon: "6_lime_selected.png",
                    lat: latlng.lat(),
                    lng: latlng.lng(),
                    zIndex: 999
                });


            }
        }
    });
    needRefresh=1;
}


/*
    map.drawRoute({
     origin: [latlng1.lat(), latlng1.lng()],
     destination: [latlng2.lat(), latlng2.lng()],
     travelMode: 'bicycling',
     strokeColor: '#42C451',
     strokeOpacity: 0.6,
     strokeWeight: 6
     });
    map.setCenter(48.856583, 2.343121);
    map.setZoom(12);*/


XmlParser.localisator = function(){

    alert('lat : '+XmlParser.markers[1001].lat);
    GMaps.geolocate({
        success: function(position){

            var smallestDistance = 1000;
            var closestStationID;

            for (var i = 0;i<XmlParser.markers.length;i++)
            {
                var stationLNG = XmlParser.markers[i].lng;
                var stationLAT= XmlParser.markers[i].lat;
                if (stationLNG < 0){stationLNG *-1}
                if (stationLAT < 0){stationLAT *-1}
                var distance = Math.sqrt((position.coords.latitude-stationLAT)*(position.coords.latitude-stationLAT)+(position.coords.longitude-stationLNG)*(position.coords.longitude-stationLNG));
                if (distance < smallestDistance)
                {
                    smallestDistance = distance;
                    closestStationID = i;
                }
            }

            map.addMarker({
                icon: "6_lime_selected.png",
                lat:  XmlParser.markers[closestStationID].lat,
                lng:  XmlParser.markers[closestStationID].lng,
                title: 'La station la plus proche est : ',
                infoWindow: {
                    content: 'La station la plus proche : '+capitaliseFirstLetter( XmlParser.markers[closestStationID].infoWindow.content)
                },
                zIndex: 999
            });
            map.setCenter( XmlParser.markers[closestStationID].lat,  XmlParser.markers[closestStationID].lng);
            map.setZoom(15);
            map.addMarker({
                icon: "9_orange_actual_position.png",
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                infoWindow: {content: 'Vous êtes ici !'},
                zIndex: 998

            });

/*
            for (var i = 0; i < doc.getElementsByTagName("marker").length ; i++)
            {
                var stationLNG = doc.getElementsByTagName("marker")[i].getAttribute("lng");
                var stationLAT= doc.getElementsByTagName("marker")[i].getAttribute("lat");
                if (stationLNG < 0){stationLNG *-1}
                if (stationLAT < 0){stationLAT *-1}
                var distance = Math.sqrt((position.coords.latitude-stationLAT)*(position.coords.latitude-stationLAT)+(position.coords.longitude-stationLNG)*(position.coords.longitude-stationLNG));
                if (distance < smallestDistance)
                {
                    smallestDistance = distance;
                    closestStationID = i;
                }
            }






*/
        },
        error: function(error){
            alert('La géolocalisation a échouée: '+error.message);
        },
        not_supported: function(){
            alert("Votre navigateur ne supporte pas la géolocalisation, optez pour un navigateur plus récent.");
        }
    });

}
XmlParser.mapConstructor = function(){
    map = new GMaps
        ({
        el: '#map',
        lat: 48.85661,
        lng: 2.33522,
        zoom: 12,
        zoomControl : true,
        zoomControlOpt:
            {
            style : 'SMALL',
            position: 'TOP_LEFT'
            },
        panControl : false,
        streetViewControl : true,
        mapTypeControl: true,
        overviewMapControl: false
        });
    map.addControl({
        position: 'top_right',
        content: 'Me trouver',
        style: {
            margin: '5px',
            padding: '1px 6px',
            border: 'solid 1px #717B87',
            background: '#fff'
        },
        events: {
            click: function(){
                XmlParser.localisator();
            }
        }
    });

}

XmlParser.parserXML = function (){


    if (window.XMLHttpRequest) {
        var request=new XMLHttpRequest();
    }
    try{
        request.onload(function(){

            if(request.readyState ==4 && request.status ==200){
                doc = request.responseXML;
                for (var i = 0; i < doc.getElementsByTagName("marker").length ; i++)
                {
                    if(doc.getElementsByTagName("marker")[i].getAttribute("lat")<= 48.999999 && doc.getElementsByTagName("marker")[i].getAttribute("lat")>= 48.700000)
                    {
                        XmlParser.markers[i] = {lng:"", lat:"", infoWindow:"",icon:""};
                        XmlParser.markers[i].lng = doc.getElementsByTagName("marker")[i].getAttribute("lng");
                        XmlParser.markers[i].lat = doc.getElementsByTagName("marker")[i].getAttribute("lat");
                        XmlParser.markers[i].infoWindow =
                        {
                            content: PrettyFormat(doc.getElementsByTagName("marker")[i].getAttribute("fullAddress")) + ""



                        };
                        XmlParser.markers[i].icon= "6_blue_stations.png";
                    }
                }

                map.addMarkers(XmlParser.markers);
            }
        });
        request.open("GET", "accessToRessources.php?url=http://www.velib.paris.fr/service/carto", false);
        request.send(null);



    }
    catch (e){
        alert('Impossible d\'accéder aux données des stations, utilisation de données sauvegardées');
        try{
            request.open("GET", "cartoParis.xml", false);
            request.send(null);

            doc = request.responseXML;
            for (var i = 0; i < doc.getElementsByTagName("marker").length ; i++)
            {
                if(doc.getElementsByTagName("marker")[i].getAttribute("lat")<= 48.999999 && doc.getElementsByTagName("marker")[i].getAttribute("lat")>= 48.700000)
                {
                    XmlParser.markers[i] = {lng:"", lat:"", infoWindow:"",icon:""};
                    XmlParser.markers[i].lng = doc.getElementsByTagName("marker")[i].getAttribute("lng");
                    XmlParser.markers[i].lat = doc.getElementsByTagName("marker")[i].getAttribute("lat");
                    XmlParser.markers[i].infoWindow =
                    {
                        content: PrettyFormat(doc.getElementsByTagName("marker")[i].getAttribute("fullAddress")) + ""



                    };
                    XmlParser.markers[i].icon= "6_blue_stations.png";
                }
            }

            map.addMarkers(XmlParser.markers);
        }
        catch (e){
            alert('Impossible d\'accéder aux données sauvegardées');
        }
    }


}

function PrettyFormat(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


