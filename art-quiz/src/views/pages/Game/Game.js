import Utils from '../../../services/Utils';
import Component from '../../Component';
import { images, images2 } from '../../../images';
import './Game.scss';
import PictureToGuess from './PictureToGuess';
import AuthorToGuess from './AuthorToGuess';
import Result from './Result';

function countNums(mas, val) {
  return mas.reduce((acc, currentValue) => {
    if (currentValue == val) acc++;
    return acc;
  }, 0);
}

function randomInteger(min, max, curr) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand) != curr
    ? Math.round(rand)
    : randomInteger(min, max, curr);
}

class Listing extends Component {
  constructor(container = 'div', className = 'picture-listing') {
    super(container, className);
  }
  render(number, done) {
    for (let i = 0; i < number; i++) {
      const tmpEl = document.createElement('div');
      let className = 'picture-list-btn';
      done > i ? (className += ' active') : className;
      tmpEl.className = className;
      this.container.append(tmpEl);
    }
    return this.container;
  }
}

class Game {
  constructor() {
    let size = 20;
    this.imagesSubarray = [];
    this.imagesSubarray2 = [];
    for (let i = 0; i < Math.ceil(images.length / size); i++) {
      this.imagesSubarray[i] = images.slice(i * size, i * size + size);
    }
    for (let i = 0; i < Math.ceil(images2.length / size); i++) {
      this.imagesSubarray2[i] = images2.slice(i * size, i * size + size);
    }
    this.main = document.querySelector('main');
    this.settings = {};
    this.rightAudio = new Audio();
    this.rightAudio.preload = 'metadata';
    this.rightAudio.src = './sounds/rightAnswer.mp3';
    this.wrongAudio = new Audio();
    this.wrongAudio.preload = 'metadata';
    this.wrongAudio.src = './sounds/wrongAnswer.mp3';
    this.answer = [];
    this.currPicture = 0;
    this.tempArr = [];
    this.interval;
  }

  restore() {
    this.currPicture = 0;
    this.answer = [];
    this.tempArr = [];
  }

  emptyContainer() {
    this.container.innerHTML = '';
  }

  emtyMain() {
    this.main.innerHTML = '';
  }

  wrongAnswer(container) {
    this.wrongAudio.play();
    let isRight = false;
    const currElement = this.tempArr[this.currPicture];
    const wind = new Result(
      this.answer,
      isRight,
      this.currPicture,
      countNums(this.answer, true),
      currElement.name,
      currElement.year,
      currElement.author,
      currElement.imageNum,
      this.render.bind(this),
      this.main
    );
    this.currPicture++;
    this.saveStorage();
    this.container.append(wind.render());
    this.answer.push(false);
  }

  rightAnswer(container) {
    this.rightAudio.play();
    let isRight = true;
    const currElement = this.tempArr[this.currPicture];
    const wind = new Result(
      this.answer,
      isRight,
      this.currPicture,
      countNums(this.answer, true),
      currElement.name,
      currElement.year,
      currElement.author,
      currElement.imageNum,
      this.render.bind(this),
      this.main
    );
    this.currPicture++;
    this.saveStorage();
    this.container.append(wind.render());
    this.answer.push(true);
  }


  clInterval(){
    if(this.interval){
      clearInterval(this.interval);
    }
  }

  setTimer(conrainer) {
    this.interval = setInterval(() => {
      conrainer.value += 1;
      conrainer.innerText = conrainer.value;
      if (conrainer.value == this.settings['time']) {
        this.clInterval();
        this.wrongAnswer();
      }
    }, 1000);
  }

  saveStorage() {
    let tmpData = JSON.parse(window.localStorage.getItem('results'));
    let link = Utils.parseRequestURL();
    tmpData[link.resource][link.type] = countNums(this.answer, true);
    window.localStorage.setItem('results', JSON.stringify(tmpData));
  }

  addEvents(container) {
    [this.rightAudio, this.wrongAudio].forEach((el) => {
      el.volume = this.settings['volume'] / 100;
    });
    const cont = container.querySelector('.which-picture-choosing');

    const listenerFunction = (e) => {
      let targetItem = e.target;
      if (targetItem.classList.contains('right-image')) {
        targetItem.classList.add('true');
        this.rightAnswer(container);
      } else {
        targetItem.classList.add('false');
        this.wrongAnswer(container);
      }
      clearInterval(this.interval);
      cont.removeEventListener('click', listenerFunction);
    };

    cont.addEventListener('click', listenerFunction);

  }

  render() {
    this.emtyMain();
    this.settings = JSON.parse(window.localStorage.getItem('config'));
    let request = Utils.parseRequestURL();
    let tempArr;
    if (request.resource == 'author')
      tempArr = this.imagesSubarray[request.type];
    else tempArr = this.imagesSubarray2[request.type];
    this.tempArr = tempArr;
    let randomNums = [];
    for (let i = 0; i < 3; i++) {
      randomNums.push(randomInteger(0, 19, this.currPicture));
    }
    let rightPicture = randomInteger(0, 2, -1);
    const container = document.createElement('div');
    const questionCont = document.createElement('div');
    const pictureCont = document.createElement('div');
    const bigPicture = document.createElement('div');
    const progress = document.createElement('progress');
    progress.setAttribute('max', this.settings['time']);
    progress.setAttribute('min', 0);
    progress.setAttribute('value', 0);
    progress.setAttribute('class', "custom-progress");
    progress.innerText = 0;
    bigPicture.className = 'which-picture-big';
    pictureCont.className = 'which-picture-choosing';
    questionCont.className = 'which-picture-question';

    if (this.settings['isOn']) {
      container.append(progress);
      this.setTimer(progress);
    }
    if (request.resource == 'picture') {
      container.className = 'which-picture';
      questionCont.innerText = `Какая картина написана вот этим автором -> ${
        tempArr[randomNums[rightPicture]].author
      }?`;
      randomNums.forEach((el, index) => {
        if (index == rightPicture) {
          let rightEl = new PictureToGuess(
            true,
            `./img/${tempArr[this.currPicture].imageNum}.jpg`
          );
          pictureCont.appendChild(rightEl.render());
        }

        let tmpCont = new PictureToGuess(
          false,
          `./img/${tempArr[el].imageNum}.jpg`
        );
        pictureCont.append(tmpCont.render());
      });
      container.append(questionCont, pictureCont);
    } else {
      container.className = 'which-author';
      questionCont.innerText = 'Кто автор данной картины?';
      bigPicture.setAttribute(
        'style',
        `background-image: url("./img/${
          tempArr[this.currPicture].imageNum
        }.jpg")`
      );
      const listing = new Listing();
      bigPicture.append(listing.render(20, this.currPicture + 1));
      randomNums.forEach((el, index) => {
        if (index == rightPicture) {
          let rightEl = new AuthorToGuess(
            true,
            tempArr[this.currPicture].author
          );
          pictureCont.append(rightEl.render());
        }

        let tmpCont = new AuthorToGuess(false, tempArr[el].author);
        pictureCont.append(tmpCont.render());
      });
      container.append(questionCont, bigPicture, pictureCont);
    }

    this.addEvents(container);
    this.container = container;
    return container;
  }
}

export default Game;
