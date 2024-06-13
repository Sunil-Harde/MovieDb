import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/NavBar';

function Upcoming_Movie() {
    const [movies, setMovies] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const maxPageNumbers = 3;
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const searchInput = searchParams.get('search');

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                let url;
                if (searchInput) {
                    url = `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${searchInput}&page=${pageCount}`;
                } else {
                    url = `https://api.themoviedb.org/3/movie/upcoming?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${pageCount}`;
                }
                const response = await fetch(url);
                const data = await response.json();
                setMovies(data.results);
                setTotalPages(data.total_pages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setError('Failed to fetch movies. Please try again later.');
                setLoading(false);
            }
        };

        fetchMovies();
    }, [pageCount, searchInput]);

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

    if (loading) {
        return (
            <div className='d-flex align-items-center justify-content-center min-vh-100 bg-dark'>
                <p className='spin'></p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='d-flex align-items-center justify-content-center min-vh-100 bg-dark'>
                <p className='text-light'>{error}</p>
            </div>
        );
    }

    return (
        <div className='bg-dark min-vh-100'>
            <Navbar/>
            <div className='container mt-5'>
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
                    <div className='d-flex align-items-center justify-content-center bg-dark min-vh-100'>
                        <p className='spin'></p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Upcoming_Movie;
