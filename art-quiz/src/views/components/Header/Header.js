import './Header.scss';

{/* <a class="navbar-item" href="/#/picture/categories">
Categories
</a> */}

let Header = {
  render: async () => {
    let view = /*html*/ `
      <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container">
          <div class="navbar-brand">
              <a class="navbar-item" href="/#/">
                  <img src="./ArtQuizSec.png">
              </a>

              <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
              </a>
          </div>

          <div id="navbarBasicExample" class="navbar-menu is-active" aria-expanded="false">
              <div class="navbar-start">
                  <a class="navbar-item" href="/#/">
                      Home
                  </a>
              </div>
          </div>
      </div>
  </nav>
      `;
    return view;
  },
  after_render: async () => {},
};

export default Header;
