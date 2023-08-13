import './AboutProject.css';
function AboutProject() {
  return (
    <section
      className='about-project common-section'
      id='about-project'
      aria-label='О проекте'
    >
      <h2 className='main-title '>О проекте</h2>
      <div className='about-project__info-container'>
        <div className='about-project__info'>
          <h3 className='about-project__info-title'>
            Дипломный проект включал 5{'\u00a0'}этапов
          </h3>
          <p className='about-project__info-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__info'>
          <h3 className='about-project__info-title'>
            На выполнение диплома ушло 5{'\u00a0'}недель
          </h3>
          <p className='about-project__info-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about-project__graph-container'>
        <div className='about-project__graph about-project__graph_part_1'>
          <div className='about-project__graph-value about-project__graph-value_active_on'>
            1 неделя
          </div>
          <h4 className='about-project__graph-title '>Back-end</h4>
        </div>
        <div className='about-project__graph about-project__graph_part_4'>
          <div className='about-project__graph-value'>4 недели</div>
          <h4 className='about-project__graph-title'>Front-end</h4>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
