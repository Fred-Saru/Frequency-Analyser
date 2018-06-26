define(["signals/sinusoid"], (Sinusoid) => {

    function Visualiser(id, type, frequency, amplitude = 1 ) {
        if(!type || !frequency || !id) {
            throw `The id, waveform and frequence are mandatory.`;
        }

        type = type.toLowerCase();

        if(type !== 'sine' && type !== 'triangle' && type != 'square' && type != 'sawtooth') {
            throw `The waveform can be of the following type: sine, square, triangle or sawtooth.`;
        }

        let curve;

        switch(type) {
            case 'sine': 
                curve = new Sinusoid(id, frequency, amplitude);
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