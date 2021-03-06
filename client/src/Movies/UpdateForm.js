import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const UpdateForm = (props) => {
    const { id } = useParams();
    const history = useHistory();
    const [movie, setMovie] = useState(initialMovie);
  

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setMovie(res.data);
        })
        .catch(error => {
            console.error(error)
        })
    }, [id])

    const handleChange = (e) => {
        e.persist();
        
        setMovie({ ...movie, [e.target.name]: e.target.value});
    }

    const submit = (e) => {
        // e.preventDefault();
        console.log('response')
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(response => {
            history.push('/')
            const newMovieArr = props.movieList.map(each => {
                if (each.id = response.data.id){
                    return (each = response.data);
                }
                else {
                    return each
                }
            })
            props.setMovie(newMovieArr);
             
        })
        .catch(error => console.error (error.message))
        
        history.push('/')
       window.location.reload()
    }

    return (
        <div>
            <h4>Update Movie</h4>
            <form onSubmit={(e)=>submit(e)}>
                <input
                    type='text'
                    name='title'
                    onChange={handleChange}
                    placeholder='Title'
                    value={movie.title}
                />
                <input
                    type='text'
                    name='director'
                    onChange={handleChange}
                    placeholder='Director'
                    value={movie.director}
                />
                <input
                    type='number'
                    name='metascore'
                    onChange={handleChange}
                    placeholder='Metascore'
                    value={movie.metascore}
                />
                <button type="submit" onClick={(e) => submit(e)}>UPDATE</button>
            </form>
        </div>
    )
}
export default UpdateForm;