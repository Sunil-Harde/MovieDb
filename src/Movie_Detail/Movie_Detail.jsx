import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';



function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`;
        const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`;

        const [movieResponse, castResponse] = await Promise.all([
          fetch(movieUrl),
          fetch(castUrl)
        ]);

        if (!movieResponse.ok || !castResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const movieData = await movieResponse.json();
        const castData = await castResponse.json();

        setMovie(movieData);
        setCast(castData.cast);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovie();
  }, [id]);


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
      <div className='container-flued text-light' >
        {movie ? (
          <div className=''>
            <div className='m-5 movie_Detail '>
              <div className='row d-flex align-content-center justify-content-center min-vh-100'>

                <div className="col-md-4 d-flex align-content-center justify-content-center min-vh-100">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='img-fluid rounded-2 h-75 movie_Detail_img_poster_path' />
                </div>
                <div className="col-md-8">
                  <div className="movie_Detail_info">
                    <h1>{movie.title}</h1>
                    <p> <span>Rating :</span> {movie.vote_average.toString().slice(0, 3)}</p>
                    <p><span>Run Time :</span> {movie.runtime} min</p>
                    <p><span>Genres :</span> {movie.genres.map(genre => genre.name).join(', ')}</p>
                    <p><span>Release Date :</span> {movie.release_date}</p>
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className=' container-fluid cast_info '>
              <h1 className='m-5 cast_info'>Cast</h1>
              <div className='row'>
                {cast.map((member) => (
                  <div key={member.cast_id} className=' col-lg-2 col-md-3 col-sm-4 col-6 mb-4'>
                    <div className='card border-0 bg-dark text-light'>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                        alt={member.name}
                        className='card-img-top rounded-1'
                      />
                      <div className='card-body'>
                        <h5 className='card-title text-center'>{member.name}</h5>
                        <p className='card-text text-center'>{member.character}</p>
                      </div>
                    </div>
                  </div>
                ))}
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

export default MovieDetail;
