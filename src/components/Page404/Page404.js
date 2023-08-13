import { useNavigate } from 'react-router-dom';

import './Page404.css';

function Page404() {
  const navigate = useNavigate();

  return (
    <main className='page404'>
      <h2 className='page404__title'>404</h2>
      <p className='page404__subtitle'>Страница не найдена</p>
      <p
        className='page404__link link link_color_blu'
        onClick={() => navigate(-1)}
      >
        Назад
      </p>
    </main>
  );
}

export default Page404;
