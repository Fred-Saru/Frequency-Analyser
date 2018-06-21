define(["signals/sinusoid"], (Sinusoid) => {

    function Visualiser(type, frequency, amplitude = 1 ) {
        if(!type || !frequency) {
            throw `The waveform and frequence are mandatory.`;
        }

        type = type.toLowerCase();

        if(type !== 'sine' && type !== 'triangle' && type != 'square' && type != 'sawtooth') {
            throw `The waveform can be of the following type: sine, square, triangle or sawtooth.`;
        }

        let curve;

        switch(type) {
            case 'sine': 
                curve = new Sinusoid(frequency, amplitude);
            break;
        }

        this.setAmplitude = function (amplitude) {
            curve.setAmplitude(amplitude);
        }
    
        this.setFrequency = function (frequency) {
            curve.setFrequency(frequency);
        }
    
        this.setType = function (type) {
    
        }
    }

    return Visualiser;

});