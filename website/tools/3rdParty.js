/** 3rd Party Module
* @bugsounet
**/

// rotate rules

var PleaseRotateOptions = {
  startOnPageLoad: false
};

// define all vars
var translation = {};

// Load rules
window.addEventListener("load", async (event) => {
  translation = await loadTranslation();

  $(document).prop("title", "MagicMirror² 3rd Party Modules");

  doTranslateNavBar();
});

