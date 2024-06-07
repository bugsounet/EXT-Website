/** Shutdown
* @bugsounet
**/

// define all vars
var translation = {};

// Load rules
window.addEventListener("load", async (event) => {
  translation = await loadTranslation();

  doShutdown();
});

function doShutdown () {
  $(document).prop("title", translation.Tools);
  $("#text1").text(translation.Tools_Die_Text1);
  $("#text2").text(translation.Tools_Die_Text2);
  $("#text3").text(translation.Tools_Die_Text3);
  $.post( "/api/system/shutdown")
}
