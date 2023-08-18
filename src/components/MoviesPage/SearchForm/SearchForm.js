import { createRef, useEffect } from 'react';
import './SearchForm.css';

function SearchForm({ handleClicSearchBtn, handleClicCheckDuration }) {
  const refInputSearh = createRef();
  const refCheckDuration = createRef();

  const handleClicSearchBtnForm = (e) => {
    e.preventDefault();
    refInputSearh.current.value === ''
      ? (refInputSearh.current.placeholder = 'Нужно ввести ключевое слово')
      : handleClicSearchBtn(refInputSearh.current.value, refCheckDuration.current.checked);
  };
  const handleClicCheckDurationForm = (e) => {
    // слово передадим для ситуации, когда отображены сохраненные данные и нужен новый фильтр
    handleClicCheckDuration(e.target.checked, refInputSearh.current.value);
  };
  useEffect(() => {
    const check = (localStorage.getItem('durationTogl')==='false')? false: true;
    refInputSearh.current.value = localStorage.getItem('searchWord');
    refCheckDuration.current.checked = check;
  }, []);

  return (
    <form className='search-form movies-main-section'>
      <div className='search-form__container movies-common-section'>
        <div className='search-form__search-container'>
          <div className='search-form__search-img'></div>
          <input
            className='search-form__search-input'
            type='search'
            placeholder='Фильм'
            ref={refInputSearh}
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
              defaultChecked={false}
              onChange={handleClicCheckDurationForm}
              ref={refCheckDuration}
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
