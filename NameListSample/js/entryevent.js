var map;
var baseUrl = 'localhost';
var shipUrl = 'http://' + baseUrl + '/amigo/ships.json';
var boatUrl = 'http://' + baseUrl + '/amigo/boats.json';
var fishingNetUrl = 'http://' + baseUrl + '/amigo/FishingNets.json';
var shipObjects = {};
var boatObjects = {};
var marker;
var infowindow;
var decision = 0;
var currentInfoWindow = null;
var ships;
var shipData = [];
var FishingNetLine = {};
var netLine = [];
var color = {"01":"ff0000","02":"00ff00","03":"0000ff","04":"ffff00","05":"ff00ff",
            "06":"00ffff","07":"ff6600","08":"00cc33","09":"00ccff","10":"f0e68c",
            "11":"9966ff","12":"006699","13":"ff3366","14":"009933","15":"0066cc",
            "16":"ffcc00","17":"9900ff","18":"ff99cc","19":"990000","20":"006666",
            "21":"99ffcc","22":"808000","23":"cd853f","24":"c71585"};

function initialize() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: new google.maps.LatLng(34.551246, 135.188034),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl:false,
	scaleControl: true //尺度
  });

  setupAllCheck();
  setupShipObjects();
  setupBoatObjects();
  setupMapObjects();
  setupFishingNetLine();

  setInterval(refreshShipObjects, 60000);
  setInterval(refreshBoatObjects, 60000);
  setInterval(refreshFishingNetLine, 60000);
}

function setupAllCheck() {
  $(function() {
    var $all = $('#ship');
    var $tag = $('<li>');
    $('<input>').attr({
      type : 'checkbox',
      id : 'allcheck',
      checked : false //チェックはずす
    }).appendTo($tag);
    $tag.append('全選択');
    $all.append($tag);
  });
}

function setupShipObjects() {
  ships = getJsonData(shipUrl).ships;
  for (var i in ships) {
    var ship = ships[i].Ship;

    var marker = createShipMarker(ship);
    var infowindow = createShipInfoWindow(ship, marker);
    var polyline = createShipCourse(ship);
    var checkbox = createShipCheckbox(ship);
    
    shipData.push(ship.name, ship.imo, ship.mmsi, ship.callsign);

    shipObjects[ship.mmsi] = {
      marker: marker,
      infowindow: infowindow,
      polyline: polyline,
      checkbox: checkbox
    };
  }
  shipData.sort();
}


function setupMapObjects(){

var image = 'img/annzennsuiiki.PNG';
var image2 ='img/nisihoui.PNG';
/*
var latlng=new google.maps.LatLng(34.561333,135.186833);
var marker = new google.maps.Marker({
                position: latlng, 
                map: map,
                title: '海苔ヒビ 1'
});

var latlng=new google.maps.LatLng(34.55,135.2105);
var marker = new google.maps.Marker({
                position: latlng,
                map: map, 
                title: '海苔ヒビ 2'
});

var latlng=new google.maps.LatLng(34.529,135.195833);
var marker = new google.maps.Marker({
                position: latlng, 
                map: map, 
                title: '海苔ヒビ 3'
});

var latlng=new google.maps.LatLng(34.540333,135.172166);
var marker = new google.maps.Marker({
                position: latlng, 
                map: map,
                title: '海苔ヒビ 4'
});
*/
var flightPlanCoordinates = [
	new google.maps.LatLng(34.561333,135.186833),new google.maps.LatLng(34.55,135.2105),new google.maps.LatLng(34.529,135.195833),new google.maps.LatLng(34.540333,135.172166),new google.maps.LatLng(34.561333,135.186833)	
];

var flightPath=new google.maps.Polyline({
	path: flightPlanCoordinates, //ポリラインの配列
	strokeColor: '#FF0000', //色（#RRGGBB形式）
	strokeOpacity: 1.0, //透明度　0.0～1.0（デフォルト）
	strokeWeight: 2 //太さ（単位ピクセル）
});
flightPath.setMap(map);

var latlng=new google.maps.LatLng(34.60666,135.33833);
var marker = new google.maps.Marker({
                position: latlng, /* マーカーを立てる場所の緯度・経度 */
                map: map, /*マーカーを配置する地図オブジェクト */
                //title: '大阪灯標（整流ブイ）',
icon:image
});
var info=new google.maps.InfoWindow({content:'大阪灯標（整流ブイ）</br>34-36.4N　</br>135-20.3E </br>安全水域標識'});
google.maps.event.addListener(marker,'mouseover',function(){
info.open(map,marker)
});
google.maps.event.addListener(marker,'mouseout',function(){
info.close()
});

var latlng=new google.maps.LatLng(34.5905,135.186666);
var marker1 = new google.maps.Marker({
                position: latlng, /* マーカーを立てる場所の緯度・経度 */
                map: map, /*マーカーを配置する地図オブジェクト */
                //title: '神戸沖第一灯浮標',
icon:image
});
var info1=new google.maps.InfoWindow({content:'神戸沖第一灯浮標</br>34-35.43N　</br>135-11.20E </br>安全水域標識'});
google.maps.event.addListener(marker1,'mouseover',function(){
info1.open(map,marker1)
});
google.maps.event.addListener(marker1,'mouseout',function(){
info1.close()
});

var latlng=new google.maps.LatLng(34.594166,135.238833);
var marker2 = new google.maps.Marker({
                position: latlng, /* マーカーを立てる場所の緯度・経度 */
                map: map, /*マーカーを配置する地図オブジェクト */
                //title: '神戸沖第二灯浮標',
icon:image
});
var info2=new google.maps.InfoWindow({content:'神戸沖第二灯浮標</br>34-35.65N　</br>135-14.33E </br>安全水域標識'});
google.maps.event.addListener(marker2,'mouseover',function(){
info2.open(map,marker2)
});
google.maps.event.addListener(marker2,'mouseout',function(){
info2.close()
});

var latlng=new google.maps.LatLng(34.6295,135.3115);
var marker3 = new google.maps.Marker({
                position: latlng, /* マーカーを立てる場所の緯度・経度 */
                map: map, /*マーカーを配置する地図オブジェクト */
                //title: '神戸六甲アイランド東水路中央第一号灯浮標',
icon:image
});
var info3=new google.maps.InfoWindow({content:'神戸六甲アイランド東水路中央第一号灯浮標</br>34-37.77N　</br>135-18.69E </br>安全水域標識'});
google.maps.event.addListener(marker3,'mouseover',function(){
info3.open(map,marker3)
});
google.maps.event.addListener(marker3,'mouseout',function(){
info3.close()
});

var latlng=new google.maps.LatLng(34.558333,135.333333);
var marker4 = new google.maps.Marker({
                position: latlng, /* マーカーを立てる場所の緯度・経度 */
                map: map, /*マーカーを配置する地図オブジェクト */
                //title: '浜寺航路第一号灯浮標',
icon:image2
});
var info4=new google.maps.InfoWindow({content:'浜寺航路第一号灯浮標</br>34-33.5N　</br>135-20.1E </br>西方位標識'});
google.maps.event.addListener(marker4,'mouseover',function(){
info4.open(map,marker4)
});
google.maps.event.addListener(marker4,'mouseout',function(){
info4.close()
});

var latlng=new google.maps.LatLng(34.583,135.082);
var marker5 = new google.maps.Marker({
                position: latlng, /* マーカーを立てる場所の緯度・経度 */
                map: map, /*マーカーを配置する地図オブジェクト */
                //title: '明石海峡航路東方灯浮標',
icon:image
});
var info5=new google.maps.InfoWindow({content:'明石海峡航路東方灯浮標</br>34-34.98N　</br>135-04.92E </br>安全水域標識'});
google.maps.event.addListener(marker5,'mouseover',function(){
info5.open(map,marker5)
});
google.maps.event.addListener(marker5,'mouseout',function(){
info5.close()
});
}



function refreshShipObjects() {
  ships = getJsonData(shipUrl).ships;
  var mmsis = [];
  shipData = [];

  for (var i in ships) {
    var ship = ships[i].Ship;
    var shipObject = shipObjects[ship.mmsi];

    mmsis.push(ship.mmsi);
    shipData.push(ship.name, ship.imo, ship.mmsi, ship.callsign);

    if (shipObject !== undefined) {
      shipObject.marker.setPosition(new google.maps.LatLng(ship.latlng[0], ship.latlng[1]));
      shipObject.marker.setIcon(createShipIcon(ship));
      shipObject.infowindow.setContent(
        'MMSI: ' + ship.mmsi + '<br>' +
        'IMO番号: ' + ship.imo + '<br>' +
        '船名: ' + ship.name + '<br>' +
        'コールサイン: ' + ship.callsign + '<br>' +
        '緯度: ' + ship.latitude + '<br>' +
        '経度: ' + ship.longtude + '<br>' +
        '対地速力: ' + ship.speed + '<br>' +
        '対地針路: ' + ship.course + '<br>' +
        '受信時刻: ' + ship.timestamp
      );
      shipObject.infowindow.setPosition(new google.maps.LatLng(ship.latlng[0], ship.latlng[1]));
      var path = [];
      var distance = ship.speed * 31.0 * 10.0;
      var course = ship.course > 90 ? 360 - (ship.course - 90) : 90 - ship.course;
      path.push(new google.maps.LatLng(ship.latlng[0], ship.latlng[1]));
      path.push(new google.maps.LatLng(
        ship.latlng[0] + (distance * Math.sin(course * (Math.PI / 180)) / 111000),
        ship.latlng[1] + (distance * Math.cos(course * (Math.PI / 180)) / 90000)
      ));
      shipObject.polyline.setPath(path);
    } else {
      var marker = createShipMarker(ship);
      var infowindow = createShipInfoWindow(ship, marker);
      var polyline = createShipCourse(ship);
      var checkbox = createShipCheckbox(ship);

      shipObjects[ship.mmsi] = {
        marker: marker,
        infowindow: infowindow,
        polyline: polyline,
        checkbox: checkbox
      };
    }
  }
  shipData.sort();

  for (var key in shipObjects) {
    if (mmsis.indexOf(key) < 0) {
      var shipObject = shipObjects[key];
      shipObject.marker.setMap(null);
      shipObject.infowindow.setMap(null);
      shipObject.polyline.setMap(null);


      //var element = document.getElementById(key);
      //var parent = element.parentNode;
      //parent.removeChild(parent);

      for (var i in shipObject.checkbox) {
        shipObject.checkbox[i].parentNode.removeChild(shipObject.checkbox[i]);
      }
    }
  }
}

function setupFishingNetLine(){

  var fishingNets = getJsonData(fishingNetUrl).FishingNets;
  
  for (var i in fishingNets){

    var FishingNet = fishingNets[i].FishingNet;
    var today = new Date();
    var timestamp = new Date(FishingNet.timestamp);

  if(FishingNet&&(today.getTime() - timestamp.getTime() <= 3 * 60 * 1000)){
      for (var i in FishingNet.latlngs) {
        netLine.push(new google.maps.LatLng(FishingNet.latlngs[i][0], FishingNet.latlngs[i][1]));
      }
      FishingNetLine[FishingNet.id] = new google.maps.Polyline({
        Path: netLine,
        map: map,
        Visible: true,
        strokeColor: color[FishingNet.id],
        strokeOpacity: 1,
        strokeWeight: 1
      });
      netLine = [];
    }
  }
}

function refreshFishingNetLine(){
  var fishingNets = getJsonData(fishingNetUrl).FishingNets;
  
  for (var i in fishingNets){
    var FishingNet = fishingNets[i].FishingNet;
    var today = new Date();
    var timestamp = new Date(FishingNet.timestamp);

    if((FishingNet)&&(today.getTime() - timestamp.getTime() <= 3 * 60 * 1000)){
        
      for (var i in FishingNet.latlngs) {
        netLine.push(new google.maps.LatLng(FishingNet.latlngs[i][0], FishingNet.latlngs[i][1]));
      }
      FishingNetLine[FishingNet.id].setPath(netLine);
      netLine = [];
    }else{
      FishingNetLine[FishingNet.id].setVisible(false);
    }
  }
}

function setupBoatObjects() {
  var boats = getJsonData(boatUrl).boats;
  
  for (var i in boats) {
    var boat = boats[i].Boat;
    if (boat){
      var marker = createBoatMarker(boat);
      var infowindow = createBoatInfoWindow(boat, marker);
      var polyline = createBoatPolyline(boat);
      var course = createBoatCourse(boat);
    
      boatObjects[boat.id] = {
        marker: marker,
        infowindow: infowindow,
        polyline: polyline,
        course: course
      };
    }
  }
}

function refreshBoatObjects() {
  var boats = getJsonData(boatUrl).boats;
  var boatObject;
  for (var i = 0; i < boats.length; i++) {
    var boat = boats[i].Boat;
    boatObject = boatObjects[boat.id];
    
    if (boatObject !== undefined) {
      boatObject.marker.setPosition(new google.maps.LatLng(boat.latlngs[boat.latlngs.length - 1][0], boat.latlngs[boat.latlngs.length - 1][1]));
      boatObject.marker.setIcon(createBoatIcon(boat));
      boatObject.infowindow.setContent(
        '対地針路: ' + boat.course + '<br>' +
        '緯度: ' + boat.latitude + '<br>' +
        '経度: ' + boat.longitude + '<br>' +
        '対地速力: ' + boat.speed + '<br>' +
        '受信時刻: ' + boat.timestamp 
      );
      var wake = [];
      var distance = boat.speed * 31.0 * 10.0;
      var course = boat.course > 90 ? 360 - (boat.course - 90) : 90 - boat.course;
      wake.push(new google.maps.LatLng(boat.latlngs[boat.latlngs.length -1][0], boat.latlngs[boat.latlngs.length -1][1]));
      wake.push(new google.maps.LatLng(
        boat.latlngs[boat.latlngs.length -1][0] + (distance * Math.sin(course * (Math.PI / 180)) / 111000),
        boat.latlngs[boat.latlngs.length -1][1] + (distance * Math.cos(course * (Math.PI / 180)) / 90000)
      ));
      boatObject.course.setPath(wake);
      
      var path = [];
      for (var j in boat.latlngs) {
        path.push(new google.maps.LatLng(boat.latlngs[j][0], boat.latlngs[j][1]));
      }
      boatObject.polyline.setPath(path);
    } else {
      var marker = createBoatMarker(boat);
      var infowindow = createBoatInfoWindow(boat, marker);
      var polyline = createBoatPolyline(boat);
      var course = createBoatCourse(boat);
      
      boatObjects[boat.id] = {
        marker: marker,
        infowindow: infowindow,
        polyline: polyline,
        course: course
      };
    }
  }
}

$(function () {
  $('#submitbutton').click(function() {
      decision = 0;
      for (var i in ships) {
        var ship = ships[i].Ship;
        searchShip(ship,$('#tags').val());
      }
  });
  function searchShip(ship,val) {
    if(((val === ship.name)||(val === ship.mmsi)||(val === ship.imo)||(val === ship.callsign))&&(val !== "")){
      if (currentInfoWindow) {
        currentInfoWindow.infowindow.close();
        currentInfoWindow = null;
      }
      if ($('#'+ship.mmsi).prop('checked') === false) {
        $('#'+ship.mmsi).prop('checked', true);
        shipObjects[ship.mmsi].marker.setVisible(true);
        shipObjects[ship.mmsi].polyline.setVisible(true);
      }
      decision = 1;
      $(".result").text("結果:"+ship.name);
      map.setCenter(new google.maps.LatLng(ship.latlng[0], ship.latlng[1]));
      shipObjects[ship.mmsi].infowindow.open(map);
      currentInfoWindow = shipObjects[ship.mmsi];
    } else if(decision === 0){
      if (currentInfoWindow) {
	currentInfoWindow.infowindow.close();
        currentInfoWindow = null;
      }
      $(".result").text("結果:一致する船舶がありませんでした");
    }
  }
});

function startSuggest() {
    $( "#tags" ).autocomplete({
      source: function( request, response ) {
            var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
            response( $.grep(shipData , function( item ){
                return matcher.test( item );
            }) );
      }
  });
}


function createShipCourse(ship) {
  var polyline;
  var distance;
  var course;
  var path = [];

  distance = ship.speed * 31.0 * 10.0;
  course = ship.course > 90 ? 360 - (ship.course - 90) : 90 - ship.course;

  path.push(new google.maps.LatLng(ship.latlng[0], ship.latlng[1]));
  path.push(new google.maps.LatLng(
    ship.latlng[0] + (distance * Math.sin(course * (Math.PI / 180)) / 111000),
    ship.latlng[1] + (distance * Math.cos(course * (Math.PI / 180)) / 90000)
  ));

  polyline = new google.maps.Polyline({
    path: path,
    map: map,
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 0.3,
	visible: false //非表示
  });

  return polyline;
}

function createBoatCourse(boat) {
  var polyline;
  var distance;
  var course;
  var path = [];

  distance = boat.speed * 31.0 * 10.0;
  course = boat.course > 90 ? 360 - (boat.course - 90) : 90 - boat.course;
  
  path.push(new google.maps.LatLng(boat.latlngs[boat.latlngs.length -1][0], boat.latlngs[boat.latlngs.length -1][1]));
  path.push(new google.maps.LatLng(
    boat.latlngs[boat.latlngs.length -1][0] + (distance * Math.sin(course * (Math.PI / 180)) / 111000),
    boat.latlngs[boat.latlngs.length -1][1] + (distance * Math.cos(course * (Math.PI / 180)) / 90000)
  ));
  
  polyline = new google.maps.Polyline({
    path: path,
    map: map,
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 0.3
  });

  return polyline;
}

function createShipCheckbox(ship){
  $(function() {
    var $ul = $('#ship');
    var $checkbox = $('<li>').attr({
      id: ship.name
    });
    $('<input>').attr({
      type : 'checkbox',
      id : ship.mmsi,
      checked : false //チェックはずす
    }).appendTo($checkbox);
    $checkbox.append(ship.name);
    $ul.append($checkbox);
    var $li = $ul.children('li');
    $li.sort(function(a, b) {
      return (a.id > b.id) ? 1 : -1;
    });
    $.each($li, function(idx, item) { $ul.append(item); });
  });

  $('#allcheck').on('change',function (){
    $('#ship input[type=checkbox]').prop('checked',this.checked);
    if ($('input[type=checkbox]').prop('checked')) {
      shipObjects[ship.mmsi].marker.setVisible(true);
      shipObjects[ship.mmsi].polyline.setVisible(true);
    } else {
      shipObjects[ship.mmsi].marker.setVisible(false);
      shipObjects[ship.mmsi].polyline.setVisible(false);
    }
  });
  
  $('#'+ship.mmsi).click(function() {
    if ($('#'+ship.mmsi).prop('checked')) {
    $('#ship li').prop('checked', false);
      shipObjects[ship.mmsi].marker.setVisible(true);
      shipObjects[ship.mmsi].polyline.setVisible(true);
    } else {
      $('#ship li').prop('checked', true);
      shipObjects[ship.mmsi].marker.setVisible(false);
      shipObjects[ship.mmsi].polyline.setVisible(false);
    }
  });
}

function createShipMarker(ship) {
  var icon;

  icon = createShipIcon(ship);

  marker = new MarkerWithLabel({
    position: new google.maps.LatLng(ship.latlng[0], ship.latlng[1]),
    map: map,
    icon: icon,
	visible: false, //非表示
    labelContent: ship.name,
    labelAnchor: new google.maps.Point(30, -8),
    labelClass: 'labels',
    labelVisible: false
  });

  google.maps.event.addListener(marker, 'click', function(marker) {
    return function() {
      marker.set('labelVisible', !marker.get('labelVisible'));
    }
  }(marker));

  return marker;
}

function createShipInfoWindow(ship, marker) {

  var contentString = 
    'MMSI: ' + ship.mmsi + '<br>' +
    'IMO番号: ' + ship.imo + '<br>' +
    '船名: ' + ship.name + '<br>' +
    'コールサイン: ' + ship.callsign + '<br>' +
    '緯度: ' + ship.latitude + '<br>' +
    '経度: ' + ship.longtude + '<br>' +
    '対地速力: ' + ship.speed + '<br>' +
    '対地針路: ' + ship.course + '<br>' +
    '受信時刻: ' + ship.timestamp;


  infowindow = new google.maps.InfoWindow({
    content: contentString,
    position: new google.maps.LatLng(ship.latlng[0], ship.latlng[1])
  });

  google.maps.event.addListener(marker, 'mouseover', function(marker, infowindow) {
    return function() {
      infowindow.open(map, marker);
    };
  }(marker, infowindow));

  google.maps.event.addListener(marker, 'mouseout', function(marker, infowindow) {
    return function() {
      infowindow.close();
    };
  }(marker, infowindow));

  return infowindow;
}

function createBoatMarker(boat) {
  var marker;
  var icon;

  icon = createBoatIcon(boat);

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(
      boat.latlngs[boat.latlngs.length -1][0],
      boat.latlngs[boat.latlngs.length - 1][1]
    ),
    map: map,
    icon: icon
  });

  return marker;
}

function createBoatInfoWindow(boat, marker) {
  var infowindow;

  var contentString =
    '対地針路: ' + boat.course + '<br>' +
    '緯度: ' + boat.latitude + '<br>' +
    '経度: ' + boat.longitude + '<br>' +
    '対地速力: ' + boat.speed + '<br>' +
    '受信時刻: ' + boat.timestamp;

  infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  google.maps.event.addListener(marker, 'mouseover', function(marker, infowindow) {
    return function() {
      infowindow.open(map, marker);
    };
  }(marker, infowindow));

  google.maps.event.addListener(marker, 'mouseout', function(marker, infowindow) {
    return function() {
      infowindow.close();
    };
  }(marker, infowindow));

  return infowindow;
}

function createBoatPolyline(boat) {
  var polyline;
  var path = [];

  for (var i in boat.latlngs) {
    path.push(new google.maps.LatLng(boat.latlngs[i][0], boat.latlngs[i][1]));
  }

  polyline = new google.maps.Polyline({
    path: path,
    map: map,
    Visible: true,
    strokeColor: '#0000ff',
    strokeOpacity: 0.3,
    strokeWeight: 0.3
  });

  $(function(){ //セレクトボックスでの透明度の変更
    $('.ChangeSelect').bind('change',function() {
      if($('.ChangeSelect').val() === '1'){
        polyline.setVisible(true);
        polyline.set('strokeOpacity',0.3);
      }else if($('.ChangeSelect').val() === '2'){
        polyline.setVisible(true);
        polyline.set('strokeOpacity',0.6);
      }else if($('.ChangeSelect').val() === '3'){
        polyline.setVisible(true);
        polyline.set('strokeOpacity',0.9);
      }else if($('.ChangeSelect').val() === '4'){
        polyline.setVisible(false);
      }
    });
  });

  return polyline;
}




function createShipIcon(ship) {
  var path;
  var icon;

  if (ship.speed >= 1.0) {
    path = 'img/ship/ship-' + ('00' + ship.course).slice(-3) + '-icon.svg';
  } else {
    path = 'img/ship/ship-stop-icon-10.svg';
  }

  icon = new google.maps.MarkerImage(
    path,
    new google.maps.Size(20, 20),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 10)
  );

  return icon;
}

function createBoatIcon(boat) {
  var timestamp;
  var today;
  var path;
  var icon;

  today = new Date();
  timestamp = new Date(boat.timestamp);

  // 30 min * 60 sec * 1000 msec
  if (today.getTime() - timestamp.getTime() >= 30 * 60 * 1000) {
    path = 'img/boat/boat-outdate-icon.svg';
  } else if (boat.speed >= 2.0) {
    path = 'img/boat/b' + boat.id + '.svg';
  } else {
    path = 'img//boat/boat-stop-icon-b.svg';
  }

  icon = new google.maps.MarkerImage(
    path,
    new google.maps.Size(20, 20),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 10)
  );
  
  return icon;
}

function getJsonData(url){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.setRequestHeader('Pragma', 'no-cache');
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT'); 
  xhr.send();
  return JSON.parse(xhr.responseText);
}

google.maps.event.addDomListener(window, 'load', initialize);
