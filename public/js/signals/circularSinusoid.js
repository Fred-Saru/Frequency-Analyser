define(() => {

    function Sinusoid(id, freq, amp, speed) {
        const parent = document.getElementById(`display-track${id}`);
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', 500);
        canvas.setAttribute('height', 500);
        parent.appendChild(canvas);

        const origin = { x: 0.5 * canvas.width, y: 0.5 * canvas.height };

        const context = canvas.getContext('2d');
        
        let frequency = freq;
        let amplitude = amp;
        let parseSpeed = speed;

        showAxes();
        showCircle();

        this.setAmplitude = function (amp) {
            amplitude = amp;
            clearCanvas();
            showAxes();
            showCircle();
        }

        this.setFrequency = function (freq) {
            frequency = freq;
            clearCanvas();
            showAxes();
            showCircle();
        }

        this.setSpeed = function (speed) {
            parseSpeed = speed;
            clearCanvas();
            showAxes();
            showCircle();
        }

        function clearCanvas() {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    
        function showAxes() {
            context.beginPath();
            context.lineWidth = 1;
            context.strokeStyle = "grey";
            context.moveTo(0, origin.y);
            context.lineTo(canvas.width, origin.y);
            context.moveTo(origin.x, 0);
            context.lineTo(origin.x, canvas.height);
            context.stroke();
        }
    
        function showCircle() {

            const dTheta = 0.001;
            
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "orange";

            for(let theta = 0; theta <= Math.PI * 2; theta += dTheta) {
                
                const r = (amplitude * canvas.height * 0.5) * Math.sin(frequency * theta);
                const x = r * Math.cos(parseSpeed * theta);
                const y = r * Math.sin(parseSpeed * theta);

                if(theta === 0) {
                    context.moveTo(origin.x - x, origin.y - y);
                } else {
                    context.lineTo(origin.x - x, origin.y - y);
                }

            }
            context.stroke();
        }
    }

    return Sinusoid;
});