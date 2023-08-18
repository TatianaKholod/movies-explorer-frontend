import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import './MoviesPage.css';

function MoviesPage({
  moviesCardArr,
  isLoading,
  handleOnClickLike,
  handleClicSearchBtn,
  messageStr,
  handleClicCheckDuration,
}) {
  return (
    <>
      <SearchForm
        handleClicSearchBtn={handleClicSearchBtn}
        handleClicCheckDuration={handleClicCheckDuration}
      />
      <MoviesCardList
        isLoading={isLoading}
        moviesCardArr={moviesCardArr || []}
        handleOnClickLike={handleOnClickLike}
        messageStr={messageStr}
      />
    </>
  );
}

export default MoviesPage;
