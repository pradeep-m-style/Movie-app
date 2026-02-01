import { Link } from "react-router-dom";

function MovieList({ movies }) {

   if (movies.length === 0) {
      return <h1 className="text-2xl text-center font-bold text-red-700 uppercase">Searched movie is not found, please search again</h1>
   }

   return (
      <div className="text-white flex flex-wrap gap-10">
         {movies.map(movie => (
            <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
               <div className="mb-8 w-90 text-center tranform transition duration-500 hover:scale-90 rounded-md overflow-hidden" key={movie.imdbID}>
                  <img src={movie.Poster} className="w-full h-96" alt=""/>
                  <div className="bg-slate-500 py-4">
                     <h1 className="text-xl" >{movie.Title}</h1>
                     <h3 className="text-xl" >{movie.Year}</h3>
                     <p className="text-xl" >{movie.Type}</p>
                  </div>
               </div>
            </Link>
         ))}
      </div>
   )
}

export default MovieList;