class Component{
  constructor(container, className){
    this.container = document.createElement(container);
    this.container.className = className;
    this.header = document.querySelector("header");
    this.footer = document.querySelector("footer");
  }

  emptyContainer(){
    this.container.innerHTML = "";
  }

  clearHeader(){
    this.header.innerHTML = "";
  }

  clearFooter(){
    this.footer.innerHTML = "";
  }

  clearAux(){
   this.footer.innerHTML = "";
   this.header.innerHTML = "";
  }

   render() {
    return this.container;
  }
}

export default Component