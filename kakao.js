// const roadviewContainer = document.getElementById("map");
// const roadview = new kakao.maps.Roadview(roadviewContainer);
// const roadviewClient = new kakao.maps.RoadviewClient();


// const position = new kakao.maps.LatLng(37.5642029018226,126.98226365941522);

// roadviewClient.getNearestPanoId(position, 50, function(panoId){
// 	roadview.setPanoId(panoId, position);
// });


// 검색했을때 위치 출력 
const infowindow = new kakao.maps.InfoWindow({zIndex:1});

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

let map = new kakao.maps.Map(mapContainer, mapOption);

let ps = new kakao.maps.services.Places(); 	

ps.keywordSearch("대전그린컴퓨터아트학원",placeesSearchCB);

function placeesSearchCB (data, status, pagination){
	if (status === kakao.maps.services.Status.OK){

		let bounds = new kakao.maps.LatLngBounds();

		for(let i = 0; i < data.length; i++ ){
			displayMaker(data[i]);
			bounds.extend(new kakao.maps.LatLng(data[i].y,data[i].x));
		}
		map.setBounds(bounds)
	}
}
//마커 표시
function displayMaker(place){

	let maker = new kakao.maps.Marker({
		map : map,
		position : new kakao.maps.LatLng(place.y,place.x)
	});

	kakao.maps.event.addListener(maker,'click', function(){
		infowindow.setContent('<div style="padding:5px; font-size:12px;">'+place.place_name + '</div>');
		infowindow.open(map,maker);
	})
}


const maker  = new kakao.maps.Marker({

	position : map.getCenter()
});

maker.setMap(map);


kakao.maps.event.addListener(map,'click',function(mouseEvent){

	let latlng = mouseEvent.latLng; 

	maker.setPosition(latlng);

	let message = "클릭한 위치의 위도는 " + latlng.getLat() + "이고, " + '경도는' + latlng.getLng() + " 입니다.";
			
	console.log(message)

	let resultDiv = document.getElementById("clickLatlng");
	resultDiv.innerHTML	= message
});