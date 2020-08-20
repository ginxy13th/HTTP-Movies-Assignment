import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movieList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    history.push(`/update-movie/${params.id}`, movie)
  }

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(response => {
      const removedMovieId = response.data;
      
      const removeMovie = movieList.filter(each => 
         each.id !== removedMovieId
      )
      setMovieList(removeMovie)
      history.push('/')
    })
    .catch(error => console.log('error:', error))
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={handleUpdate}>Edit Movie</button>
      <button onClick={handleDelete}>Remove Movie</button>
    </div>
  );
}

export default Movie;
