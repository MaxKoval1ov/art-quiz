import Utils from '../../../services/Utils';
import Component from '../../Component';

class CategoriesCard extends Component {
  constructor(name, done, path,isAuthor, tag = 'div', className = 'categories-container') {
    super(tag, className);
    const wrapper = document.createElement("a");
    wrapper.setAttribute("href", `/#/${isAuthor ? "author" : "picture"}/` + name);
    wrapper.className = "categories-card-wrapper";
    wrapper.innerHTML = `
    <div class="categories-card ${done === 0 ? 'grey' : ''}">
    <div class="categories-card_info">
      <div class="categories-card_name">
        ${name}
      </div>
      <div class="categories-card_progress">
          <div class="categories-card_progress-done">
            ${done}
          </div>
          <div class="categories-card_progress-to-do">
            /10
          </div>
      </div>
    </div>
    <div class="categories-image-wrapper">
      <img src=${path} alt="Categiries">
    </div>
  </div>
`
    this.container.append(wrapper);
  }
}

export default CategoriesCard;
