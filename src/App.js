import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import MyListScreen from './components/MyListScreen';
import MovieDetails from './components/MovieDetailsScreen'; // Import the MovieDetails component

function App() {
  const [myList, setMyList] = useState({
    toWatch: [],
    watched: [],
  });

  const addToWatchList = (movie) => {
    setMyList((prevList) => ({
      ...prevList,
      toWatch: [...prevList.toWatch, movie],
    }));
  };

  const markAsWatched = (movie) => {
    setMyList((prevList) => ({
      ...prevList,
      watched: [...prevList.watched, movie],
      toWatch: prevList.toWatch.filter(item => item.id !== movie.id),
    }));
  };

  const removeFromList = (movie, listType) => {
    setMyList((prevList) => ({
      ...prevList,
      [listType]: prevList[listType].filter(item => item.id !== movie.id),
    }));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen addToWatchList={addToWatchList} markAsWatched={markAsWatched} />} />
        <Route path="/my-list" element={<MyListScreen myList={myList} markAsWatched={markAsWatched} removeFromList={removeFromList} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;