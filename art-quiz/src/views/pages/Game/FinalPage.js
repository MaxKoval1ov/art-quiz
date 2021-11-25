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
    let currMas = []
    if(parsed["source"] == "author")
      currMas = this.imagesSubarray[parsed["number"]];
    else
      currMas = this.imagesSubarray2[parsed["number"]];
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