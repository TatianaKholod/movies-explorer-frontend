import './NavTab.css';

const navTabArr = [
  { name: 'О проекте', link: '#about-project' },
  { name: 'Технологии', link: '#techs' },
  { name: 'Студент', link: '#portfolio' },
];

function NavTab() {
  return (
    <ul className='nav-tab'>
      {navTabArr.map((i, key) => (
        <li key={key}>
          <a className='link' href={i.link}>
            {i.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default NavTab;
