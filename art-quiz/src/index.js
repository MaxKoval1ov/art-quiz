import './style.scss';
import 'normalize.css';

import MainPage from './views/pages/MainPage/MainPage';
import Footer from './views/components/Footer';
import Header from './views/components/Header/Header';
import Utils from './services/Utils';
import Error404 from './views/pages/Error404';
import Categories from './views/pages/Categories/Categories';
import Game from './views/pages/Game/Game';
import Settings from './views/components/Settings';
import FinalPage from './views/pages/Game/FinalPage';

const categories = new Categories();
const game = new Game();
const settings = new Settings();
const final = new FinalPage();

const routes = {
  '/author': categories,
  '/picture': categories,
  '/picture/:id': game,
  '/author/:id': game,
  '/settings': settings,
  '/results': final,
};

const header = null || document.getElementById('header');
const content = null || document.getElementById('main');
const footer = null || document.getElementById('footer');
let settingsBtn = null || document.querySelector('.settings-btn');

const renderStartPage = async () => {
  header.innerHTML = await Header.render();
  footer.innerHTML = await Footer.render();
  content.innerHTML = await MainPage.render();
  settingsBtn = await MainPage.renderBtn();
  await MainPage.after_render();
};

const router = async () => {
  game.restore();
  game.clInterval();
  if (settingsBtn) settingsBtn.remove();
  categories.emptyContainer();
  let request = Utils.parseRequestURL();
  let parsedURL =
    (request.resource ? '/' + request.resource : '/') +
    (request.type ? '/:id' : '') +
    (request.id ? '/' + request.id : '');
  console.log(parsedURL);
  if (parsedURL == '/') {
    renderStartPage();
  } else {
    header.innerHTML = await Header.render();
    await Header.after_render();
    footer.innerHTML = await Footer.render();
    await Footer.after_render();
    // console.log(parsedURL);
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    content.innerHTML = '';
    content.append(page.render());
  }
};

window.addEventListener('hashchange', (e) => {e.preventDefault()})

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
