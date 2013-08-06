/*
  TODO:
    * caching
    * image loading
    * bower support
    * amd support (maybe)
*/

;(function ($) {
  // load file
  var load = function (filename) {
    return $.ajax({
      url: filename,
      dataType: 'script'
    });
  };

  // functions for loading different filetypes
  var filetypeFunctions = {
    'js': load,
    'css': function (pathToStyle) {
      return load(pathToStyle).done(function (styles) {
        $('head').append('<style>' + styles + '</style>');
      });
    }
  };

  // get file extension from filename
  var getFileExtension = function (filename) {
    return filename.split('.').pop();
  };

  // add grap plugin to jQuery
  $.grab = function (filename, successCallback, failCallback) {
    var loadFile = filetypeFunctions[getFileExtension(filename)];

    return loadFile(filename).done(successCallback || $.noop)
                             .fail(failCallback || $.noop);
  };
})(jQuery);