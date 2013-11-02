var ChromeConstants = require("./xul-manager/chrome-constants.js").ChromeConstants;
var data = require("sdk/self").data;
var AttachTo = require("sdk/content/mod").attachTo;
var Style = require("sdk/stylesheet/style").Style;

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

    populateView: function (doc, theView) {
      console.log("populateView");

      // Get the document
      document = doc;

      // Load our stylesheet
      //var css = data.url('test-widget-styles.css'); // Resource URL to our stylesheet
      // let xmlPI = document.createProcessingInstruction("xml-stylesheet", 'hfref="test-widget-styles.css" type="text/css"'); // Create an XML processing instruction for a stylesheet
      // document.insertBefore(xmlPI, document.firstElementChild);
      //Stylesheet.loadSheet(document.parentWindow, css, "agent");
      var style = Style({
        source: "#msu-foo-lbl-counter {background-color: red; color: green; }"
      });
      attachTo(style, document.parentWindow);


      console.log(document);
       
      // Set the view
      view = theView;

      // Write our UI to the panelview
      injectUI();
    }
  };
}

exports.TestWidget = TestWidget;
