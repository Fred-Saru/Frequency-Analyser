requirejs(["audio", "visualiser", "track"], function(Audio, Visualiser, Track) {

        var track1 = new Track('sine', 5, 0.9, 42);
        //var track1 = new Track('sine', 50, 0.2);
        //var track1 = new Track('sine', 220, 0.2);
        //var track1 = new Track('sine', 330, 0.1);
        console.log(track1);
        // var track2 = new Track('sine', 440, 0.1);
});
