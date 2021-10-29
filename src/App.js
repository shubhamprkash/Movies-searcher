import "./App.css";
import { useState, useEffect } from "react";

//  https://www.omdbapi.com/?i=tt3896198&apikey=9def8a00

function App() {
  let [movieinfo, setMovieinfo] = useState(null);
  let[title, setTitle]=useState("pk");

  useEffect(() => {
    getMovie();
  }, []);


  function readTitle(value){
    setTitle(value);
  }


  function getMovie(){

    let url = `https://www.omdbapi.com/?t=${title}&apikey=9def8a00`;
    fetch(url)
      .then((response) => response.json())
      .then((movie) => {
        console.log(movie)
        setMovieinfo(movie);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="App">
      <div className="container">
        <div className="padd">
          <h1>Movies Search</h1>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Movie Name"
              className="search-field "
              onChange={(event)=>{readTitle(event.target.value)}}
            />
            <button className=
            'sbtn' onClick={getMovie}>Get It!</button>
          </div>
            {
              movieinfo?.Error===undefined?(
            

          <div className="movie">

            <div className="poster">
               <img src={movieinfo?.Poster} className="poster-img" alt="poster-of-movie"/>
            </div>
            <div className="details">
              <div className="padd">
                <h1>{movieinfo?.Title}</h1>
                <p>{movieinfo?.Genre}</p>
                <p><strong>Directed By</strong><br/>{movieinfo?.Director}</p>
                <p><strong>Plot</strong><br/>{movieinfo?.Plot}</p>
                <p><strong>Actors</strong><br/>{movieinfo?.Actors}</p>
                <p><strong>BoxOffice Collection</strong><br/>{movieinfo?.BoxOffice}</p>
                <p><strong>Language</strong><br/>{movieinfo?.Language}</p>
                <p><strong>Released</strong><br/>{movieinfo?.Released}</p>
                <p><strong>Run Time</strong><br/>{movieinfo?.Runtime}</p>
               

                <div className="ratings">

                  {
                    movieinfo?.Ratings.map((rating,index)=>(
                      <div key={index}>
                        <strong>{rating.Source}</strong>
                        <h3>{rating.Value}</h3>
                        </div>
                    ))

                  }
                        
                </div>
              </div>

            </div>


          </div>
              ):
              (
                <h1>Movie not found! </h1>
              )
                }
        </div>
              
      </div>
    </div>
  );
}

export default App;
