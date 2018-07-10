define(["signals/sinusoid"], (Sinusoid) => {

    function Visualiser(id, type, freq, amp = 1, speed = 1) {
        if (!type || !freq || !id) {
            throw `The id, waveform and frequence are mandatory.`;
        }

        type = type.toLowerCase();

        if (type !== 'sine' && type !== 'triangle' && type != 'square' && type != 'sawtooth') {
            throw `The waveform can be of the following type: sine, square, triangle or sawtooth.`;
        }

        let amplitude = amp;
        let frequency = freq;
        let sine, signalFn;

        signalFn = getSignalFunction(type);
        sine = new Sinusoid(id, signalFn, speed);

        this.setAmplitude = function (amp) {
            amplitude = +amp;
            sine.refresh();
        }

        this.setFrequency = function (freq) {
            frequency = +freq;
            sine.refresh();
        }

        this.setSpeed = function (speed) {
            sine.setSpeed(speed);
        }

        this.setType = function (typ) {
            typ = typ.toLowerCase();

            if (typ !== 'sine' && typ !== 'triangle' && typ != 'square' && typ != 'sawtooth') {
                throw `The waveform can be of the following type: sine, square, triangle or sawtooth.`;
            }

            signalFn = getSignalFunction(typ);
            sine.setSignalFunction(signalFn);
        }

        this.getSignalFunction = function() {
            return signalFn;
        }

        function getSignalFunction(typ) {
            switch (type) {
                case 'sine':
                    return function sinusFn(o, t) {
                        return (amplitude * o) * Math.sin(t * frequency);
                    }
                case 'square':
                    return function squareFn(o, t) {
                        const val = Math.sin(t * frequency);

                        return (amplitude * o) * (val > 0 ? 1 : -1);
                    }
                case 'triangle':
                    return function triangleFn(o, t) {
                        const val = t * frequency;
                        return (amplitude * o) * (2 * Math.asin(Math.sin(val))) / Math.PI;
                    }
                case 'sawtooth':
                    return function sawtoothFn(o, t) {
                        const val = frequency * t;
                        const coef = Math.PI;
                        return (amplitude * o) * ((val + coef) % (coef * 2) - coef) / coef;
                    }
            }
        }

    }
    return Visualiser;
});