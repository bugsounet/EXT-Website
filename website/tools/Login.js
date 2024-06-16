/** Login
* @bugsounet
**/

// define all vars
var translation = {};

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
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[Login] Server return Error ${err.status} (${error})`);
      });
  });
}
