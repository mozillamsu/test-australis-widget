var ChromeConstants = require("./xul-manager/chrome-constants.js").ChromeConstants;

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
    console.log("injectUI balls");
    let label = document.createElement("label");
      label.setAttribute("id", "msu-foo-lbl-counter");
      label.setAttribute("value", count);

      view.appendChild(label);

    let button = document.createElement("button");
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

        console.log(doc);

      document = doc;
      view = theView;
      injectUI();
    }
  };
}

exports.TestWidget = TestWidget;
