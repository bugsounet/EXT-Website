/** fetch datas **/

function getHomeText () {
  return new Promise((resolve) => {
    $.getJSON("/api/translations/homeText", (text) => {
      //console.log("homeText", text)
      resolve(text.homeText);
    })
      .fail(function (err) {
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[homeText] Server return Error ${err.status} (${error})`);
      });
  });
}

function getVersion () {
  return new Promise((resolve) => {
    $.getJSON("/api/version", (ver) => {
      //console.log("Version", ver)
      resolve(ver);
    })
      .fail((err) => {
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[getVersion] Server return Error ${err.status} (${error})`);
      });
  });
}

function checkSystem () {
  return new Promise((resolve) => {
    $.getJSON("/api/system/sysInfo", (system) => {
      resolve(system);
    })
      .fail((err) => {
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[sysInfo] Server return Error ${err.status} (${error})`);
      });
  });
}

function checkWebviewTag () {
  return new Promise((resolve) => {
    $.getJSON("/api/config/webview", (tag) => {
      //console.log("webviewTag", tag)
      resolve(tag.webview);
    })
      .fail(function (err) {
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[checkWebviewTag] Server return Error ${err.status} (${error})`);
      });
  });
}

function checkGA () {
  return new Promise((resolve) => {
    $.getJSON("/getGAVersion", (GA) => {
      //console.log("GAVersion", GA)
      resolve(GA);
    })
      .fail(function (err) {
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[checkGA] Server return Error ${err.status} (${error})`);
      });
  });
}

function checkEXTStatus () {
  var ErrEXTStatus = 0;
  return new Promise((resolve) => {
    $.getJSON("/api/EXT/status", (Status) => {
      //console.log("EXTStatus", Status)
      resolve(Status);
    })
      .fail((err) => {
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (err.status === 403 || err.status === 401) $(location).attr("href", "/");
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[Status] Server return Error ${err.status} (${error})`);
      });
  });
}

function loadLoginTranslation () {
  return new Promise((resolve) => {
    $.getJSON("/api/translations/login", (tr) => {
      //console.log("Translation", tr)
      resolve(tr);
    })
      .fail(function (err) {
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[loginTranslation] Server return Error ${err.status} (${error})`);
      });
  });
}

function loadTranslation () {
  return new Promise((resolve) => {
    $.getJSON("/api/translations/common", (tr) => {
      //console.log("Translation", tr)
      resolve(tr);
    })
      .fail(function (err) {
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[loadTranslation] Server return Error ${err.status} (${error})`);
      });
  });
}

function loadDataAllEXT () {
  return new Promise((resolve) => {
    $.getJSON("/api/EXT", (all) => {
      //console.log("allEXT", all)
      resolve(all);
    })
      .fail(function (err) {
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[loadDataAllEXT] Server return Error ${err.status} (${error})`);
      });
  });
}

function loadDataConfiguredEXT () {
  return new Promise((resolve) => {
    $.getJSON("/api/EXT/configured", (confEXT) => {
      //console.log("ConfiguredEXT", confEXT)
      resolve(confEXT);
    })
      .fail(function (err) {
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[loadDataConfiguredEXT] Server return Error ${err.status} (${error})`);
      });
  });
}

function loadDataInstalledEXT () {
  return new Promise((resolve) => {
    $.getJSON("/api/EXT/installed", (instEXT) => {
      //console.log("InstalledEXT", instEXT)
      resolve(instEXT);
    })
      .fail(function (err) {
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[loadDataInstalledEXT] Server return Error ${err.status} (${error})`);
      });
  });
}

function loadDataDescriptionEXT () {
  return new Promise((resolve) => {
    $.getJSON("/api/EXT/descriptions", (desEXT) => {
      //console.log("DescriptionEXT", desEXT)
      resolve(desEXT);
    })
      .fail(function (err) {
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[loadDataDescriptionEXT] Server return Error ${err.status} (${error})`);
      });
  });
}

function loadMMConfig () {
  return new Promise((resolve) => {
    $.getJSON("/api/config/MM", (response) => {
      try {
        let parse = atob(response.config);
        let config = JSON.parse(parse);
        resolve(config);
      } catch (e) {
        alertify.error("[loadMMConfig] Error on decode server response");
      }
    })
      .fail(function (err) {
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[loadMMConfig] Server return Error ${err.status} (${error})`);
      });
  });
}

function getEXTVersions () {
  return new Promise((resolve) => {
    $.getJSON("/api/EXT/versions", (EXTs) => {
      resolve(EXTs);
    })
      .fail(function (err) {
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[getEXTVersions] Server return Error ${err.status} (${error})`);
      });
  });
}

function loadBackupNames () {
  return new Promise((resolve) => {
    $.getJSON("/api/backups", (backups) => {
      //console.log("backups", backups)
      resolve(backups);
    })
      .fail(function (err) {
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[loadBackupNames] Server return Error ${err.status} (${error})`);
      });
  });
}

function loadRadio () {
  return new Promise((resolve) => {
    $.getJSON("/api/EXT/RadioPlayer", (radio) => {
      //console.log("radio", radio)
      resolve(radio);
    })
      .fail(function (err) {
        let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
        if (!err.status) alertify.error("Connexion Lost!");
        else alertify.error(`[loadRadio] Server return Error ${err.status} (${error})`);
      });
  });
}

function loadPluginConfig (plugin) {
  return new Promise((resolve) => {
    $.ajax(
      {
        url: "/api/config/default",
        type: "GET",
        headers: {"ext": plugin},
        dataType: "json",
        success: function(response) {
          try {
            let parse = atob(response.config);
            let config = JSON.parse(parse);
            resolve(config);
          } catch (e) {
            alertify.error("[loadPluginConfig] Error on decode server response");
          }
        },
        error: function(err) {
          let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
          if (!err.status) alertify.error("Connexion Lost!");
          else alertify.error(`[loadPluginConfig] Server return Error ${err.status} (${error})`);
        }
      }
    )
  })
}

function loadPluginTemplate (plugin) {
  return new Promise((resolve) => {
    $.ajax(
      {
        url: "/api/config/schema",
        type: "GET",
        headers: {"ext": plugin},
        dataType: "json",
        success: function(response) {
          try {
            let parse = atob(response.schema);
            let schema = JSON.parse(parse);
            resolve(schema);
          } catch (e) {
            alertify.error("[loadPluginTemplate] Error on decode server response");
          }
        },
        error: function(err) {
          let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
          if (!err.status) alertify.error("Connexion Lost!");
          else alertify.error(`[loadPluginTemplate] Server return Error ${err.status} (${error})`);
        }
      }
    )
  })
}

function loadPluginCurrentConfig (plugin) {
  return new Promise((resolve) => {
    $.ajax(
      {
        url: "/api/config/EXT",
        type: "GET",
        headers: {"ext": plugin},
        dataType: "json",
        success: function(response){
          try {
            let parse = atob(response.config);
            let config = JSON.parse(parse);
            resolve(config);
          } catch (e) {
            alertify.error("[loadPluginConfig] Error on decode server response");
          }
        },
        error: function(err) {
          let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
          if (!err.status) alertify.error("Connexion Lost!");
          else alertify.error(`[loadPluginConfig] Server return Error ${err.status} (${error})`);
        }
      }
    )
  })
}

function loadBackupConfig (file) {
  return new Promise((resolve) => {
    $.ajax(
      {
        url: "/api/backups/file",
        type: "GET",
        headers: {"backup": file},
        dataType: "json",
        success: function(response){
          try {
            let parse = atob(response.config);
            let backup = JSON.parse(parse);
            resolve(backup);
          } catch (e) {
            alertify.error("[loadBackupConfig] Error on decode server response");
          }
        },
        error: function(err) {
          let error = err.responseJSON?.error ? err.responseJSON.error : (err.responseText ? err.responseText : err.statusText)
          if (!err.status) alertify.error("Connexion Lost!");
          else alertify.error(`[loadBackupConfig] Server return Error ${err.status} (${error})`);
        }
      }
    )
  });
}

function hasPluginConnected (obj, key, value) {
  if (typeof obj === "object" && obj !== null) {
    if (obj.hasOwnProperty(key)) return true;
    for (var p in obj) {
      if (obj.hasOwnProperty(p) && this.hasPluginConnected(obj[p], key, value)) {
        //logGW("check", key+":"+value, "in", p)
        if (obj[p][key] === value) {
          //logGW(p, "is connected")
          return true;
        }
      }
    }
  }
  return false;
}

function processSelectedFiles (fileInput) {
  let files = fileInput.files;
  let file = files[0].name;

  $("#backup").append($("<option>", {
    value: "default",
    text: file,
    selected: true
  }));
}

/** config merge **/
function configMerge (result) {
  var stack = Array.prototype.slice.call(arguments, 1);
  var item;
  var key;
  while (stack.length) {
    item = stack.shift();
    for (key in item) {
      if (item.hasOwnProperty(key)) {
        if (typeof result[key] === "object" && result[key] && Object.prototype.toString.call(result[key]) !== "[object Array]") {
          if (typeof item[key] === "object" && item[key] !== null) {
            result[key] = configMerge({}, result[key], item[key]);
          } else {
            result[key] = item[key];
          }
        } else {
          result[key] = item[key];
        }
      }
    }
  }
  return result;
}

function forceMobileRotate () {
  var Options = {
    forcePortrait: false,
    message: translation.Rotate_Msg,
    subMessage: translation.Rotate_Continue,
    allowClickBypass: false,
    onlyMobile: true
  };
  PleaseRotate.start(Options);
}

function doTranslateNavBar () {
  $("#Home").text(translation.Home);
  $("#Plugins").text(translation.Plugins);
  $("#Terminal").text(translation.Terminal);
  $("#Configuration").text(translation.Configuration);
  $("#Tools").text(translation.Tools);
  $("#About").text(translation.About);
  $("#System").text(translation.System);
  $("#Logout").text(translation.Logout);

  $("#accordionSidebar").removeClass("invisible");
  $("li.active").removeClass("active");
  var path = location.pathname;
  if (path === "/install"
    || path === "/delete"
    || path === "/EXTModifyConfig"
    || path === "/EXTCreateConfig"
  ) path = "/EXT";
  if (path === "/EditMMConfig") path = "/MMConfig";
  if (path === "/Die" || path === "/Restart") path = "/Tools";
  if (path === "/SystemDie" || path === "/SystemRestart") path = "/System";
  if (path === "/ptyProcess") path = "/Terminal";
  $(`a[href="${path}"]`).closest("a").addClass("active");
  $(`a[href="${path}"]`).removeAttr("href");
}
