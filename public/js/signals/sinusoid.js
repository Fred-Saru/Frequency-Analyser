define(() => {

    function Sinusoid(id, freq, amp) {
        const parent = document.getElementById(`display-track${id}`);
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', parent.getBoundingClientRect().width - 20);
        parent.appendChild(canvas);

        const origin = { x: 10, y: 0.5 * canvas.height };

        const context = canvas.getContext('2d');
        
        let frequency = freq;
        let amplitude = amp;

        showAxes();
        showSine();

        this.setAmplitude = function (amp) {
            amplitude = amp;
            clearCanvas();
            showAxes();
            showSine();
        }

        this.setFrequency = function (freq) {
            frequency = freq;
            clearCanvas();
            showAxes();
            showSine();
        }

        function clearCanvas() {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    
        function showAxes() {
            context.beginPath();
            context.lineWidth = 1;
            context.strokeStyle = "grey";
            context.moveTo(origin.x, origin.y);
            context.lineTo(canvas.width, origin.y);
            context.moveTo(origin.x, 0);
            context.lineTo(origin.x, canvas.height);
            context.stroke();
        }
    
        function showSine() {
            const dx = 1;
            const iMin = 0;
            const iMax = Math.round((canvas.width - origin.x) / dx);
    
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "orange";
            for(let i = iMin; i < iMax; i++) {
                const x = dx * i;
                const y = (amplitude * canvas.height * 0.5) * Math.sin(x * frequency);
                if(i === iMin) {
                    context.moveTo(origin.x + x, origin.y - y);
                } else {
                    context.lineTo(origin.x + x, origin.y - y);
                }
            }
            context.stroke();
        }
    }

    return Sinusoid;
});