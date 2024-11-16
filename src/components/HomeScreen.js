import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomeScreen.css'; // Importing CSS file for HomeScreen styles

function HomeScreen({ addToWatchList, markAsWatched }) {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.rapidmock.com/api/vikuman/v1/movies/all');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter(movie => {
    if (filterType === 'all') return true;
    return movie.type.toLowerCase() === filterType;
  });

  const sortedMovies = filteredMovies.sort((a, b) => {
    return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-screen">
      <h1>Movie and Show Tracker</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="controls">
        <button onClick={handleSortChange} className="sort-button">
          Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
        </button>
        <button onClick={() => handleFilterChange('all')} className="filter-button">All</button>
        <button onClick={() => handleFilterChange('movie')} className="filter-button">Movies</button>
        <button onClick={() => handleFilterChange('show')} className="filter-button">Shows</button>
        <Link to="/my-list" className="my-list-link">Go to My List</Link>
      </div>

      <div className="movies-container">
        <h2>All Movies and Shows</h2>
        <div className="movies-list">
          {sortedMovies
            .filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(movie => (
              <div key={movie.id} className="movie-card">
                <img src={movie.imageUrl} alt={movie.title} className="movie-image" />
                <div className="movie-info">
                  <Link to={`/movie/${movie.id}`} className="movie-title">{movie.title}</Link> {/* Link to movie details */}
                  <div className="button-group">
                    <button onClick={() => addToWatchList(movie)} className="action-button">Add to Watch</button>
                    <button onClick={() => markAsWatched(movie)} className="action-button">Marked as Watched</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;