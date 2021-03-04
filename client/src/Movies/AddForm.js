import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title:'',
    director:'',
    metascore:'',
    stars: [],
}


export const AddForm = (props) => {
    const [movie, setMovie] = useState(initialMovie);
    const { title, director, metascore, stars } = movie;
    const history = useHistory();

    const handleChange = e => {
        e.persist();
        
        setMovie({
            ...movie, [e.target.name]: e.target.value
        })
    }

    const submit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/movies', movie)
        .then(response => {
        props.setMovieList(response.data)
        history.push('/')
        })
    
        .catch(error => console.log('error:', error))
        }

    return (
        <div>
            <h3>Add New Movie</h3>
            <form onSubmit={submit}>
                <input
                    type='text'
                    name='title'
                    placeholder='Title'
                    value={title}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='director'
                    placeholder='Director'
                    value={director}
                    onChange={handleChange}
                />
                <input
                    type='number'
                    name='metascore'
                    placeholder='Metascore'
                    value={metascore}
                    onChange={handleChange}
                />
                <button>Add Movie</button>
            </form>
        </div>
    )
}