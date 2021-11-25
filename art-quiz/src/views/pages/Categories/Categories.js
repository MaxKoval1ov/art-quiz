import Component from "../../Component"
import "./Categories.scss"
import {images,images2} from "../../../images";
import CategoriesCard from "./CategoriesCard";
import Utils from "../../../services/Utils";

class Categories extends Component{
  constructor(tag = "div",className = "categories"){
    super(tag,className);
    let size = 20;
    this.imagesSubarray = [];
    this.imagesSubarray2 = [];
    for (let i = 0; i <Math.ceil(images.length/size); i++){
      this.imagesSubarray[i] = images.slice((i*size), (i*size) + size);
    }
    for (let i = 0; i <Math.ceil(images2.length/size); i++){
      this.imagesSubarray2[i] = images2.slice((i*size), (i*size) + size);
  }
    this.results = JSON.parse(window.localStorage.getItem("results"));
    if(!this.results){
      this.results ={
        "author":{
        0:0,
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
      },
      "picture":{
        0:0,
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
      }
      }
      window.localStorage.setItem("results",JSON.stringify(this.results));
    }
  }

  render(){
    this.results = JSON.parse(window.localStorage.getItem("results"));
    let type = Utils.parseRequestURL().resource;
    console.log(type);
    let isAuthor = true;
    type == "author" ? isAuthor = true : isAuthor = false;
    this.emptyContainer();
    if(isAuthor)
    {
      this.imagesSubarray.forEach((e,index) => {
        console.log(this.results[type][index]);
     const tempCont = new CategoriesCard(index, this.results[type][index], "./img/" + e[0].imageNum + ".jpg",isAuthor);
     this.container.append(  tempCont.render());
    })
    }else{
      this.imagesSubarray2.forEach((e,index) => {
        console.log(this.results[type][index]);
        const tempCont = new CategoriesCard(index, this.results[type][index], "./img/" + e[0].imageNum + ".jpg",isAuthor);
        this.container.append(  tempCont.render());
       })
    }
   return this.container
  }
}

export default Categories;

// author: 'Эль Греко',
//         name: 'Мальчик, зажигающий свечу',
//         year: '1572',
//         imageNum: '236',