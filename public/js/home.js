requirejs(["track"], function (Track) {

  let tracks = [];
  let globalTrack = new Track('global', 1, 0.35, 1);
  
  const addBtn = document.getElementsByClassName('add-track')[0];
  addBtn.addEventListener('click', createTrack);

  document.addEventListener('deletetrack', deleteTrack);

  function deleteTrack(event) {
    const trackId = event.detail.trackId;
    const idx = tracks.findIndex((track) => track.getTrackId() === trackId);
    tracks.splice(idx, 1);
    updateGlobalTrack();
  }

  function createTrack() {
    tracks.push(Track('sine', 1, 0.8, 1));
    updateGlobalTrack();
  }

  function updateGlobalTrack() {
    globalTrack.setTracks(tracks);
  }

  (function initialize() {  
    tracks.push(Track('sine', 1, 0.8, 1));
    tracks.push(Track('square', 1, 0.8, 1));
    tracks.push(Track('triangle', 1, 0.8, 1));
    tracks.push(Track('sawtooth', 1, 0.8, 1));

    updateGlobalTrack();
  })();

});
