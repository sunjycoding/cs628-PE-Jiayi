import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
        <h1>Cities Application</h1>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Cities List</Link>
          <Link to="/add-city">Add City</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CitiesList />} />
          <Route path="/add-city" element={<AddCity />} />
          <Route path="/city/:cityId" element={<CityDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

const CitiesList = () => {
  const [cities, setCities] = useState([
    { id: 1, name: "Seattle", country: "USA", population: "733,919" }
  ]);

  return (
    <div>
      <h2>Cities List</h2>
      {cities.map((city) => (
        <div key={city.id}>
          <Link to={`/city/${city.id}`}>{city.name}</Link>
        </div>
      ))}
    </div>
  );
};

const AddCity = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [population, setPopulation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("City Added:", { name, country, population });
    navigate("/"); // Redirect to Cities List
  };

  return (
    <div>
      <h2>Add City</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Country: </label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </div>
        <div>
          <label>Population: </label>
          <input type="text" value={population} onChange={(e) => setPopulation(e.target.value)} required />
        </div>
        <button type="submit">Add City</button>
      </form>
    </div>
  );
};

const CityDetails = () => {
  const { cityId } = useParams();
  const cities = [
    { id: 1, name: "Seattle", country: "USA", population: "733,919" }
  ];
  const city = cities.find((c) => c.id === parseInt(cityId));

  if (!city) return <h2>City Not Found</h2>;

  return (
    <div>
      <h2>{city.name} Details</h2>
      <p>Country: {city.country}</p>
      <p>Population: {city.population}</p>
      <Link to="/">Back to Cities List</Link>
    </div>
  );
};

export default App;
