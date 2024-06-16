/** MMConfig
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

  forceMobileRotate();
  switch (window.location.pathname) {
    case "/MMConfig":
      viewJSEditor();
      break;
    case "/EditMMConfig":
      EditMMConfigJSEditor();
      break;
  }

  doTranslateNavBar();
});

//make viewJSEditor
async function viewJSEditor () {
  $(document).prop("title", translation.Configuration);
  $("#MMConfigHeader").text(translation.Configuration_Welcome);
  $("#EditLoadButton").text(translation.Configuration_EditLoad);
  var modules = await loadMMConfig();
  const container = document.getElementById("jsoneditor");

  const options = {
    mode: "code",
    mainMenuBar: false,
    onEditable (node) {
      if (!node.path) {
        // In modes code and text, node is empty: no path, field, or value
        // returning false makes the text area read-only
        return false;
      }
    }
  };
  const editor = new JSONEditor(container, options, modules);
}

async function EditMMConfigJSEditor () {
  $(document).prop("title", translation.Configuration);
  $("#MMConfigHeader").text(translation.Configuration_Edit_Title);
  $("#wait").text(translation.Wait);
  $("#done").text(translation.Done);
  $("#error").text(translation.Error);
  $("#errorConfig").text(translation.Error);
  $("#save").text(translation.Save);
  $("#load").text(translation.Load);
  $("#wait").css("display", "none");
  $("#done").css("display", "none");
  $("#error").css("display", "none");
  $("#errorConfig").css("display", "none");
  $("#load").css("display", "none");
  $("#save").css("display", "none");
  $("#buttonGrp").removeClass("invisible");
  $("select option:contains(\"Loading\")").text(translation.Configuration_Edit_AcualConfig);
  var allBackup = await loadBackupNames();
  var config = {};
  var conf = null;
  var options = {
    mode: "code",
    mainMenuBar: false,
    onValidationError: (errors) => {
      if (errors.length) {
        $("#save").css("display", "none");
        $("#externalSave").addClass("disabled");
        $("#errorConfig").css("display", "block");
      }
      else {
        $("#errorConfig").css("display", "none");
        $("#save").css("display", "block");
        $("#externalSave").removeClass("disabled");
      }
    }
  };

  if (window.location.search) {
    /* eslint-disable no-useless-escape */
    conf = decodeURIComponent(window.location.search.match(/(\?|&)config\=([^&]*)/)[2]);
    /* eslint-enable no-useless-escape */
    if (conf === "default") config = await loadMMConfig();
    else {
      options = {
        mode: "code",
        mainMenuBar: false,
        onEditable (node) {
          if (!node.path) {
            // In modes code and text, node is empty: no path, field, or value
            // returning false makes the text area read-only
            return false;
          }
        }
      };
      config = await loadBackupConfig(conf);
      $("#load").css("display", "block");
    }
  } else {
    conf = "default";
    config = await loadMMConfig();
  }
  $.each(allBackup, function (i, backup) {
    $("#backup").append($("<option>", {
      value: backup,
      text: backup,
      selected: (backup === conf) ? true : false
    }));
  });
  const container = document.getElementById("jsoneditor");
  const message = document.getElementById("messageText");
  const editor = new JSONEditor(container, options, config);
  document.getElementById("load").onclick = function () {
    $("#load").css("display", "none");
    $("#wait").css("display", "block");

    $.ajax({
      url: "/api/backups/file",
      type: "PUT",
      headers: {
        "Content-Type": "application/json",
        "backup": conf
      },
      dataType: "json",
      success: function (back) {
        $("#wait").css("display", "none");
        $("#done").css("display", "block");
        $("#alert").removeClass("invisible");
        $("#messageText").text(translation.Restart);
      },
      error: function(err) {
        $("#wait").css("display", "none");
        $("#error").css("display", "block");
        $("#alert").removeClass("invisible");
        $("#alert").removeClass("alert-success");
        $("#alert").addClass("alert-danger");
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) {
          $("#messageText").text(err);
          alertify.error("Connexion Lost!");
        } else {
          $("#messageText").text(err.statusText);
          alertify.error(`[loadBackup] Server return Error ${err.status} (${error})`);
        }
      }

    });
  };
  document.getElementById("save").onclick = function () {
    let data = editor.getText();
    $("#save").css("display", "none");
    $("#wait").css("display", "block");
    let encode = btoa(data);

    $.ajax({
      url: "/api/config/MM",
      type: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      dataType: "json",
      data: JSON.stringify({ config: encode }),
      success: function (back) {
        $("#wait").css("display", "none");
        $("#done").css("display", "block");
        $("#alert").removeClass("invisible");
        $("#messageText").text(translation.Restart);
      },
      error: function (err) {
        $("#wait").css("display", "none");
        $("#error").css("display", "block");
        $("#alert").removeClass("invisible");
        $("#alert").removeClass("alert-success");
        $("#alert").addClass("alert-danger");
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) {
          $("#messageText").text(err);
          alertify.error("Connexion Lost!");
        } else {
          $("#messageText").text(err.statusText);
          alertify.error(`[lwriteConfig] Server return Error ${err.status} (${error})`);
        }
      }
    });

  };
  FileReaderJS.setupInput(document.getElementById("fileToLoad"), {
    readAsDefault: "Text",
    on: {
      load (event, file) {
        if (event.target.result) {
          let encode = btoa(event.target.result);
          $.ajax({
            url: "/api/backups/external",
            type: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            dataType: "json",
            data: JSON.stringify({ config: encode }),
            success: function (back) {
              let decode = atob(back.config);
              let config = JSON.parse(decode);
              editor.update(config);
              editor.refresh();
              alertify.success("External Config Loaded !");
            },
            error: function (err) {
              let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
              if (!err.status) alertify.error("Connexion Lost!");
              else alertify.error(`[readExternalBackup] Server return Error ${err.status} (${error})`);
            }
          });
        }
      }
    }
  });
  document.getElementById("externalSave").onclick = function () {
    alertify.prompt("EXT-Website", "Save config file as:", "config", function (evt, value) {
      let fileName = value;
      if (fileName.indexOf(".") === -1) {
        fileName = `${fileName}.js`;
      } else {
        if (fileName.split(".").pop().toLowerCase() === "js") {
          // Nothing to do
        } else {
          fileName = `${fileName.split(".")[0]}.js`;
        }
      }
      var configToSave = editor.getText();
      let encode = btoa(configToSave);
      $.ajax({
        url: "/api/backups/external",
        type: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        dataType: "json",
        data: JSON.stringify({ config: encode }),
        success: function (back) {
          alertify.success("Download is ready !");
          $.get(`${back.file}`, function (data) {
            const blob = new Blob([data], { type: "application/javascript;charset=utf-8" });
            saveAs(blob, fileName);
          });
        },
        error: function (err) {
          let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
          if (!err.status) alertify.error("Connexion Lost!");
          else alertify.error(`[readExternalBackup] Server return Error ${err.status} (${error})`);
        }
      });
    }, function () {
      // do nothing
    });
  };
}
