import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

function SearchForm({ handleClicSearchBtn, handleClicCheckDuration }) {
  const location = useLocation();

  const [keyWord, setKeyWord] = useState('');
  const [durationTogl, setDurationTogl] = useState(false);
  const [searhPlaceholder, setSearhPlaceholder] = useState('Фильм');

  const handleChangeKeyWord = (e) =>{
    setKeyWord(e.target.value);
  }
  const handleClicSearchBtnForm = (e) => {
    e.preventDefault();
    (keyWord === '')&&(location.pathname === '/movies')
      ? (setSearhPlaceholder('Нужно ввести ключевое слово'))
      : handleClicSearchBtn(keyWord, durationTogl);
  };
  const handleClicCheckDurationForm = (e) => {
    setDurationTogl(e.target.checked);
    // слово передадим для ситуации, когда отображены сохраненные данные и нужен новый фильтр
    handleClicCheckDuration(e.target.checked, keyWord);
  };
  useEffect(() => {
    // если есть данные в localStorage покажем их только на странице фильмов
    if (location.pathname !== '/movies') return;
    const check = (localStorage.getItem('durationTogl')==='false')? false: true;
    setKeyWord(localStorage.getItem('searchWord'));
    setDurationTogl(check);
  }, [location.pathname]);

  return (
    <form className='search-form movies-main-section'>
      <div className='search-form__container movies-common-section'>
        <div className='search-form__search-container'>
          <div className='search-form__search-img'></div>
          <input
            className='search-form__search-input'
            type='search'
            placeholder={searhPlaceholder}
            value={keyWord}
            onChange={handleChangeKeyWord}
          ></input>
          <button
            className='search-form__search-button link'
            type='submit'
            title='Поиск'
            onClick={handleClicSearchBtnForm}
          ></button>
        </div>
        <div className='search-form__checkbox-container link'>
          <label className='search-form__label-search-checkbox'>
            <input
              className='search-form__search-checkbox'
              type='checkbox'
              id='search-checkbox'
              onChange={handleClicCheckDurationForm}
              checked={durationTogl}
            ></input>
            <span className='search-form__search-checkbox-switch'>
              Короткометражки
            </span>
          </label>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
