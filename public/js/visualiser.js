define(["d3", "audio", "waveform"], (d3, audio, waveform) => {

    const visualiser = {};
    let waveformVisualiser;

    function initialize() {
        const svg = d3.select('#svg');
        const width = window.innerWidth;
        const height = window.innerHeight;

        svg.attr("width", width);
        svg.attr("height", height);

        const waveformEl = svg.select(".waveform");
        waveformEl.attr("width", width);
        waveformEl.attr("height", height/2);
        waveformEl.attr("transform", "translate(0, " + height / 2 + ")");

        waveformVisualiser = waveform(waveformEl, 2048);

    }

    initialize();

    visualiser.visualise = function() {
        if(audio.isPlaying('A1')) {
            const waveArray = audio.getFloatTimeData('A1');
            waveformVisualiser(waveArray);
        }
    }

    return visualiser;

});