import "./App.css"
import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import FilterDropdown from "./components/FilterDropdown";
import SearchBar from "./components/SearchBar";
import MovieDetail from "./components/MovieDetail";
import MovieList from "./components/MovieList";

import { SearchMovie } from "./api";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 3;

  const handleSearch = useCallback(async (searchTerm) => {
    try {
      const data = await SearchMovie(searchTerm, filter);
      setMovies(data.Search || [])
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false)
    }

  }, [filter])

  useEffect(() => {
    const loadDefaultMovies = async () => {
      await handleSearch("movies")
    }
    loadDefaultMovies()
  }, [handleSearch])

  const handleFilterChange = (filter) => {
    setFilter(filter)
  }

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie,indexOfLastMovie);

  const totalPages = Math.ceil(movies.length/moviesPerPage);

   const paginationNumbers = [];
   for(let i=1;i<totalPages;i++) {
    paginationNumbers.push(i)
   }

  if (loading) {
    return <h1 className="text-4xl">Data is loading please wait ......</h1>
  }

  if (error) {
    return <h1 className="text-2xl font-bold">Error: {error}</h1>
  }

  return (
    <Router>
      <header className="sticky top-0 bg-purple-400 items-center flex flex-wrap gap-5 justify-between p-5 mb-10 z-50 cursor-pointer p-8">
        <h1 className="text-4xl font-extrabold text-white">The Movie Application</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-wrap gap-5 justify-between">
          <FilterDropdown onFilterChange={handleFilterChange} />
        </div>
      </header>

      <main>
        <div className="mx-10">
          <Routes>
            <Route path="/" element={
              <>
                <MovieList movies={currentMovies} />
                {/*pagination*/}
                <div className="flex">
                  {paginationNumbers.map((pageNumber) => (
                    <button
                    key={pageNumber}
                    onClick={() => handlePagination(pageNumber)}
                    className={`py-2 px-3 rounded my-4 mx-2 ${currentPage === pageNumber ? "bg-blue-500" : "bg-gray-500"}`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>
              </>
            }
            />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </div>
      </main>
    </Router>


  )
}

export default App;