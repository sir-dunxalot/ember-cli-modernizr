(function() {

  Modernizr.addTest({
    track: function(){
      var video = document.createElement('video');

      return typeof video.addTextTrack === 'function';
    },
    jumbo: function() {
      return false;
    }
  });

});
