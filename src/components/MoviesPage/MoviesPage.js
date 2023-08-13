import SearchForm from './SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import './MoviesPage.css';

function MoviesPage({ moviesCardArr, isLoading }) {
  return (
    <div>
      <SearchForm />
      <MoviesCardList isLoading={isLoading} moviesCardArr={moviesCardArr} />
      <Footer />
    </div>
  );
}

export default MoviesPage;
