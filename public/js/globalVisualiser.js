define(["signals/sinusoid"], (Sinusoid) => {

    function globalVisualiser(amp) {
        let tracks;
        let sine;
        let amplitude = amp;

        const globalTrackFn = function (o, t) {
            if (!tracks) { return 0; }

            const result = tracks.reduce(function trackAccumulator(acc, track, idx) {
                acc.r += track.getSignalFunction()(o, t);
                return acc;
            }, { o: o, t: t, r: 0 });
            return amplitude * result.r;
        };

        (function initialize() {
            sine = new Sinusoid('global', globalTrackFn, 1);
        })();

        this.setTracks = function (newTracks) {
            tracks = newTracks;
            sine.refresh();
        }

        this.setAmplitude = function (amp) {
            amplitude = +amp;
            sine.refresh();
        }

        this.setSpeed = function (speed) {
            sine.setSpeed(speed);
        }

        this.refresh = function() {
            sine.refresh();
        }
    }

    return globalVisualiser;
});