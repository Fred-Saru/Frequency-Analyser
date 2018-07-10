requirejs(["audio", "visualiser", "track"], function (Audio, Visualiser, Track) {

  let tracks = [];
  let globalTrack = new Track('global', 1, 0.8, 1);
  
  //new Track('sine', 1, 0.8, 1);
  
  const addBtn = document.getElementsByClassName('add-track')[0];
  addBtn.addEventListener('click', createTrack);

  function createTrack() {
    tracks.push(new Track('sine', 1, 0.8, 1));
    updateGlobalTrack();
  }

  function updateGlobalTrack() {
    globalTrack.setTracks(tracks);
  }

  (function initialize() {  
    tracks.push(new Track('sine', 1, 0.8, 1));
    tracks.push(new Track('square', 1, 0.8, 1));
    tracks.push(new Track('triangle', 1, 0.8, 1));
    tracks.push(new Track('sawtooth', 1, 0.8, 1));

    updateGlobalTrack();
  })();

});
