"use strict";
var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";

/**
 * Define various fixed dimensions
 */
const GRID_BOTTOM_EXTRA = 7; // title's line-height extends 7px past the margin
const GRID_WIDTH_EXTRA = 1; // provide 1px buffer to allow for rounding error
const SPONSORED_TAG_BUFFER = 2; // 2px buffer to clip off top of sponsored tag

/**
 * This singleton represents the grid that contains all sites.
 */
var gGrid = {
    /**
     * The DOM node of the grid.
     */
    _node: null,
    get node() { return this._node; },

    /**
     * The cached DOM fragment for sites.
     */
    _siteFragment: null,

    /**
     * All cells contained in the grid.
     */
    _cells: [],
    get cells() { return this._cells; },

    // Tells whether the grid has already been initialized.
    get ready() { return !!this._ready; },

    // Returns whether the page has finished loading yet.
    get isDocumentLoaded() { return document.readyState == "complete"; },

    /**
     * Initializes the grid.
     * @param aSelector The query selector of the grid.
     */
    init: function Grid_init(gridId) {
        this._node = document.getElementById(gridId);
        this._createSiteFragment();

        this._refreshGrid();
        this._ready = true;

// Resize the grid as soon as the page loads.
if (!this.isDocumentLoaded) {
    addEventListener("load", this);
}
},

/**
 * Creates a new site in the grid.
 * @param aLink The new site's link.
 * @param aCell The cell that will contain the new site.
 * @return The newly created site.
 */
createSite: function Grid_createSite(aLink, aCell) {
    let node = aCell.node;
    node.appendChild(this._siteFragment.cloneNode(true));
    return new Site(node.firstElementChild, aLink);
},

/**
 * Handles all grid events.
 */
handleEvent: function Grid_handleEvent(aEvent) {
    switch (aEvent.type) {
        case "load":
        case "resize":
            break;
    }
},

/**
 * Locks the grid to block all pointer events.
 */
lock: function Grid_lock() {
    this.node.setAttribute("locked", "true");
},

/**
 * Unlocks the grid to allow all pointer events.
 */
unlock: function Grid_unlock() {
    this.node.removeAttribute("locked");
},


/**
 * Renders the grid, including cells and sites.
 */
  _refreshGrid: function refreshGrid(){
      let cell = document.createElementNS(HTML_NAMESPACE, "div");
      cell.classList.add("newtab-cell");

      // Creates all the cells up to the maximum
      let fragment = document.createDocumentFragment();
      for (let i = 0; i < 3; i++) {
          fragment.appendChild(cell.cloneNode(true));
      }

      // Create cells.
      let cells=[];
     

      $.each(fragment.childNodes, function (index, current) {
          cells.push(new Cell(this, current));
      });
      // Fetch links.
      let links = [{ 'titleBgColor': 'red' }, { 'titleBgColor': 'green' }]

      // Create sites.
      let numLinks = Math.min(links.length, cells.length);
      for (let i = 0; i < numLinks; i++) {
          if (links[i]) {
              this.createSite(links[i], cells[i]);
          }
      }

      this._cells = cells;
      this._node.innerHTML = "";
      this._node.appendChild(fragment);
  },


/**
 * Creates the DOM fragment that is re-used when creating sites.
 */
_createSiteFragment: function Grid_createSiteFragment() {
    let site = document.createElementNS(HTML_NAMESPACE, "div");
    site.classList.add("newtab-site");
    site.setAttribute("draggable", "true");

    // Create the site's inner HTML code.
    site.innerHTML =
      '<span class="newtab-sponsored">button</span>' +
      '<a class="newtab-link">' +
      '  <span class="newtab-thumbnail"/>' +
      '  <span class="newtab-thumbnail enhanced-content"/>' +
      '  <span class="newtab-title"/>' +
      '</a>' +
      '<input type="button" title="pin"' +
      '       class="newtab-control newtab-control-pin"/>' +
      '<input type="button" title="block"' +
      '       class="newtab-control newtab-control-block"/>' +
      '<span class="newtab-suggested"/>';

    this._siteFragment = document.createDocumentFragment();
    this._siteFragment.appendChild(site);
},

};