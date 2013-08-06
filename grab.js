;(function ($) {
  // load file
  var load = function (filename) {
    return $.ajax({
      url: pathToScript,
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
    return filename.join('.').pop();
  };

  // add grap plugin to jQuery
  $.fn.grab = function (filename, successCallback, failCallback) {
    var loadFile = filetypeFunctions[getFileExtension(filename)];
    return loadFile().done(successCallback || $.noop())
                     .fail(failCallback || $.noop());
  };
})(jQuery);