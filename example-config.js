// this file is added to the bundle as assets/example-config.js and can be used in demos for loader configuration
// ("imports" variable below is automatically computed & replaced during build)

// uses ES5 syntax
(function () {
  var cdnBaseUri = new URL(document.currentScript.getAttribute("data-orig-src") || document.currentScript.src).origin;
  var imports = {}; // this line will be auto-replaced by devkit
  for (var k in imports) imports[k] = new URL(imports[k], cdnBaseUri).toString();

  // prettier-ignore
  {
  imports["create-react-class"] = "https://cdn.plus4u.net/libs/create-react-class/15.6.3/create-react-class.min.js";
  imports["immutable"] = "https://cdn.plus4u.net/libs/immutable/3.8.2/immutable.min.js";
  imports["uu5g04"] = "https://cdn.plus4u.net/uu-uu5g04/1.0.0/uu5g04.min.js";
  imports["uu5g04-bricks"] = "https://cdn.plus4u.net/uu-uu5g04/1.0.0/uu5g04-bricks.min.js";
  imports["uu5g04-forms"] = "https://cdn.plus4u.net/uu-uu5g04/1.0.0/uu5g04-forms.min.js";
  imports["uu5g04-hooks"] = "https://cdn.plus4u.net/uu-uu5g04/1.0.0/uu5g04-hooks.min.js";
  imports["uu5g04-block-layout"] = "https://cdn.plus4u.net/uu-uu5g04/1.0.0/uu5g04-block-layout.min.js";
  imports["uu_plus4u5g02-app"] = "https://cdn.plus4u.net/uu-plus4u5g02/1.0.0/uu_plus4u5g02-app.min.js";
  imports["uu5g05-dev"] = "https://cdn.plus4u.net/uu-uu5g05/1.0.0/uu5g05-dev.min.js";
  imports["uu5richtextg01"] = "https://cdn.plus4u.net/uu-uu5richtextg01/1.0.0/uu5richtextg01.min.js";
  imports["uu_editablecomponentcontentg03"] = "https://cdn.plus4u.net/uu-editablecomponentcontentg03/3.0.0/uu_editablecomponentcontentg03.min.js";
  imports["uu_applibraryregistryg01-bricks"] = "https://cdn.plus4u.net/uu-applibraryregistryg01/1.0.0/uu_applibraryregistryg01-bricks.min.js";
  imports["uu5tilesg02"] = "https://cdn.plus4u.net/uu-uu5tilesg02/1.0.0/uu5tilesg02.min.js";
  imports["uu5codekitg01"] = "https://cdn.plus4u.net/uu-uu5codekitg01/1.0.0/uu5codekitg01.min.js";
  imports["uu_lampg01"] = "https://cdn.plus4u.net/uu-lampg01/1.0.0/uu_lampg01.min.js";
  }

  window.Uu5Loader.config({ imports: imports });
})();
