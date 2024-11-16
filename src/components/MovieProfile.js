// MovieProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieProfile() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.rapidmock.com/api/vikuman/v1/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movie-profile">
      <h1>{movie.title}</h1>
      <img src={movie.imageUrl} alt={movie.title} className="movie-image" />
      <p>Genre: {movie.genre}</p>
      <p>Release Date: {movie.releaseDate}</p>
      <p>Rating: {movie.rating}</p>
      <p>Description: {movie.description}</p>
    </div>
  );
}

export default MovieProfile;