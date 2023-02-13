import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [singleCountry, setSingleCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [singleCity, setSingleCity] = useState('');
  const [showMsg, setShowMsg] = useState(false);

  const fetchCountries = async () => {
    try {
      const country = await axios.get(
        'https://countriesnow.space/api/v0.1/countries'
      );
      setCountries(country.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCities = (country) => {
    setShowMsg(false);
    setSingleCountry(null);
    setSingleCountry(country);
    const cities = countries.find((c) => c.country === country);
    setCities(cities.cities);
  };

  const submitHandle = () => {
    if (singleCountry && singleCity) {
      setShowMsg(true);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);
  return (
    <div>
      <h1>Hometown</h1>
      <div>
        {countries && (
          <select
            onChange={(e) => fetchCities(e.target.value)}
            value={singleCountry}
            placeholder={'Select'}
          >
            {countries.map((c) => {
              return (
                <option key={uuidv4()} value={c.country}>
                  {c.country}
                </option>
              );
            })}
          </select>
        )}
      </div>

      {cities && (
        <div>
          <select
            onChange={(e) => {
              setSingleCity(e.target.value);
            }}
          >
            <option disabled selected hidden>
              Select City
            </option>
            {cities.map((city) => {
              return <option key={uuidv4()}>{city}</option>;
            })}
          </select>
        </div>
      )}

      <button onClick={submitHandle}>Go </button>

      {showMsg && (
        <div>
          Your Country is : {singleCountry} and Your Country is : {singleCity}
        </div>
      )}
    </div>
  );
}
