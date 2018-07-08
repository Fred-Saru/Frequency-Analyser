requirejs(["audio", "visualiser", "track"], function (Audio, Visualiser, Track) {


  new Track('sine', 1, 0.8, 1);
  
  const addBtn = document.getElementsByClassName('add-track')[0];
  addBtn.addEventListener('click', createTrack);

  function createTrack() {
    new Track('sine', 1, 0.8, 1);
  }
});
