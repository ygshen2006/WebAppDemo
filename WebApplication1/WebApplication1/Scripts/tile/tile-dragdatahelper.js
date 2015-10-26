
var gDragDataHelper = {
  get mimeType() {
    return "text/x-moz-url";
  },

  getLinkFromDragEvent: function DragDataHelper_getLinkFromDragEvent(aEvent) {
    let dt = aEvent.dataTransfer;
    if (!dt || !dt.types.contains(this.mimeType)) {
      return null;
    }

    let data = dt.getData(this.mimeType) || "";
    return {url: "http://www.baidu.com", title: "test title"};
  }
};