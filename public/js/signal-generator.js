define(["signal-display"], (Display) => {

    function Generator(id, type, freq, amp = 1, speed = 1) {
        const publicApi = {};

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
        sine = Display(id, signalFn, speed);

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

        publicApi.setAmplitude = function setAmplitude(amp) {
            amplitude = +amp;
            sine.refresh();
        }

        publicApi.setFrequency = function setFrequency(freq) {
            frequency = +freq;
            sine.refresh();
        }

        publicApi.setSpeed = function setSpeed(speed) {
            sine.setSpeed(speed);
        }

        publicApi.setType = function setType(typ) {
            typ = typ.toLowerCase();

            if (typ !== 'sine' && typ !== 'triangle' && typ != 'square' && typ != 'sawtooth') {
                throw `The waveform can be of the following type: sine, square, triangle or sawtooth.`;
            }

            signalFn = getSignalFunction(typ);
            sine.setSignalFunction(signalFn);
            sine.refresh();
        }

        publicApi.getSignalFunction = function getSignalFunction() {
            return signalFn;
        }

        return publicApi;
    }
    
    return Generator;
});