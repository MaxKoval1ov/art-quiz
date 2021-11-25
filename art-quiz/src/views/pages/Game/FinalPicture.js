const { default: Component } = require("../../Component");

/*
        author: 'Павел Федотов',
        name: 'Сватовство майора',
        year: '1852',
        imageNum: '0',
        */

class FinalPicture extends Component{
  constructor(isRight,num,name, author, year,container = "div",className = "categories-container"){
    super(container,className);
    this.container.innerHTML = `
    <div class="categories-card-wrapper">
    <div class="categories-card ${isRight ? "" : "grey"}">
    <div class="categories-image">
      <img src="./img/${num}.jpg" alt="Categiries">
      <div class="image-description">
        <div class="desc-name">${name}</div>
        <div class="desc-author">${author}</div>
        <div class="desc-date">${year}</div>
      </div>
    </div>
  </div>
</div>
    `
  }
}

export default FinalPicture