import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import './MoviesPage.css';

function MoviesPage({ moviesCardArr, isLoading }) {
  return (
    <>
      <SearchForm />
      <MoviesCardList isLoading={isLoading} moviesCardArr={moviesCardArr} />
    </>
  );
}

export default MoviesPage;
