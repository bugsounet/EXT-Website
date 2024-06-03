/* global window, getGatewayVersion, loadTranslation, $, alertify, location */

/** EXT tools
* @bugsounet
**/

// define all vars
var translation = {};
var versionGW = {};

// Load rules
window.addEventListener("load", async (event) => {
  translation = await loadLoginTranslation();
  doLogin();
});

function doLogin () {
  $("#Login-submit").addClass("disabled");
  $(document).prop("title", translation.welcome);
  $("#Welcome").text(translation.welcome);
  $("#username").attr("placeholder", translation.username);
  $("#password").attr("placeholder", translation.password);
  $("#Login-submit").text(translation.login);

  $("#login").on("input change", function () {
    if ($("#username").val() !== "" && $("#password").val() !== "") $("#Login-submit").removeClass("disabled");
    else $("#Login-submit").addClass("disabled");
  });

  $("#login").submit(function (event) {
    event.preventDefault();
    alertify.set("notifier", "position", "top-center");
    $.post("/auth", $(this).serialize())
      .done((back) => {
        if (back.err) {
          alertify.error(`[Login] ${back.err.message}`);
          $("#username").val("");
          $("#password").val("");
          $("#Login-submit").addClass("disabled");
        }
        else {
          $(location).attr("href", "/");
        }
      })
      .fail(function (err) {
        alertify.error(`[Login] Server return Error ${err.status} (${err.statusText})`);
        console.log(err);
      });
  });
}
