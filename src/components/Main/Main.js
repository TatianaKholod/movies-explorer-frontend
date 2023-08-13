import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer';

import './Main.css';

function Main() {
  return (
    <div>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <Portfolio />
      <Footer />
    </div>
  );
}

export default Main;
