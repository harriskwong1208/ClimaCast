import logo from './logo.svg';
import './App.css';
import {useState} from "react"; 

function App() {

  const [Location,setLocation] = useState('tokyo');
  const [data,setData] = useState('tokyo');

    function getData(e){
      e.preventDefault();
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Location}&appid=b846899c971836d60ba5246751690a5a`)
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
        {data.cod == 200 ? 
        (<pre>{ JSON.stringify(data,null,2)}</pre>) :
        (<div>Invalid input</div>)}
      </div>
    </nav>
    
  );
}




export default App;
