import './Footer.css';

const footerLinkArr = [
  { name: 'Яндекс.Практикум', link: 'https://practicum.yandex.ru' },
  { name: 'Github', link: 'https://github.com' },
];
function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__container'>
        <p className='footer__year'>&copy; {new Date().getFullYear()}</p>
        <ul className='footer__nav'>
          {footerLinkArr.map((i, key) => (
            <li key={key}>
              <a
                className='footer__link link'
                href={i.link}
                target='blank'
                rel='noreferrer'
              >
                {i.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
