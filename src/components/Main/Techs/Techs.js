import './Techs.css';

const techsArr = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];

function Techs() {
  return (
    <section
      className='techs common-section'
      id='techs'
      aria-label='Технологии'
    >
      <h2 className='main-title '>Технологии</h2>
      <h3 className='techs__title'>7 технологий</h3>
      <p className='techs__text'>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className='techs__container'>
        {techsArr.map((i, key) => (
          <li className='techs__item' key={key}>
            {i}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Techs;
