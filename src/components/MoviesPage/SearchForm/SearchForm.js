import './SearchForm.css';

function SearchForm() {
  return (
    <form className='search-form movies-main-section'>
      <div className='search-form__container movies-common-section'>
        <div className='search-form__search-container'>
          <div className='search-form__search-img'></div>
          <input
            className='search-form__search-input'
            type='search'
            placeholder='Фильм'
          ></input>
          <button
            className='search-form__search-button link'
            type='submit'
            title='Поиск'
          ></button>
        </div>
        <div className='search-form__checkbox-container link'>
          <label className='search-form__label-search-checkbox'>
            <input
              className='search-form__search-checkbox'
              type='checkbox'
              id='search-checkbox'
              defaultChecked={true}
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
