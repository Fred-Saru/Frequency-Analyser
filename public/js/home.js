requirejs(["audio", "visualiser"], function(audio, visualiser) {
    (() => {
        console.log(audio);
        console.log(visualiser);

        audio.createOscillator('A1', 'sine', 220);

        drawWaveform();

        document.addEventListener('keyup', handleKeyUp)
    })();

    function drawWaveform() {
        requestAnimationFrame(drawWaveform);
        visualiser.visualise();
    }

    function handleKeyUp(event) {
        if(event.keyCode === 32 || event.which) {
            if(audio.isPlaying('A1')) {
                audio.pause('A1');
            } else {
                audio.play('A1');
            }
            
        }
    }
});
