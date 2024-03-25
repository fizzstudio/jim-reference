/**
 * package-module-name module.
 * @module @fizz/package-module-name
 */

import * as domutil from '@fizz/dom-utils';

/**
 * Class demonstrating module and packaging use.
 * Given a container and the URL to a menu in an array of objects, creates a dropdown for each category of food, and a list of twisties of each dish.
 */
export class packageModuleName {
  /**
   * Constructor
   * @param {string} containerId The id of an element that content will be inserted in.
   * @param {string} menuFileName The URL and filename of the menu JSON file.
   * @constructor
   */
  constructor( containerId, menuFileName ) {
    // NOTE: Often, storing common variables as private variables of the object is useful, but
    //       here we're illustrating how to pass them around and to document arguments with JSDoc
    // this._container = document.getElementById( containerId );
    // this._menuFile = menuFile;

    // class members
    this._menu = null;
    this._detailsContainer = null;

    this._init( containerId, menuFileName );
  }

  /**
   * Initializes the module and calls the different methods in order.
   * @param {string} containerId] The id of an element that content will be inserted in.
   * @param {string} menuFileName The URL and filename of the menu file with an array of objects. 
   * @private
   * @memberOf module:@fizz/package-module-name
   */
  async _init( containerId, menuFileName ) {
    // get/make container elements
    const containerEl = document.getElementById(containerId);
    this._detailsContainer = document.createElement('div');

    this._menu = await this._loadMenuByFilename(menuFileName);
    this._makeDropdown( containerEl );
    // append details container after dropdown
    containerEl.append(this._detailsContainer);
  }

  /**
   * Finds and loads menu in JSON format based on file name.
   * @param {string} menuFileName The URL and filename of the menu JSON file.
   * @returns {Array<Object>} The menu file. 
   * @private
   * @memberOf module:@fizz/package-module-name
   */
  async _loadMenuByFilename(menuFileName) {
    const response = await fetch(menuFileName);
    const menu = await response.json();
    return menu;
  }

  /**
   * Populates a set of options for a dropdown (`select`) element.
   * @param {Element} containerEl The element to hold the dropdown.
   * @param {Array<Object>} menu The file with the list of menu categories to populate the dropdown.
   * @private
   * @memberOf module:@fizz/package-module-name
   */
  _makeDropdown(containerEl) {
    domutil.populateDropdown(containerEl, this._menu, 'id', 'label', this._showMenuItems.bind(this), 'select-dish-type', 'Select dish type:', 'Select one');
  }



  /**
   * Creates details element with optional event listener.
   * @param {Event} event A change event from a `select` element.
   * @private
   * @memberOf module:@fizz/package-module-name
   */
  _showMenuItems(event) {
    const dishId = event.target.value;
    const dish = this._menu.find(obj => {
      return obj.id === dishId;
    });

    if (dish?.items) {
      // clean container for each dish type, but not for each item
      let isAppend = false;
      dish.items.forEach( item => {
        const id = item.name.replace(/\W+/g, '_').toLowerCase();
        // create 2 elements
        const summary = document.createElement('summary');
        const name = this._makeSummaryItem(item.name, 'name');
        const price = this._makeSummaryItem(item.price, 'price');
        domutil.insertContentIntoContainer(summary, [name, price]);
        domutil.createDetails(id, item.desc, summary, this._detailsContainer, isAppend);
        isAppend = true;
      });      
    } else {
      // clean container for each dish type, but not for each item
      while (this._detailsContainer.lastChild) {
        this._detailsContainer.lastChild.remove();
      }
    }

  }

  /**
   * Creates a span element, inserts content into it, and adds an optional classname.
   * @param {string|Element} content The string or element to insert into the `span` element.
   * @param {string} classname The name of the CSS class to add, if any.
   * @returns {Element} A `span` element with the content and classname.
   * @private
   * @memberOf module:@fizz/package-module-name
   */
  _makeSummaryItem( content, classname ) {
    const span = domutil.createElementContent('span', content);
    span.classList.add(classname);
    return span;
  }
}
