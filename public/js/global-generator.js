define(["signal-display"], (Display) => {

    function GlobalGenerator(amp) {
        const publicApi = {};

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
            sine = Display('global', globalTrackFn, 1);
        })();

        publicApi.setTracks = function setTracks(newTracks) {
            tracks = newTracks;
            sine.refresh();
        }

        publicApi.setAmplitude = function setAmplitude(amp) {
            amplitude = +amp;
            sine.refresh();
        }

        publicApi.setSpeed = function setSpeed(speed) {
            sine.setSpeed(speed);
        }

        publicApi.refresh = function refresh() {
            sine.refresh();
        }

        return publicApi;
    }

    return GlobalGenerator;
});