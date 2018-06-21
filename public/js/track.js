define(["audio", "visualiser"], (Audio, Visualiser) => {

    
    function Track(type, freq, amp) {
        const audio = new Audio(type, freq, amp);
        const visualiser = new Visualiser(type, freq, amp);
        let isPlaying = true;

        this.play = function() {
            if(!isPlaying) {
                audio.play();
                visualiser.play();
                isPlaying = true;
            }
        }
    
        this.pause = function() {
            if(isPlaying) {
                audio.pause();
                visualiser.pause();
                isPlaying = false;
            }
        }
    
        this.setType = function(type) {
            audio.setType(type);
            visualiser.setType(type);
        }
    
        this.setFrequency = function(frequency) {
            audio.setFrequency(frequency);
            visualiser.setFrequency(frequency);
        }
    
        this.setAmplitude = function(amplitude) {
            audio.setVolume(amplitude);
            visualiser.setAmplitude(amplitude);
        }
    };

    return Track;

});