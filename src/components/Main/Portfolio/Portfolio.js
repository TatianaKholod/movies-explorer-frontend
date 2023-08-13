import './Portfolio.css';
import student from '../../../images/photo.jpg';
import signImg from '../../../images/portfolio-cursor.svg';

const portfolioItemsArr = [
  {
    name: 'Статичный сайт',
    link: 'https://github.com/TatianaKholod/how-to-learn',
  },
  {
    name: 'Адаптивный сайт',
    link: 'https://github.com/TatianaKholod/russian-travel',
  },
  {
    name: 'Одностраничное приложение',
    link: 'https://github.com/TatianaKholod/react-mesto-api-full-gha',
  },
];

function Portfolio() {
  return (
    <section
      className='portfolio common-section'
      id='portfolio'
      aria-label='Портфолио'
    >
      <h2 className='main-title '>Студент</h2>
      <div className='portfolio__container-student'>
        <div className='portfolio__container-info'>
          <h2 className='portfolio__title'>Виталий</h2>
          <p className='portfolio__subtitle'>Фронтенд-разработчик, 30 лет</p>
          <p className='portfolio__text'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className='portfolio__link link'
            href='https://github.com/TatianaKholod'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <img
          className='portfolio__photo'
          alt='Фотография студента'
          src={student}
        />
      </div>
      <h3 className='portfolio__list-title'>Портфолио</h3>
      <ul className='portfolio__list'>
        {portfolioItemsArr.map((i, key) => (
          <li className='portfolio__list-item' key={key}>
            <a
              className='portfolio__list-link link'
              href={i.link}
              target='blank'
              rel='noreferrer'
            >
              {i.name}

              <img
                className='portfolio__list-img'
                alt='указатель'
                src={signImg}
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Portfolio;
