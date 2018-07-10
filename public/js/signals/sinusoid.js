define(() => {

    function Sinusoid(id, signalFn, speed = 1) {
        let parseSpeed = speed;
        const radDegRatio = Math.PI / 180;

        const parent = document.getElementById(`display-track-${id}`);
        const parentwidth = parent.getBoundingClientRect().width;
        // Signal Canvas
        const signalCanvas = document.createElement('canvas');
        signalCanvas.id = "cSignal";
        signalCanvas.setAttribute('width', parentwidth);
        signalCanvas.setAttribute('height', 150);

        parent.appendChild(signalCanvas);
        const signalOrigin = { x: 10, y: 0.5 * signalCanvas.height };
        const signalContext = signalCanvas.getContext('2d');
        const signalFunction = function (t) {
            return signalFn(signalOrigin.y, t * radDegRatio);
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
            return signalFn(circularOrigin.y, t);
        }

        // Frequency canvas
        const freqCanvas = document.createElement('canvas');
        freqCanvas.id = "cFreq";
        freqCanvas.setAttribute('width', parentwidth - circularCanvas.width);
        freqCanvas.setAttribute('height', 300);
        parent.appendChild(freqCanvas);
        const freqOrigin = { x: 10, y: 0.5 * freqCanvas.height };
        const freqContext = freqCanvas.getContext('2d');

        drawSignal();
        drawCircle();
        drawFrequencies();

        this.refresh = function () {
            drawSignal();
            drawCircle();
            drawFrequencies();
        }

        this.setSpeed = function (speed) {
            parseSpeed = speed;
            drawCircle();
        }

        this.setSignalFunction = function (sigFn) {
            signalFn = sigFn;
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
            signalContext.strokeStyle = "tomato";
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
            circularContext.strokeStyle = "tomato";

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
            
            const sMin = 0;
            const sMax = Math.round(freqCanvas.width - freqOrigin.x) - 20;

            const dTheta = 0.01;
            const pointCount = ((Math.PI * 2) / dTheta) * 100;

            freqContext.beginPath();
            freqContext.lineWidth = 2;
            freqContext.strokeStyle = "tomato";

            for (let speed = sMin; speed <= sMax; speed++) {
                let result = 0;
                const realSpeed = (speed*100) / sMax;

                for (let theta = 0; theta <= Math.PI * 2; theta += dTheta) {    
                    result += circularFunction(theta) * Math.sin(realSpeed * theta);
                }
                
                const x = speed;
                const y = (result / pointCount) * (freqOrigin.y * 0.5);

                if (speed == 0) {
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