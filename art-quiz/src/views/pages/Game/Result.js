import Utils from '../../../services/Utils';

const { default: Component } = require('../../Component');

class Result extends Component {
  constructor(
    answerMas,
    isRight,
    stage,
    wins = 0,
    name,
    year,
    author,
    num,
    callBack,
    cont,
    container = 'div',
    className = 'result-container'
  ) {
    let classes = className;
    isRight ? classes+= " true" : classes+= " false";
    super(container, classes);

    this.congrats = new Audio;
    this.congrats.preload = "metadata";
    this.congrats.src = "./sounds/congratulation.mp3";
    this.lose = new Audio;
    this.congrats.preload = "metadata";
    this.congrats.src = "./sounds/loseGame.mp3";

    this.parsed = Utils.parseRequestURL();

    this.currAudio = null;
    if (stage == 19 && wins > 10) {
      this.container.innerHTML = `
        <div class="result-picture-wrapper show"><img class = "result-picture" src = "./cup.png" alt="Smth is wrong"></div>
        <div class="resault-name">Congrats</div>
        <a href = "/#/results" class="result-btn">Check results</a>
      `;
      console.log({"source":this.parsed.resource,"number":this.parsed.type},answerMas)
      window.localStorage.setItem("parsed",JSON.stringify({"source":this.parsed.resource,"number":this.parsed.type}));
      window.localStorage.setItem("answers",JSON.stringify(answerMas));
      this.currAudio = this.congrats;
    } else if (stage == 19) {
      this.container.innerHTML = `
        <div class="result-picture-wrapper show"><img class = "result-picture" src = "./notCup.png" alt="Smth is wrong"></div>
        <div class="resault-name">Almost done</div>
        <a href = "/#/results" class="result-btn">Check results</a>
      `;
      console.log({"source":this.parsed.resource,"number":this.parsed.type},answerMas)
      window.localStorage.setItem("parsed",JSON.stringify({"source":this.parsed.resource,"number":this.parsed.type}));
      window.localStorage.setItem("answers",JSON.stringify(answerMas));
      this.currAudio = this.lose;
    } else {
      this.container.innerHTML = `
      <div class="result-picture-wrapper ${isRight ? "true" : "false"}"><img class = "result-picture" src = "./img/${num}.jpg" alt="Smth is wrong"></div>
      <div class="resault-name">${name}</div>
      <div class="resault-year">${year}</div>
      <div class="result-author">${author}</div>
      <div class="result-btn">Next</div>
      `;
      this.container.querySelector(".result-btn").addEventListener("click",() => { cont.append(callBack())});
    }
  }



  render(){
    if(this.currAudio)
      this.currAudio.play();
    setTimeout(()=>{
      this.container.classList.add("show");
    },1);
    return this.container;
  }
}

export default Result