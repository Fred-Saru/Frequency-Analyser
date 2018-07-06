define(["audio", "visualiser"], (Audio, Visualiser) => {

    let trackCounter = 0;

    function Track(type, freq, amp = 1, speed = 1) {
        let isPlaying = true;
        let amplitude = amp;

        initialize.apply(this);
        const visualiser = new Visualiser(trackCounter, type, freq, amp, speed);
        const audio = new Audio(type, freq, amp);
        

        // Private Methods  

        function initialize() {
            trackCounter += 1;
            const container = document.getElementById('shelf');
            
            const trackDiv = document.createElement('div');
            trackDiv.setAttribute('class', 'track');
            trackDiv.id = `track${trackCounter}`;

            const controlDiv = document.createElement('div');
            controlDiv.setAttribute('class', 'control');
            
            const btnGroup = document.createElement('div');
            btnGroup.setAttribute('class', 'btn-group');

            const playBtn = document.createElement('button');
            playBtn.innerText = "II";
            playBtn.addEventListener('click', (event) => { handlePlayBtnClick.apply(this, event); });

            const optionBtn = document.createElement('button');
            optionBtn.innerText = "O";

            btnGroup.appendChild(playBtn);
            btnGroup.appendChild(optionBtn);

            const sliders = document.createElement('div');
            sliders.setAttribute('class', 'slider');

            const volBlock = document.createElement('div');
            const volSlider = document.createElement('input');
            volSlider.setAttribute('class', 'slider__range');
            volSlider.setAttribute('type', 'range');
            volSlider.setAttribute('min', '0');
            volSlider.setAttribute('max', '100');
            volSlider.setAttribute('value', (amp * 100).toString());
            volSlider.setAttribute('orient', 'vertical');
            volSlider.addEventListener('click', (event) => { handleVolumeChange.call(this, event.currentTarget); });
            volSlider.addEventListener('mousedown', (event) => { activateVolumeChange.call(this, event); });

            const volInput = document.createElement('input');
            volInput.setAttribute('class', 'slider__input');
            volInput.setAttribute('type', 'number');
            volInput.setAttribute('min', '0');
            volInput.setAttribute('max', '100');
            volInput.setAttribute('value', (amp * 100).toString());
            volInput.addEventListener('change', (event) => { handleVolumeChange.call(this, event.currentTarget); });

            volBlock.appendChild(volSlider);
            volBlock.appendChild(volInput);

            const freqBlock = document.createElement('div');
            const freqSlider = document.createElement('input');
            freqSlider.setAttribute('class', 'slider__range');
            freqSlider.setAttribute('type', 'range');
            freqSlider.setAttribute('min', '0');
            freqSlider.setAttribute('max', '100');
            freqSlider.setAttribute('value', freq.toString());
            freqSlider.setAttribute('orient', 'vertical');
            freqSlider.addEventListener('click', (event) => { handleFrequenceChange.call(this, event.currentTarget); });
            freqSlider.addEventListener('mousedown', (event) => { activateFrequenceChange.call(this, event); });

            const freqInput = document.createElement('input');
            freqInput.setAttribute('class', 'slider__input');
            freqInput.setAttribute('type', 'number');
            freqInput.setAttribute('min', '0');
            freqInput.setAttribute('max', '100');
            freqInput.setAttribute('value', freq.toString());
            freqInput.addEventListener('change', (event) => { handleFrequenceChange.call(this, event.currentTarget); });

            freqBlock.appendChild(freqSlider);
            freqBlock.appendChild(freqInput);

            const speedBlock = document.createElement('div');
            const speedSlider = document.createElement('input');
            speedSlider.setAttribute('class', 'slider__range');
            speedSlider.setAttribute('type', 'range');
            speedSlider.setAttribute('min', '0');
            speedSlider.setAttribute('max', '100');
            speedSlider.setAttribute('step', '0.1');
            speedSlider.setAttribute('value', speed.toString());
            speedSlider.setAttribute('orient', 'vertical');
            speedSlider.addEventListener('click', (event) => { handleSpeedChange.call(this, event.currentTarget); });
            speedSlider.addEventListener('mousedown', (event) => { activateSpeedChange.call(this, event); });

            const speedInput = document.createElement('input');
            speedInput.setAttribute('class', 'slider__input');
            speedInput.setAttribute('type', 'number');
            speedInput.setAttribute('min', '0');
            speedInput.setAttribute('max', '100');
            speedInput.setAttribute('step', '0.1');
            speedInput.setAttribute('value', speed.toString());
            speedInput.addEventListener('change', (event) => { handleSpeedChange.call(this, event.currentTarget); });

            speedBlock.appendChild(speedSlider);
            speedBlock.appendChild(speedInput);

            sliders.appendChild(volBlock);
            sliders.appendChild(freqBlock);
            sliders.appendChild(speedBlock);

            controlDiv.appendChild(btnGroup);
            controlDiv.appendChild(sliders);

            const displayDiv = document.createElement("div");
            displayDiv.setAttribute('class', 'display');
            displayDiv.id = `display-track${trackCounter}`;

            trackDiv.appendChild(controlDiv);
            trackDiv.appendChild(displayDiv);

            container.appendChild(trackDiv);
        }

        function handlePlayBtnClick(event) {
            isPlaying ? this.pause(): this.play();
        }

        function activateVolumeChange(event) {
            const target = event.currentTarget;
            const handle = handleVolumeChange.bind(this, target);
            const remove = removeDrag.bind(this)

            target.addEventListener('mousemove', handle);
            target.addEventListener('mouseup',remove);   

            function removeDrag(event) {
                const target = event.currentTarget;
                target.removeEventListener('mousemove', handle);
                target.removeEventListener('mouseup', remove);
            }
        }

        function handleVolumeChange(target) {
            const volume = target.value / 100;
            this.setAmplitude(volume);
        }

        function activateFrequenceChange(event) {
            const target = event.currentTarget;
            const handle = handleFrequenceChange.bind(this, target);
            const remove = removeDrag.bind(this)

            target.addEventListener('mousemove', handle);
            target.addEventListener('mouseup',remove);   

            function removeDrag(event) {
                const target = event.currentTarget;
                target.removeEventListener('mousemove', handle);
                target.removeEventListener('mouseup', remove);
            }
        }

        function handleFrequenceChange(target) {
            this.setFrequency(target.value);
        }

        function activateSpeedChange(event) {
            const target = event.currentTarget;
            const handle = handleSpeedChange.bind(this, target);
            const remove = removeDrag.bind(this)

            target.addEventListener('mousemove', handle);
            target.addEventListener('mouseup',remove);   

            function removeDrag(event) {
                const target = event.currentTarget;
                target.removeEventListener('mousemove', handle);
                target.removeEventListener('mouseup', remove);
            }
        }

        function handleSpeedChange(target) {
            this.setSpeed(target.value);
        }


        // Public Methods

        this.play = function() {
            if(!isPlaying) {
                audio.play();
                visualiser.setAmplitude(amplitude);
                isPlaying = true;
            }
        }
    
        this.pause = function() {
            if(isPlaying) {
                audio.pause();
                visualiser.setAmplitude(0);
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

        this.setSpeed = function(speed) {
            visualiser.setSpeed(speed);
        }
    
        this.setAmplitude = function(amp) {
            audio.setVolume(amp);
            visualiser.setAmplitude(amp);
            amplitude = amp;
        }
    };

    return Track;

});