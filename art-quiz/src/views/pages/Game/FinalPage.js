import { images, images2 } from "../../../images";
import FinalPicture from "./FinalPicture";

const { default: Component } = require("../../Component");


class FinalPage extends Component{
  constructor(tag = "div",className = "categories"){
    super(tag,className);
    let size = 20;
    this.imagesSubarray = [];
    this.imagesSubarray2 = [];
    for (let i = 0; i < Math.ceil(images.length / size); i++) {
      this.imagesSubarray[i] = images.slice(i * size, i * size + size);
    }
    for (let i = 0; i < Math.ceil(images2.length / size); i++) {
      this.imagesSubarray2[i] = images2.slice(i * size, i * size + size);
    }
    window.localStorage.setItem("answers","");
    this.trueMas = [];
    console.log(this.trueMas);
  }

  render(){
    let parsed = JSON.parse(window.localStorage.getItem("parsed"));
    let res = JSON.parse(window.localStorage.getItem("results"));
    let currMas = [];
    let currRes = 0;
    if(parsed["source"] == "author")
      {
        currRes = res["author"][parsed["number"]];
        currMas = this.imagesSubarray[parsed["number"]];
     }

    else
      {
        currRes = res["picture"][parsed["number"]];
        currMas = this.imagesSubarray2[parsed["number"]];
      }
      const finalResult = document.createElement("div");
      finalResult.innerText = "Final result : " + currRes;
      document.querySelector('main').append(finalResult);
    this.trueMas = JSON.parse(window.localStorage.getItem("answers"));
    currMas.forEach((el,index) => {
      console.log(this.trueMas[index]);
      const tmpElements = new FinalPicture(this.trueMas[index],el.imageNum,el.name,el.author,el.year);

      this.container.append(tmpElements.render());
    })

   return this.container;
  }
}

export default FinalPage