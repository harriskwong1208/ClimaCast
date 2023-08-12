import logo from './logo.svg';
import './App.css';
import {useState} from "react"; 
import weather_api from './API_KEY';
function App() {

  const [Location,setLocation] = useState('tokyo');
  const [Data,setData] = useState('tokyo');

  /*           WHEN TRYING TO RUN            */
  //Replace weather_api and enter your own api key after logging to https://home.openweathermap.org/api_keys
  const api_key = weather_api;

    function getData(e){
      e.preventDefault();
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Location}&appid=${api_key}`)
        .then(res => res.json())
        .then(json => setData(json));
  
    }


  return (
    
    <nav>
      <div>
        <h1 className="header">ClimaCast</h1>
      </div>
      <div>
        <form onSubmit={getData}>
          <label >
            <h2>Enter Location to see forcast</h2>
          </label>
          <input 
          onChange={(e) => setLocation(e.target.value)}
          className='location' type='text' placeholder='Tokyo'/>
          <button type='submit'>Submit</button>
        </form>
      </div>
      <div>
        <Listdata data={Data}/>
      </div>
    </nav>
    
  );
}
function Listdata(props){
  const data = props.data.cod;
  //if blank
  if(data == 400){
    return ('');
  }
  else if(data == 404){
    return (
      'Invalid location'
    );
  }
  else{
    return (
      <pre>{ JSON.stringify(props.data,null,2)}</pre>

    );
  }
}



export default App;
