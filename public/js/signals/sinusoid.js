define(() => {

    function Sinusoid(id, freq, amp = 1, speed = 1) {
        let frequency = freq;
        let amplitude = amp;
        let parseSpeed = speed;
        const radDegRatio = Math.PI / 180;

        const parent = document.getElementById(`display-track${id}`);

        // Signal Canvas
        const signalCanvas = document.createElement('canvas');
        signalCanvas.id = "cSignal";
        signalCanvas.setAttribute('width', parent.getBoundingClientRect().width - 20);
        signalCanvas.setAttribute('height', 150);

        parent.appendChild(signalCanvas);
        const signalOrigin = { x: 10, y: 0.5 * signalCanvas.height };
        const signalContext = signalCanvas.getContext('2d');
        const signalFunction = function (t) {
            return (amplitude * signalOrigin.y) * (Math.sin(t * frequency * radDegRatio) + Math.sin(t * (frequency*3) * radDegRatio));
        }

        // Circular canvas
        const circularCanvas = document.createElement('canvas');
        circularCanvas.id = "cCircular";
        circularCanvas.setAttribute('width', 300);
        circularCanvas.setAttribute('height', 300);
        parent.appendChild(circularCanvas);
        const circularOrigin = { x: 0.5 * circularCanvas.width, y: 0.5 * circularCanvas.height };
        const circularContext = circularCanvas.getContext('2d');
        const circularFunction = function (t) {
            return (amplitude * circularOrigin.y) * (Math.sin(t * frequency) + Math.sin(t * (frequency*3)));
        }

        // Frequency canvas
        const freqCanvas = document.createElement('canvas');
        freqCanvas.id = "cFreq";
        freqCanvas.setAttribute('width', parent.getBoundingClientRect().width - circularCanvas.width - 20);
        freqCanvas.setAttribute('height', 300);
        parent.appendChild(freqCanvas);
        const freqOrigin = { x: 10, y: 0.5 * freqCanvas.height };
        const freqContext = freqCanvas.getContext('2d');
        const freqFunction = function (t) {
            return (amplitude * circularOrigin.y) * Math.sin(t);
        }


        drawSignal();
        drawCircle();
        drawFrequencies();

        this.setAmplitude = function (amp) {
            amplitude = amp;
            drawSignal();
            drawCircle();
            drawFrequencies();
        }

        this.setFrequency = function (freq) {
            frequency = freq;
            drawSignal();
            drawCircle();
            drawFrequencies();
        }

        this.setSpeed = function (speed) {
            parseSpeed = speed;
            drawCircle();
        }

        function clearCanvas(context, canvas) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

        function showAxes(context, canvas, origin) {
            context.beginPath();
            context.lineWidth = 1;
            context.strokeStyle = "grey";
            context.moveTo(0, origin.y);
            context.lineTo(canvas.width, origin.y);
            context.moveTo(origin.x, 0);
            context.lineTo(origin.x, canvas.height);
            context.stroke();
        }

        function showSine() {
            const dx = 0.01;
            const iMin = 0;
            const iMax = Math.round((signalCanvas.width - signalOrigin.x) / dx);

            signalContext.beginPath();
            signalContext.lineWidth = 2;
            signalContext.strokeStyle = "orange";
            for (let i = iMin; i < iMax; i++) {
                const x = dx * i;
                const y = signalFunction(x);
                if (i === iMin) {
                    signalContext.moveTo(signalOrigin.x + x, signalOrigin.y - y);
                } else {
                    signalContext.lineTo(signalOrigin.x + x, signalOrigin.y - y);
                }
            }
            signalContext.stroke();
        }

        function showCircle() {
            const dTheta = 0.001;

            circularContext.beginPath();
            circularContext.lineWidth = 1;
            circularContext.strokeStyle = "orange";

            for (let theta = 0; theta <= Math.PI * 2; theta += dTheta) {

                const r = circularFunction(theta);
                const x = r * Math.cos(parseSpeed * theta);
                const y = r * Math.sin(parseSpeed * theta);

                if (theta === 0) {
                    circularContext.moveTo(circularOrigin.x - x, circularOrigin.y - y);
                } else {
                    circularContext.lineTo(circularOrigin.x - x, circularOrigin.y - y);
                }

            }
            circularContext.stroke();
        }

        function showFrequencies() {
            const dTheta = 0.01;
            const fMin = 0;
            const fMax = Math.round(freqCanvas.width - freqOrigin.x);
            const dFreq = fMax / 100;
            const pointCount = ((Math.PI * 2) / dTheta) * 100;

            freqContext.beginPath();
            freqContext.lineWidth = 2;
            freqContext.strokeStyle = "orange";

            for (let s = 0; s <= fMax; s++) {
                let result = 0;
                const rs = (s*100) / fMax;
                for (let theta = 0; theta <= Math.PI * 2; theta += dTheta) {    

                        result +=circularFunction(theta) * Math.sin(rs * theta);
                }
                
                const x = s;
                const y = (result / pointCount) * (freqOrigin.y * 0.5);
                console.log({s: s, y: y});

                if (s == 0) {
                    freqContext.moveTo(freqOrigin.x + x, freqOrigin.y - y);
                } else {
                    freqContext.lineTo(freqOrigin.x + x, freqOrigin.y - y);
                }
            }

            freqContext.stroke();
        }

        function drawSignal() {
            clearCanvas(signalContext, signalCanvas);
            showAxes(signalContext, signalCanvas, signalOrigin);
            showSine();
        }

        function drawCircle() {
            clearCanvas(circularContext, circularCanvas);
            showAxes(circularContext, circularCanvas, circularOrigin);
            showCircle();
        }

        function drawFrequencies() {
            clearCanvas(freqContext, freqCanvas);
            showAxes(freqContext, freqCanvas, freqOrigin);
            showFrequencies();
        }
    }

    return Sinusoid;
});