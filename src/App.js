import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async () => {
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=f64b30cc`;
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.Search) {
      setMovies(responseJson.Search);
      }
  };

  useEffect(() => {
      getMovieRequest(searchValue);
      }, [searchValue]);

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);

  }


  return (
  <div className='container-fluid movie-app'>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading='Movies' />
      <SearchBox searchValue={searchValue} 
      setSearchValue={setSearchValue} />
    </div>
    <div className='row'>
    <MovieList movies={movies}
     handleFavouritesClick={addFavouriteMovie}
      favouriteComponent={AddFavourites} />
  </div>
  <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading='Favourites' />
    </div>
    <div className='row'>
    <MovieList movies={favourites}
     handleFavouritesClick={addFavouriteMovie}
      favouriteComponent={AddFavourites} />
  </div>
</div>
  );
};

export default App;
