import "./App.css";
import { useState, useEffect, useCallback } from "react";


function App() {
  let [movieinfo, setMovieinfo] = useState(null);
  let[title, setTitle]=useState("world");
  let[inputValue, setInputValue]=useState("world");
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const getMovie = useCallback(() => {
    let url = `https://www.omdbapi.com/?t=${title}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((movie) => {
        console.log(movie)
        setMovieinfo(movie);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [title]);

  // Get movie on initial mount only
  useEffect(() => { 
    getMovie();
  },[getMovie]);

  // Handle theme changes
  useEffect(() => { 
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark-mode", darkMode);
  },[darkMode]);

  function handleSearch() {
    setTitle(inputValue);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="padd">
          <div className="header-top">
            <h1 className="title-heading">🎬 Movies Search</h1>
            <button 
              className="theme-toggle" 
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Movie Name"
              className="search-field "
              value={inputValue}
              onChange={(event)=>{setInputValue(event.target.value)}}
              onKeyPress={handleKeyPress}
            />
            <button className='sbtn' onClick={handleSearch}>Get It!</button>
            
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
      <div className="footinfo"><strong> All rights reserved  &copy; 2026 Shubham Prakash</strong></div>
    </div>
  );
}

export default App;
