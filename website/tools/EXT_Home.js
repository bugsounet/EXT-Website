/* global window, getGatewayVersion, loadTranslation, getHomeText, $, forceMobileRotate, doTranslateNavBar */

/** EXT tools
* @bugsounet
**/

// rotate rules

var PleaseRotateOptions = {
  startOnPageLoad: false
};

// define all vars
var translation = {};
var versionGA = {};
var homeText = {};

// Load rules
window.addEventListener("load", async (event) => {
  versionGA = await getGatewayVersion();
  translation = await loadTranslation();
  homeText = await getHomeText();

  $("html").prop("lang", versionGA.lang);
  forceMobileRotate();
  doIndex();
  doTranslateNavBar();
  // @todo Add ID in src
  $("#HomeText").html(homeText);
});

function doIndex () {
  $(document).prop("title", translation.Home);
  $("#welcome").text(translation.Home_Welcome);
  if (versionGA.needUpdate) {
    $("#alert").removeClass("invisible");
    $("#alert").removeClass("alert-success");
    $("#alert").addClass("alert-warning");
    $("#messageText").text(`${translation.Update} v${versionGA.last}`);
  }
}

