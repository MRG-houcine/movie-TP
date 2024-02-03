import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DetailsPage from './showInfo/showInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [searchData, setSearchData] = useState({
    search: '',
    year: '',
    type: '',
  });

  const [inputSearch, setInputSearch] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleChange = (e) => {
    setSearchData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageClick = (id) => {
    setSelectedMovieId(id);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=4d94a812&s=${searchData.search}&y=${searchData.year}&type=${searchData.type}`);
      const data = await response.json();
      setInputSearch(data.Search || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (selectedMovieId) {
      fetchData();
    }
  }, [selectedMovieId]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={(
            <div className="container mt-3">
              <form className="row">
                <div className="col-3 form-group">
                  <input
                    className="form-control"
                    name="search"
                    value={searchData.search}
                    onChange={handleChange}
                    placeholder="Search..."
                  />
                </div>
                <div className="col-3 form-group">
                  <input
                    className="form-control"
                    name="year"
                    value={searchData.year}
                    onChange={handleChange}
                    placeholder="Year"
                  />
                </div>
                <div className="col-3 form-group">
                  <select
                    className="form-control"
                    name="type"
                    onChange={handleChange}
                  >
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                    <option value="episode">Episode</option>
                  </select>
                </div>
                <div className="col-3">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={fetchData}
                  >
                    Search
                  </button>
                </div>
              </form>
                <div className='divCard m-4'>
                  
              {inputSearch && inputSearch.map((item) => (
                <div key={item.imdbID} className="card mt-3">
                  <div className="card-body">
                    <h5 className="card-title">{item.Title}</h5>
                    <p className="card-text">{item.Year}</p>
                    <Link
                      to="/details"
                      state={{ selectedMovieId: item.imdbID }}
                    >
                      <img
                        src={item.Poster}
                        alt={item.Title}
                        className="img-fluid"
                        
                      />
                      <button onClick={() => handleImageClick(item.imdbID)}>details</button>
                    </Link>
                    <p className="card-text">{item.Type}</p>
                  </div>
                </div>
              ))}
                </div>
            </div>
          )}
        />
        <Route
          path="/details"
          element={
          <DetailsPage selectedMovieId={selectedMovieId} />
        }
        />
      </Routes>
    </Router>
  );
};

export default App;