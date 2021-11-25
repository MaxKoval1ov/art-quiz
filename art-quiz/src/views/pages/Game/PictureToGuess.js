const { default: Component } = require('../../Component');

class PictureToGuess extends Component {
  constructor(
    isRight,
    path,
    container = 'div',
    className = 'which-image-wrapper'
  ) {
    let classes = className;
    if (isRight) classes += ' right-image';
    super(container, classes);
    const image = document.createElement('img');
    const before = document.createElement('div');
    before.className = 'before-element';
    image.setAttribute('src', path);
    image.setAttribute('alt', 'smth is wrong');
    image.setAttribute('class', `choosing-picture ${isRight ? "right-image" : ""}`);
    this.container.append(image, before);
  }
}

export default PictureToGuess;
