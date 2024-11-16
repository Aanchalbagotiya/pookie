import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyListScreen.css';

const MyListScreen = ({ myList, markAsWatched, removeFromList }) => {
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`); // Navigate to the movie profile page
  };

  return (
    <div className="my-list-container">
      <h1>My List</h1>
      <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
      
      <div className="list-section">
        <h2>To Watch</h2>
        <ul className="movie-list">
          {myList.toWatch.length > 0 ? (
            myList.toWatch.map((movie) => (
              <li key={movie.id} className="movie-item" onClick={() => handleMovieClick(movie.id)}>
                <span>{movie.title}</span>
                <div className="button-group">
                  <button className="action-button" onClick={() => markAsWatched(movie)}>Mark as Watched</button>
                  <button className="action-button" onClick={() => removeFromList(movie, 'toWatch')}>Remove</button>
                </div>
              </li>
            ))
          ) : (
            <li>No movies in the "To Watch" list.</li>
          )}
        </ul>
      </div>
      
      <div className="list-section">
        <h2>Watched</h2>
        <ul className="movie-list">
          {myList.watched.length > 0 ? (
            myList.watched.map((movie) => (
              <li key={movie.id} className="movie-item" onClick={() => handleMovieClick(movie.id)}>
                <span>{movie.title}</span>
                <div className="button-group">
                  <button className="action-button" onClick={() => removeFromList(movie, 'watched')}>Remove</button>
                </div>
              </li>
            ))
          ) : (
            <li>No movies in the "Watched" list.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MyListScreen;