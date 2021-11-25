import Component from '../Component';
import './settings.scss';

class Settings extends Component {
  constructor(cont = 'div', className = 'settings') {
    super(cont, className);
    this.settings = JSON.parse(window.localStorage.getItem('config'));
    console.log(this.settings);
    if (!this.settings) {
      this.settings = {
        volume: 50,
        time: 15,
        isOn: true,
      };
      window.localStorage.setItem('config', JSON.stringify(this.settings));
    }
    this.container.innerHTML = `
    <div class="settings-header">
    <a href="/#/" class="settings-cross">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
      <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
      </svg>
    </a>
   </div>
   <div class="settings-main">
     <label class="volume-wrapper" for = "custom-range">
       Громкость:
       <input type="range" data-param = "volume" class = "volume" id = "custom-range" min = 0 max = 100 step = 1 value = ${this.settings.volume}>
       <div class="volume-container">
         <span class="current-volume">${this.settings.volume}</span>
         <span class="possible-volume">/100</span>
       </div>
         </label>
         <label class="checkbox">
          Регулировка времени:
        <input type="checkbox" data-param = "isOn"${this.settings.isOn ? "checked" : ""}/>
      <div class="checkbox__text"></div>
         </label>
         <label class="time-wrapper" for = "custom-range">
       Секунд:
       <input type="range" data-param = "time" class = "time" id = "custom-range" min = 5 max = 30 step = 5 value = ${this.settings.time} ${!this.settings.isOn ? "disabled" : ""}>
       <div class="time-container">
         <span class="current-time">${this.settings.time}</span>
         <span class="possible-time">/30</span>
       </div>
         </label>
   </div>
   <div class="settings-footer">
    <div class="default-btn settings-control-btn">Default</div>
    <div class="save-btn settings-control-btn">Save</div>
  </div>
    `;
    this.checkbox = this.container.querySelector('input[type=checkbox]');
    this.volume = this.container.querySelector('.volume');
    this.time = this.container.querySelector('.time');
    this.saveBtn = this.container.querySelector('.save-btn');
    this.defaultBtn = this.container.querySelector('.default-btn');
    this.addListeners();
    this.addCurrListener();
    this.addBtnsListeners();
  }

  getConfig() {
    return this.settings;
  }

  addCurrListener() {
    [this.volume, this.time].forEach((el) => {
      el.addEventListener('change', () => {
        document.querySelector('.current-' + el.dataset.param).innerText = el.value;
      });
    });
  }

  addBtnsListeners(){
    this.saveBtn.addEventListener("click",() => {
      this.saveConfig();
    })
    this.defaultBtn.addEventListener("click", () => {
      this.settings = {
        volume: 50,
        time: 15,
        isOn: true,
      };
      this.time.value = this.settings["time"];
      document.querySelector(".current-time").innerText = this.settings["time"];
      this.volume.value = this.settings["volume"];
      document.querySelector(".current-volume").innerText = this.settings["volume"];
      this.time.disabled = !this.settings["isOn"];
      this.checkbox.checked = this.settings["isOn"];
      this.saveConfig();
    })
  }

  saveConfig(){
    window.localStorage.setItem("config",JSON.stringify(this.settings));
    console.log(window.localStorage.getItem("config"));
  }

  addListeners() {
    [this.checkbox, this.volume, this.time].forEach((el) => {
      el.addEventListener('change', () => {
        if(el.type == "checkbox")
        {
          console.log(el.type,el.checked);
          this.settings[el.dataset.param] = el.checked;
          this.time.disabled = !el.checked;
          console.log(this.settings)
        }
        else
        {
        console.log(el.type,el.value);
        this.settings[el.dataset.param] = el.value;
        console.log(this.settings);
        }
      });
    });
  }

  render() {
    this.clearHeader();
    return this.container;
  }
}

export default Settings;
