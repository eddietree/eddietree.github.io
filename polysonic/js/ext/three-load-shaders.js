function loadFile(url, callback) {
  var request = new XMLHttpRequest();
  if (request.overrideMimeType) {
    request.overrideMimeType('text/plain');
  }

  function handleLoad(e) {
    callback(null, request.responseText);
  }

  function handleError(e) {
    callback(e);
  }

  request.open('get', url, true);
  request.addEventListener('load', handleLoad, false);
  request.addEventListener('error', handleError, false);
  request.send();
}

function loadFiles(files, callback) {
  var numToLoad = 0;
  var loadedFiles = {};

  function callbackOnce(err, content) {
    if (callback) {
      var cb = callback;
      callback = undefined;
      return cb(err, content);
    }
  };

  files.forEach(function(file) {
    ++numToLoad;
    loadFile(file, function(err, content) {
      if (err) {
        // make sure we only call this once!
        return callbackOnce(err);
      }

      loadedFiles[file] = content;
      --numToLoad;
      if (numToLoad == 0) {
        callbackOnce(null, loadedFiles);
      }
    })
  });
}
