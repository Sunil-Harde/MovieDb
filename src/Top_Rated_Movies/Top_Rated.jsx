import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';


function Top_Rated() {
    const [movies, setMovies] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const maxPageNumbers = 3;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {

            try {
                const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${pageCount}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const data = await response.json();
                setMovies(data.results);
                setTotalPages(data.total_pages);
                setError(null);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchMovies();
    }, [pageCount]);

    const prevPage = () => {
        if (pageCount > 1) {
            setPageCount(pageCount - 1);
        }
    };

    const nextPage = () => {
        if (pageCount < totalPages) {
            setPageCount(pageCount + 1);
        }
    };

    const goToPage = (page) => {
        setPageCount(page);
    };

    const renderPageNumbers = () => {
        const pages = [];
        const startPage = Math.max(1, pageCount - Math.floor(maxPageNumbers / 2));
        const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={pageCount === i ? 'active btn btn-dark mx-2' : 'btn btn-primary mx-2'}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };


    if (error) {
        return (
            <div className='d-flex align-items-center justify-content-center min-vh-100 bg-dark'>
                <p className='text-light'>{error}</p>
            </div>
        );
    }

    return (
        <div className='bg-dark min-vh-100'>
            <Navbar />
            <div className='container mt-5'>
            <h4 className='text-light pb-4'>Top Rated Movies</h4>
                {movies.length ? (
                    <div>
                        <div className='movie-list'>
                            <div className='row'>
                                {movies.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className='col-lg-3 mb-5 d-flex justify-content-center col-md-4 col-sm-6 col-xs-6 movies-par'
                                    >
                                        <div
                                            className='movie card w-75 bg-dark border-0 img-fluid'
                                            onClick={() => navigate(`/movie/${movie.id}`)}
                                        >
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                                className='card-img-top mb-2 w-100 rounded-1'
                                            />
                                            <h5 className='text-center text-light'>{movie.title}</h5>
                                            <h6 className='text-center text-light'>Rating: {movie.vote_average.toFixed(1)}</h6>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='d-flex justify-content-center mt-4'>
                            <div className='pagination-buttons'>
                                <button onClick={prevPage} className='btn btn-primary' disabled={pageCount === 1}>
                                    Previous
                                </button>
                                {renderPageNumbers()}
                                <button onClick={nextPage} className='btn btn-primary' disabled={pageCount === totalPages}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (

                    <div className='d-flex align-items-center justify-content-center bg-dark min-vh-100' >
                        <p className='spin'></p>
                    </div>

                )}
            </div>
            <Footer/>
        </div>
    );
}

export default Top_Rated;
