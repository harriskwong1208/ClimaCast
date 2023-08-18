import './App.css';
import {useState,useEffect} from "react"; 
import weather_api from './API_KEY';


function App() {
 
  
  const [Location,setLocation] = useState('');
  const [Data,setData] = useState({});
  
  


  /*************** WHEN TRYING TO RUN *******************/
  //Replace weather_api and enter your own api key after logging to https://home.openweathermap.org/api_keys
  const api_key = weather_api;

    function getData(e){


      //https://api.openweathermap.org/data/2.5/forecast?q=liverpool&appid=b846899c971836d60ba5246751690a5a
      e.preventDefault();
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Location}&appid=${api_key}`)
        .then(res => res.json())
        .then(json => setData(json))
        .catch((e)=> console.log(e));
    }


  return (
  
    <body>
      <nav>
        <h2 className="header">ClimaCast</h2>
      </nav>
      <article>
        ClimaCast allows users to input their desired 
        location to get current weather, temperature, 
        and weather forecast. 
      </article>
    
      <form onSubmit={getData}>
          <label >
            <h2>Enter Location to see forcast</h2>
          </label>
          <input 
          onChange={(e) => setLocation(e.target.value)}
          className='location' type='text' placeholder='Enter location here'/>
          <button className='submitbtn' type='submit'>Submit</button>
 
      </form>
      
      <div  className='WeatherData'>
        <Listdata data={Data} />
      </div>
    </body>
    
  );
}
function Listdata(props){
  var data = props.data.cod;

  function get_icon(icon){
    var url = `http://openweathermap.org/img/wn/${icon}.png`;
  
    return(
      <img className='WeatherIcon' src={url}></img>
    );
  }
 
  //if blank
  if(data == 400){
    return (``);
  }
  else if(data == 404){
    return (
      <h1 className='WeatherInvalidLocation'>Invalid Location</h1>
    );
  }
  else{
    return (
      <body className='RenderWeather'>
        <div className='Weather'>
        <div className='Weather header'>
          <div className='header picture'>
            { Object.keys(props.data).length === 0 ? '' : 
            get_icon(props.data.weather[0]?.icon)}
          </div>
        </div>
        <div className='WeatherDescription'>
          <div className='Temperature'>
            <h1>
              { Object.keys(props.data).length === 0 ? '' : props.data.weather[0]?.main}
            </h1>  
            </div>
          <div className='TemperatureDescription'>
            <h1>{Object.keys(props.data).length === 0 ? '' :
            props.data.weather[0]?.description}
            </h1>
          </div>
          <div className='TemperatureDegree'>
            <h1>{Object.keys(props.data).length === 0 ? '' : 
            `${(props.data.main.temp -273.15).toFixed(2)} °C`}
            </h1> 
          </div>
        </div>
      </div>
      </body>
    );
  }
}



export default App;
