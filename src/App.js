import './App.css';
import {useState} from "react"; 
import weather_api from './API_KEY';




function App() {

  const [Location,setLocation] = useState('japan');
  const [Data,setData] = useState('japan');

  /*************** WHEN TRYING TO RUN *******************/
  //Replace weather_api and enter your own api key after logging to https://home.openweathermap.org/api_keys
  const api_key = weather_api;

    function getData(e){
      e.preventDefault();
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Location}&appid=${api_key}`)
        .then(res => res.json())
        .then(json => setData(json));
  
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
          <button type='submit'>Submit</button>
      </form>
      
      <div className='WeatherData'>
        <Listdata data={Data}/>
      </div>
    </body>
    
  );
}
function Listdata(props){
  const data = props.data.cod;

  
  //if blank
  if(data === 400){
    return ('');
  }
  else if(data === 404){
    return (
      'Invalid location'
    );
  }
  else{
    return(
    <div className='Weather'>
      <div className='Weather header'>
        <div className='header location'>{props.data.name}</div>  
        <div className='header picture'>Picture</div>
      </div>
      <div className='WeatherDescription'>
        <div className='Temperature'>
          <h1> {props.data.weather[0].main}</h1>
          </div>
        <div className='TemperatureDescription'>
          <h3>{props.data.weather[0].description}</h3>
        </div>
        <div className='TemperatureDegree'>
          {(props.data.main.temp -273.15).toFixed(2)} °C
        </div>

      </div>

    </div>
    );
  }
}



export default App;
