
var gCustomize = {
  _nodeIDSuffixes: [
    "blank",
    "button",
    "classic",
    "enhanced",
    "panel",
    "overlay",
    "learn"
  ],

  _nodes: {},

  init: function() {
   
    _nodeIDSuffixes.forEach(function(idSuffix){
        this._nodes[idSuffix] = document.getElementById("newtab-customize-" + idSuffix);
    });

    this._nodes.blank.addEventListener("click", this);
    this._nodes.classic.addEventListener("click", this);
    this._nodes.enhanced.addEventListener("click", this);
    this._nodes.learn.addEventListener("click", this);

  },

  hidePanel: function() {
    this._nodes.overlay.addEventListener("transitionend", function onTransitionEnd() {
      gCustomize._nodes.overlay.removeEventListener("transitionend", onTransitionEnd);
      gCustomize._nodes.overlay.style.display = "none";
    });
    this._nodes.overlay.style.opacity = 0;
    this._nodes.button.removeAttribute("active");
    this._nodes.panel.removeAttribute("open");
    document.removeEventListener("click", this);
    document.removeEventListener("keydown", this);
  },


  handleEvent: function(event) {
    switch (event.type) {
      case "click":
        this.onClick(event);
        break;
      case "keydown":
        this.onKeyDown(event);
        break;
    }
  },

  onClick: function(event) {
    if (event.currentTarget == document) {
      if (!this._nodes.panel.contains(event.target)) {
        this.hidePanel();
      }
    }
    switch (event.currentTarget.id) {
      case "newtab-customize-blank":
        sendAsyncMessage("NewTab:Customize", {enabled: false, enhanced: false});
        break;
      case "newtab-customize-classic":
        if (this._nodes.enhanced.getAttribute("selected")){
          sendAsyncMessage("NewTab:Customize", {enabled: true, enhanced: true});
        } else {
          sendAsyncMessage("NewTab:Customize", {enabled: true, enhanced: false});
        }
        break;
      case "newtab-customize-enhanced":
        sendAsyncMessage("NewTab:Customize", {enabled: true, enhanced: !gAllPages.enhanced});
        break;
      case "newtab-customize-learn":
        this.showLearn();
        break;
    }
  },

  onKeyDown: function(event) {
    if (event.keyCode == event.DOM_VK_ESCAPE) {
      this.hidePanel();
    }
  },

  showLearn: function() {
    window.open(TILES_INTRO_LINK, 'new_window');
    this.hidePanel();
  }
};