var map;
var markersArray = [];
var markersCustomArray = [];
/*
* 0 = marker position réelle
* 1 = marker station la plus proche
* 3 = marker origine
* 4 = marker destination
* */

var carto;
var geolocalisationEnabled = true;
var isMemorizedPosition = false;
var memorizedPosition;

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();


function initialize() {

    if (!navigator.geolocation){
        geolocalisationEnabled = false;
    }
    else
    {
        // Je rajoute la fonction trouve moi dans un control intégré

        var GetGeolocateDiv = document.createElement('div');

        GetGeolocateDiv.style.padding = '2px';
        GetGeolocateDiv.style.paddingTop = '5px';

        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = 'white';
        controlUI.style.borderStyle = 'solid';
        controlUI.style.borderWidth = '1px';
        controlUI.style.cursor = 'pointer';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Trouve Moi !';
        GetGeolocateDiv.appendChild(controlUI);


        var controlText = document.createElement('div');
        controlText.style.fontFamily = 'Arial,sans-serif';
        controlText.style.fontSize = '13px';
        controlText.style.paddingLeft = '4px';
        controlText.style.paddingRight = '4px';
        controlText.style.paddingTop = '1px';
        controlText.innerHTML = 'Trouve Moi !';
        controlUI.appendChild(controlText);


        google.maps.event.addDomListener(controlUI, 'click', function() {
            if (isMemorizedPosition){
                map.setCenter(memorizedPosition);
            }else{
                navigator.geolocation.getCurrentPosition(GetGeolocate,null);
                isMemorizedPosition = true;
            }

        });
    }

    directionsDisplay = new google.maps.DirectionsRenderer({'suppressMarkers' : true});
    directionsDisplay.setMap(map);



    var mapOptions =
    {
        center: new google.maps.LatLng(48.85661,2.33522),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom : 12,
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
    }

    infoWindow = new google.maps.InfoWindow();
    geocoder= new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById("map2"), mapOptions);

    $(window).bind("load",GetCartography());

    if (geolocalisationEnabled)
    {
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(GetGeolocateDiv);


    }


}


//formalise les différentes posibilitée d'entrée du champs de recherche
function ChooseInput(){
    address1 = document.getElementById("address1").value;
    address2 = document.getElementById("address2").value;
    addressOrigin = "origin";
    if (address1 != "" && address2 != ""){
        FindItineraire(address1,address2);
    }
    else if (address1 == "" && address2 != "" ){
        FindItineraire(addressOrigin,address2);
    }
    else if (address1 != "" && address2 == "" ){
        FindItineraire(address1,addressOrigin);
    }
}

function FindItineraire(address1, address2){
    boundsParis = new google.maps.LatLngBounds(new google.maps.LatLng(48.789902,2.202358),new google.maps.LatLng(48.944151,2.473583));

    if (address1=='origin'&&address2=='origin'){}
    else if (address1=="origin"){ //recherche de l'itineraire entre ma position et une destination

        geocoder.geocode({'address':address2, 'bounds':boundsParis},function(results,status){
            if (status == google.maps.GeocoderStatus.OK)
            {

                address1Id=FindNearestStation(results[0].geometry.location);
                markerAddress2 = new google.maps.Marker({
                    position:  markersArray[address1Id].position,
                    map:map,
                    title: 'Destination : '+  markersArray[address1Id].title,
                    stationStatus: markersArray[address1Id].stationStatus,
                    icon: "6_lime_selected.png",
                    number: markersArray[address1Id].number,
                    zIndex: 998
                });
                google.maps.event.addListener(markerAddress2,'click',function (){
                    infoWindow.setContent(this.title);
                    infoWindow.open(map,this);

                    if(markerAddress2.stationStatus=="")
                    {
                        var request2=new XMLHttpRequest();
                        request2.open("GET", "accessToRessources.php?url=http://www.velib.paris.fr/service/stationdetails/"+this.number, false);
                        request2.send();
                        if(request2.readyState ==4 && request2.status ==200)
                        {
                            var leString = request2.responseText;
                            leString = ParserStringXml(leString);

                            this.stationStatus =
                                "<br/>Vélibs disponibles:"
                                    +leString.getElementsByTagName("available")[0].firstChild.nodeValue
                                    +"<br/>Total :"
                                    +leString.getElementsByTagName("total")[0].firstChild.nodeValue;
                        }
                        else{
                            this.stationStatus = "Nous ne pouvons pas obtenir le nombre de vélibs libres."
                        }
                    }

                    infoWindow.setContent(this.title+this.stationStatus)
                });

                //markersCustomArray[4].setMap(null);
                markersCustomArray[4]=markerAddress2;
                markersCustomArray[3]=markersCustomArray[1];
                if(isMemorizedPosition)
                { //Si on cherche une station dans destination après s'être localisé


                    requestDirections = {
                        origin : markersCustomArray[3].position,
                        destination:markersCustomArray[4].position,
                        travelMode:google.maps.TravelMode.WALKING
                    }
                    directionsService.route(requestDirections,function(result,status){

                        if (status == google.maps.DirectionsStatus.OK) {
                            document.getElementById("instructions").nodeValue = "";
                            directionsDisplay.setPanel(document.getElementById("instructions"));

                            directionsDisplay.setDirections(result);
                        }

                    });
                }


                map.setCenter(markerAddress2.position);
                
            }
        });
    }
    else if (address2=="origin"){ //recherche de l'itineraire entre une origine et ma position

        geocoder.geocode({'address':address1, 'bounds':boundsParis},function(results,status){
            if (status == google.maps.GeocoderStatus.OK)
            {

                address1Id=FindNearestStation(results[0].geometry.location);
                markerAddress2 = new google.maps.Marker({
                    position:  markersArray[address1Id].position,
                    map:map,
                    title: 'Origine : '+  markersArray[address1Id].title,
                    stationStatus: markersArray[address1Id].stationStatus,
                    icon: "6_lime_selected.png",
                    number: markersArray[address1Id].number,
                    zIndex: 998
                });
                google.maps.event.addListener(markerAddress2,'click',function (){
                    infoWindow.setContent(this.title);
                    infoWindow.open(map,this);

                    if(markerAddress2.stationStatus=="")
                    {
                        var request2=new XMLHttpRequest();
                        request2.open("GET", "accessToRessources.php?url=http://www.velib.paris.fr/service/stationdetails/"+this.number, false);
                        request2.send();
                        if(request2.readyState ==4 && request2.status ==200)
                        {
                            var leString = request2.responseText;
                            leString = ParserStringXml(leString);

                            this.stationStatus =
                                "<br/>Vélibs disponibles:"
                                    +leString.getElementsByTagName("available")[0].firstChild.nodeValue
                                    +"<br/>Total :"
                                    +leString.getElementsByTagName("total")[0].firstChild.nodeValue;
                        }
                        else{
                            this.stationStatus = "Nous ne pouvons pas obtenir le nombre de vélibs libres."
                        }
                    }

                    infoWindow.setContent(this.title+this.stationStatus)
                });

                //markersCustomArray[4].setMap(null);
                markersCustomArray[3]=markerAddress2;
                markersCustomArray[4]=markersCustomArray[1];


                if(isMemorizedPosition)
                { //Si on cherche une station dans destination après s'être localisé

                    requestDirections = {
                        origin : markersCustomArray[3].position,
                        destination:markersCustomArray[4].position,
                        travelMode:google.maps.TravelMode.WALKING
                    }
                    directionsService.route(requestDirections,function(result,status){

                        if (status == google.maps.DirectionsStatus.OK) {
                            document.getElementById("instructions").nodeValue = "";
                            directionsDisplay.setPanel(document.getElementById("instructions"));
                            directionsDisplay.setDirections(result);

                        }

                    });
                }


                map.setCenter(markerAddress2.position);

            }
        });
    }
    else //recherche de l'itinéraire entre deux adresses spécifiées
    {
//affichage de la station de vélib la plus proche de l'origine
        geocoder.geocode({'address':address1, 'bounds':boundsParis},function(results,status){
            if (status == google.maps.GeocoderStatus.OK)
            {

                address1Id=FindNearestStation(results[0].geometry.location);
                var markerAddress1 = new google.maps.Marker({
                    position:  markersArray[address1Id].position,
                    map:map,
                    title: 'Origine : '+  markersArray[address1Id].title,
                    stationStatus: markersArray[address1Id].stationStatus,
                    icon: "6_lime_selected.png",
                    number: markersArray[address1Id].number,
                    zIndex: 998
                });
                google.maps.event.addListener(markerAddress1,'click',function (){
                    infoWindow.setContent(this.title);
                    infoWindow.open(map,this);

                    if(markerAddress1.stationStatus=="")
                    {
                        var request2=new XMLHttpRequest();
                        request2.open("GET", "accessToRessources.php?url=http://www.velib.paris.fr/service/stationdetails/"+this.number, false);
                        request2.send();
                        if(request2.readyState ==4 && request2.status ==200)
                        {
                            var leString = request2.responseText;
                            leString = ParserStringXml(leString);

                            this.stationStatus =
                                "<br/>Vélibs disponibles:"
                                    +leString.getElementsByTagName("available")[0].firstChild.nodeValue
                                    +"<br/>Total :"
                                    +leString.getElementsByTagName("total")[0].firstChild.nodeValue;
                        }
                        else{
                            this.stationStatus = "Nous ne pouvons pas obtenir le nombre de vélibs libres."
                        }
                    }

                    infoWindow.setContent(this.title+this.stationStatus)
                });


                markersCustomArray[3]=markerAddress1;
//affichage de la station de vélib la plus proche de la destination
                geocoder.geocode({'address':address2, 'bounds':boundsParis},function(results,status){
                    if (status == google.maps.GeocoderStatus.OK)
                    {

                        address1Id=FindNearestStation(results[0].geometry.location);
                        markerAddress2 = new google.maps.Marker({
                            position:  markersArray[address1Id].position,
                            map:map,
                            title: 'Destination : '+  markersArray[address1Id].title,
                            stationStatus: markersArray[address1Id].stationStatus,
                            icon: "6_lime_selected.png",
                            number: markersArray[address1Id].number,
                            zIndex: 998
                        });
                        google.maps.event.addListener(markerAddress2,'click',function (){
                            infoWindow.setContent(this.title);
                            infoWindow.open(map,this);

                            if(markerAddress2.stationStatus=="")
                            {
                                var request2=new XMLHttpRequest();
                                request2.open("GET", "accessToRessources.php?url=http://www.velib.paris.fr/service/stationdetails/"+this.number, false);
                                request2.send();
                                if(request2.readyState ==4 && request2.status ==200)
                                {
                                    var leString = request2.responseText;
                                    leString = ParserStringXml(leString);

                                    this.stationStatus =
                                        "<br/>Vélibs disponibles:"
                                            +leString.getElementsByTagName("available")[0].firstChild.nodeValue
                                            +"<br/>Total :"
                                            +leString.getElementsByTagName("total")[0].firstChild.nodeValue;
                                }
                                else{
                                    this.stationStatus = "Nous ne pouvons pas obtenir le nombre de vélibs libres."
                                }
                            }

                            infoWindow.setContent(this.title+this.stationStatus)
                        });
                        markersCustomArray[4]=markerAddress2;

//Affichage de l'itineraire


                        requestDirections = {
                            origin : markersCustomArray[3].position,
                            destination:markersCustomArray[4].position,
                            travelMode:google.maps.TravelMode.WALKING
                        }
                        directionsService.route(requestDirections,function(result,status){

                            if (status == google.maps.DirectionsStatus.OK) {
                                document.getElementById("instructions").nodeValue = "";
                                directionsDisplay.setPanel(document.getElementById("instructions"));
                                directionsDisplay.setDirections(result);
                            }

                        });
                    }
                });
            }
        });

        map.setCenter(markersCustomArray[4].position);

    }

}


//requête la carte de station et l'affiche avec des markers
function GetCartography(){

    var request1=new XMLHttpRequest();
    request1.open("GET", "accessToRessources.php?url=http://www.velib.paris.fr/service/carto", false);
    request1.send();

    if(request1.readyState ==4 && request1.status ==200)
    {
        carto = request1.responseText;
        carto = ParserStringXml(carto);

        for(var i = 0;i<carto.documentElement.getElementsByTagName("marker").length;i++)
        {
            AddMarker(carto.documentElement.getElementsByTagName("marker")[i]);

            google.maps.event.addListener(marker,'click',function (){
                infoWindow.setContent(this.title);
                infoWindow.open(map,this);

                if(marker.stationStatus=="")
                {
                    var request2=new XMLHttpRequest();
                    request2.open("GET", "accessToRessources.php?url=http://www.velib.paris.fr/service/stationdetails/"+this.number, false);
                    request2.send();
                    if(request2.readyState ==4 && request2.status ==200)
                    {
                        var leString = request2.responseText;
                        leString = ParserStringXml(leString);

                        this.stationStatus =
                            "<br/>Vélibs disponibles:"
                            +leString.getElementsByTagName("available")[0].firstChild.nodeValue
                            +"<br/>Total :"
                            +leString.getElementsByTagName("total")[0].firstChild.nodeValue;
                    }
                    else{
                        this.stationStatus = "Nous ne pouvons pas obtenir le nombre de vélibs libres."
                    }
                }

                infoWindow.setContent(this.title+this.stationStatus)
            });
        }
    }


}

//requete la position réelle et l'affiche sur la carte avec un marker, ainsi qu ela station la plus proche
function GetGeolocate(position){
    memorizedPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    actualPosition = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map: map,
        title:"Vous êtes ici",
        icon:'9_orange_actual_position.png',
        zIndex:999
    });

    google.maps.event.addListener(actualPosition,'click',function (){
        infoWindow.setContent(this.title);
        infoWindow.open(map,this);

    });

    markersCustomArray[0]=actualPosition;

    var smallestDistance = 1000;
    var closestStationID;

    for (var i = 0;i<markersArray.length;i++)
    {
        var stationLNG = markersArray[i].position.lng();
        var stationLAT= markersArray[i].position.lat();
        if (stationLNG < 0){stationLNG *-1}
        if (stationLAT < 0){stationLAT *-1}
        var distance = Math.sqrt((position.coords.latitude-stationLAT)*(position.coords.latitude-stationLAT)+(position.coords.longitude-stationLNG)*(position.coords.longitude-stationLNG));
        if (distance < smallestDistance)
        {
            smallestDistance = distance;
            closestStationID = i;
        }
    }

    actualPositionNearestStation = new google.maps.Marker({
        position:  markersArray[closestStationID].position,
        map:map,
        title: 'La station la plus proche est : '+  markersArray[closestStationID].title,
        stationStatus: markersArray[closestStationID].stationStatus,
        icon: "6_lime_selected.png",
        number: markersArray[closestStationID].number,
        zIndex: 998
    });
    markersCustomArray[1]=actualPositionNearestStation;
    map.setCenter(actualPositionNearestStation.position);
    map.setZoom(15);
    google.maps.event.addListener(actualPositionNearestStation,'click',function (){
        infoWindow.setContent(this.title);
        infoWindow.open(map,this);

        if(actualPositionNearestStation.stationStatus=="")
        {
            var request2=new XMLHttpRequest();
            request2.open("GET", "accessToRessources.php?url=http://www.velib.paris.fr/service/stationdetails/"+this.number, false);
            request2.send();
            if(request2.readyState ==4 && request2.status ==200)
            {
                var leString = request2.responseText;
                leString = ParserStringXml(leString);

                this.stationStatus =
                    "<br/>Vélibs disponibles:"
                        +leString.getElementsByTagName("available")[0].firstChild.nodeValue
                        +"<br/>Total :"
                        +leString.getElementsByTagName("total")[0].firstChild.nodeValue;
            }
            else{
                this.stationStatus = "Nous ne pouvons pas obtenir le nombre de vélibs libres."
            }
        }

        infoWindow.setContent(this.title+this.stationStatus)
    });
}


//renvoi le numero de la station la plus proche de cette position
function FindNearestStation(position){
    var smallestDistance = 1000;
    var closestStationID;

    for (var i = 0;i<markersArray.length;i++)
    {
        var stationLNG = markersArray[i].position.lng();
        var stationLAT= markersArray[i].position.lat();
        if (stationLNG < 0){stationLNG *-1}
        if (stationLAT < 0){stationLAT *-1}
        var distance = Math.sqrt((position.lat()-stationLAT)*(position.lat()-stationLAT)+(position.lng()-stationLNG)*(position.lng()-stationLNG));
        if (distance < smallestDistance)
        {
            smallestDistance = distance;
            closestStationID = i;
        }
    }
    return closestStationID;
}

function AddMarker(element){
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(element.getAttribute('lat'),element.getAttribute('lng')),
        title:PrettyFormat(element.getAttribute('name')),
        map: map,
        stationStatus: "",
        number: element.getAttribute('number'),
        icon:'6_blue_stations.png'
    });
    markersArray.push(marker);


}

function RemoveMarker(markerID){
    markersArray[markerID].setMap(null);
}

//met en forme les noms des stations
function PrettyFormat(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


//transforme une string formaté en XML en un objet XML
function ParserStringXml(string){
    if (window.ActiveXObject){
        var activ=new ActiveXObject('Microsoft.XMLDOM');
        activ.async='false';
        activ.loadXML(string);
    } else {
        var parser=new DOMParser();
        var activ=parser.parseFromString(string,'text/xml');
    }
    return activ;
}
