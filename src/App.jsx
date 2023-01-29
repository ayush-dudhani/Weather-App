import './App.css';
import { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./Assets/weather.png";
function App() {
  const [data, setData] = useState({})
  const [inputCity, setInputCity] = useState("");
  const getWeatherDetails = (cityName) =>{
    if(!cityName) return;
    console.log(process.env);
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName +"&APPID="+process.env.REACT_APP_API;
    axios.get(apiURL).then((res)=>{
      console.log("response", res.data);
      setData(res.data);
      }).catch((err) =>{
        if(err.code === 400){
          setInputCity("");
          setData("");
          alert("Sorry!, City Not Found in Database");
        }
        console.log("error", err);
      })
    };

    const handleChangeInput = (e) =>{
      setInputCity(e.target.value);
    }

    const handleSearch = () =>{
      getWeatherDetails(inputCity);
    }
   
  return (<>
    <div className="col-md-12">
      <div className="weatherBg">
          <h1 className="heading">Weather App</h1>
          <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control" value={inputCity} onChange={handleChangeInput}/>
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
          </div>
      </div>
    </div>
    {Object.keys(data).length > 0 &&
    <div className="col-md-12 text-center mt-5">
        <div className="shadow rounded weatherResultBox">
           <img className="weatherIcon" src={logo} alt="weatherlogo"/>
           <h5 className="weatherCity">{data?.name}</h5>
           <h6 className="weatherTemp">{((data?.main?.temp)-273.15).toFixed(2)}<sup>o</sup>C</h6>
        </div>
    </div>
    }
    </>
  );
}

export default App;
