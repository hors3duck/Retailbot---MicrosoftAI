(function() {

  if (!HTMLCanvasElement.prototype.toBlob) {
    // Edge doesn't support toBlob method
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value: function (callback, type, quality) {
        var dataURL = this.toDataURL(type, quality).split(',')[1];
        setTimeout(function() {

          var binStr = atob( dataURL ),
          len = binStr.length,
          arr = new Uint8Array(len);

          for (var i = 0; i < len; i++ ) {
            arr[i] = binStr.charCodeAt(i);
          }

          callback( new Blob( [arr], {type: type || 'image/png'} ) );

        });
      }
    });
  }

})();
