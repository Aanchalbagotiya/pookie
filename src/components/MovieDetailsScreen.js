import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Movie Title</h1>
      <p>This is a detailed description of the movie. Here you can add some dummy text or any relevant information about the movie.</p>
      <p>Additional information such as cast, crew, release date, and other details can be included here.</p>
      <button onClick={() => navigate(-1)}>Back</button> {/* Back button to navigate to the previous page */}
    </div>
  );
};

export default MovieDetails;