const weather = document.querySelector(".js-weather")

const COORDS ='coords'
const API_KEY = "87fdfe5735001c637c7f180ea9765659"



function getwether(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(response =>response.json())
    .then(json =>{
        console.log(json)
        const temp = json.main.temp
        const place = json.name
        weather.innerText =`${temp} @ ${place}`
    })
}

function saveCoordsObj(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj))
}


function handleGeoSuccess(position){
    console.log(position)
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const coordsObj ={
        latitude,
        longitude 
    }
    saveCoordsObj(coordsObj)
    getwether(latitude,longitude)

}
function handleGeoError(){
    console.log("can not Exist")
}


function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)
}

function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS)
    if(loadCoords === null){
        askForCoords()
    }else{
       const parseCoord =JSON.parse(loadCoords)
       getwether(parseCoord.latitude,parseCoord.longitude)
    }

}



function init(){
    loadCoords()
}
init()