import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PopularMovie from './Popular_Movie/Poular_Movie'; // Assuming this is a component
import Top_Rated from './Top_Rated_Movies/Top_Rated';
import Upcoming_Movie from './Upcoming_Movie/Upcoming_Movie';
import Movie_Detail from './Movie_Detail/Movie_Detail';
import Search_Moive from './Search_movie/Search_Movie'
function Movie_Routes() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<PopularMovie />} />
                <Route path='/Top_Rated' element={<Top_Rated />} />
                <Route path='/Upcoming_Movie' element={<Upcoming_Movie />} />
                <Route path="/movie/:id" element={<Movie_Detail />} />
                <Route path="/Search_Moive" element={<Search_Moive />} />
            </Routes>
        </div>
    );
}

export default Movie_Routes;


