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

    let credentials = $("#username").val() + ":" + $("#password").val()
    let encode = btoa(credentials);
    $.ajax({
      url: "/auth",
      type: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${encode}`
      },
      dataType: "json",
      success: function () {
        $(location).attr("href", "/");
      },
      error: function (err) {
        $("#username").val("");
        $("#password").val("");
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[Login] Server return Error ${err.status} (${error})`);
      }
    });
  });
}
