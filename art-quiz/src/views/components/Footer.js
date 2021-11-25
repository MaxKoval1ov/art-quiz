let Footer = {
  render: async () => {
      let view =  `
      <a href="/#/"><img src="./rsSchool.png" alt="RS SChool"></a>
      <div class="author">
        <span class="author-name">MaxKoval1ov</span>
        <span class="date">@2021</span>
      </div>
      `
      return view
  },
  after_render: async () => { }

}

export default Footer;