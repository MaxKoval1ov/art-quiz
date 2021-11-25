const { default: Component } = require("../../Component");

class AuthorToGuess extends Component{
  constructor(isRight,text,container = "div", className = "which-author-answer"){
    let classes = className;
    if(isRight)
      classes += " right-image";
    super(container,classes);
    this.container.innerText = text
  }
}

export default AuthorToGuess