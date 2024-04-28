import { useState } from 'react'
import clouds from './assets/clouds.png'
import humidity from './assets/humidity.png'
import rain from'./assets/rain.png'
import rainy from'./assets/rainy.png'
import search from './assets/search (3).png'
import snow from  './assets/snow.png'
import weathe from './assets/weather.png'
import windd from './assets/wind.png'
import './App.css'
const api="5971666a8cea0d8d8c665b177576427f";
const Weather =({picc,temp,city,country,lat,lon,hum,wind})=>
{  

  return(
    <>
    <div className='pict'> 
    <img src={picc} key={picc}></img></div>
    <div className='tempe' >{temp}*C</div>
      <div className='cityy' >{city}</div>
      <div className='countryy'>{country}</div>
      <div className='cord'>
        <div>
        <span className='lati'>Latitude </span>
        <span>{lat}</span>
        </div>
        <div>
        <span className='longi'>Longitude</span>
        <span>{lon}</span>
        </div>
        </div>
        <div  className='texty'>
          <div className='ele'>
          <img src={humidity}></img>
          <div className='data'>
          <div>{hum}%</div>
          <div>Humidity</div>
          </div>
          </div>
          <div className='ele'>
          <img src={windd}></img>
          <div className='data'>
          <div>{wind}km\h</div>
          <div>WindSpeed</div>
          </div>
          </div>
          
        </div>
    </>
  )
   
}
function App() {
  const[txt,setTxt]=useState("")
  const[pic,setPic]=useState(weathe)
  const [temp,setTemp]=useState(0);
  const[city,setCity]=useState("City")
  const[country,setCountry]=useState("Country")
  const [lat,setLat]=useState(0)
  const [lon,setLon]=useState(0)
  const[hum,setHum]=useState(0)
  const[wind,setWind]=useState(0)
  const[load,setLoad]=useState(false)
  const[not,setNot]=useState(false)
  const weatherIconMap ={
    "01d":weathe,
    "01n":weathe,
    "02d":clouds,
    "02n":clouds,
    "03d":rainy,
    "03n":rainy,
    "04d":rainy,
    "04n":rainy,
    "09d":rain,
    "09n":rain,
    "10d":rain,
    "10d":rain,
    "13d":snow,
    "13n":snow,

  };  
  const click = async ()=>
{
  setLoad(true)
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${txt}&appid=${api}&units=Metric`;
  try{
    let res= await fetch(url);
    let dat=await res.json()
    if(dat.cod==="404")
    {
      setNot(true)
      setLoad(false)
      return
    }
    setHum(dat.main.humidity);
    setWind(dat.wind.speed);
    setTemp(Math.floor(dat.main.temp));
    setCity(dat.name);
    setCountry(dat.sys.country);
    setLat(dat.coord.lat);
    setLon(dat.coord.lon);
    const weatherIconCode=dat.weather[0].icon; 
    setPic(weatherIconMap[weatherIconCode]||weathe)
    setNot(false)
  }
  catch(error)
  {

  }
  finally{
    setLoad(false)
  }
}
const change=(e)=>
{
setTxt(e.target.value)
}
const check=(e)=>
{
  if(e.key==="Enter")
  click();
}

  return (
    <>
    <div className='container'>
      <div className='box'>
        <input  className="bo"type="text" placeholder='Enter City' value={txt} onChange={change} onKeyDown={check}></input>
        <img  className="imgsearch" onClick={click} src={search}>
        </img>
      </div>
      <div className='cont'>
        {!load&&!not&&
      <Weather picc={pic} temp={temp} city={city} country={country} lat={lat} lon={lon} hum={hum} wind={wind}/>}
      {not&&<div className='divi'>City Not Found</div>}
      {load && !not &&<div className='wt'>Please Wait Loading...</div>}
      </div>
      
    </div>
    </>
  )
}

export default App
