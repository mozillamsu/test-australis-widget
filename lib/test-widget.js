var ChromeConstants = require("./xul-manager/chrome-constants.js").ChromeConstants;
var data = require("sdk/self").data;

function TestWidget () {
  let count = 0;
  let document = null;
  let view = null;

    function buttonClicked() {

        console.log("buttonclick");

        let label = document.getElementById("msu-foo-lbl-counter");

        count++;
        label.setAttribute("value", count);

        view.appendChild(document.createElement("box"));
    }

  function injectUI () {
    console.log("injectUI");
    let label = document.createElement("label");
      label.setAttribute("id", "msu-foo-lbl-counter");
      label.setAttribute("value", count);
      //label.setAttribute('style','background-color: red; color: green;');
      console.log(label);

      view.appendChild(label);

    let button = document.createElement("button");
      button.setAttribute("id", "msu-foo-button");
      button.innerHTML = "Click Me";
      button.addEventListener("command", buttonClicked);

      view.appendChild(button);
  }

  return {
    CONFIG: {
        id: "test-widget",
        type: "view",
        viewId: "TestWidget-view",
        removable: true,
        defaultArea: ChromeConstants.AREA_PANEL()
    },

    widgetCreated: function(node) {
      console.log("inside of the widgets onCreated");

      let doc = node.ownerDocument;
      let img = doc.createElement("image");
        img.setAttribute("class", "toolbarbutton-icon");
        img.id = "weather-icon";
        img.setAttribute("src", "http://google.com/favicon.ico");
        img.setAttribute("width", "16px");
        img.setAttribute("height", "16px");

        let lbl = doc.createElement("label");
        lbl.setAttribute("class", "toolbarbutton-text toolbarbutton-label");
        lbl.setAttribute("flex", "1");
        lbl.setAttribute("value", "Counter Widget");
        lbl.id = "weather-icon-label";

        node.appendChild(img);
        node.appendChild(lbl);
    },

    viewShowing: function (doc, theView) {
      console.log("populateView");

      // Get the document
      document = doc;

      // Load our stylesheet
      var css = data.url('styles.css'); // Resource URL to our stylesheet
      let xmlPI = document.createProcessingInstruction('xml-stylesheet', 'href="'+css+'" type="text/css"'); // Create an XML processing instruction for a stylesheet
      document.insertBefore(xmlPI, document.firstElementChild);

      // Set the view
      view = theView;

      // Write our UI to the panelview
      injectUI();
    }
  };
}

exports.TestWidget = TestWidget;
