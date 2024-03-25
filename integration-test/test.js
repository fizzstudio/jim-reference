import {packageModuleName} from '../dist/package-module-name.esm.js';
// import * as moduleObj from '../src/main.js';

window.addEventListener('load', () => new integrationTest());

export class integrationTest {
  constructor() {   
    this._init();
  }
  
  async _init() {
    this._testMethods();
  }


  _testMethods() {
    const dropdownContainerID = 'content_container';
    const menuURL = './data/menu.json';
    const menuObj = new packageModuleName(dropdownContainerID, menuURL);
    console.log(menuObj);
  }  


  async _loadData(filename) {
    const response = await fetch(`./data/${filename}`);
    const data = await response.json();
    return data;
  }  

  _changeLang(lang) {
    this._lang = lang;
    this._chartSummaryBuilder.updateLanguage( this._lang );
    this._container.append(this._chartSummaryBuilder.introduction);
  }  
}
