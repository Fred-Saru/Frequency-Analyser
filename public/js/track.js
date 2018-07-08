define(["audio", "visualiser"], (Audio, Visualiser) => {

    let trackCounter = 0;

    function Track(type, freq, amp = 1, speed = 1) {
        let isPlaying = true;
        let amplitude = amp;

        initialize.apply(this);
        const visualiser = new Visualiser(trackCounter, type, freq, amp, speed);
        const audio = new Audio(type, freq, amp);
        
        function initialize() {
            trackCounter += 1;
            const container = document.getElementById('shelf');
            
            const trackHeader = document.createElement('div');
            trackHeader.setAttribute('class', 'track__header');
            trackHeader.setAttribute('data-target', `track_${trackCounter}`);
            trackHeader.addEventListener('click', handleTrackToggle);

            const trackName = document.createElement('input');
            trackName.setAttribute('class', 'track__header-name')
            trackName.value = `Track ${trackCounter}`;
            trackName.addEventListener('click', nopFunction);

            trackHeader.appendChild(trackName);

            const trackDiv = document.createElement('div');
            trackDiv.setAttribute('class', 'track__body');
            trackDiv.id = `track_${trackCounter}`;

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
            sliders.setAttribute('class', 'slider__container');

            const volBlock = document.createElement('div');
            volBlock.setAttribute('class', 'slider');
            const volTitle = document.createElement('span');
            volTitle.setAttribute('class', 'slider__title');
            volTitle.innerText = "Volume";
            const volSlider = document.createElement('input');
            volSlider.id = `vol_slider_${trackCounter}`;
            volSlider.setAttribute('class', 'slider__range');
            volSlider.setAttribute('type', 'range');
            volSlider.setAttribute('min', '0');
            volSlider.setAttribute('max', '100');
            volSlider.setAttribute('value', (amp * 100).toString());
            volSlider.setAttribute('orient', 'vertical');
            volSlider.addEventListener('click', (event) => { handleVolumeChange.call(this, event.currentTarget); });
            volSlider.addEventListener('mousedown', (event) => { activateVolumeChange.call(this, event); });

            const volInput = document.createElement('input');
            volInput.id = `vol_input_${trackCounter}`;
            volInput.setAttribute('class', 'slider__input');
            volInput.setAttribute('type', 'number');
            volInput.setAttribute('min', '0');
            volInput.setAttribute('max', '100');
            volInput.setAttribute('value', (amp * 100).toString());
            volInput.addEventListener('change', (event) => { handleVolumeChange.call(this, event.currentTarget); });

            volBlock.appendChild(volTitle);
            volBlock.appendChild(volSlider);
            volBlock.appendChild(volInput);

            const freqBlock = document.createElement('div');
            freqBlock.setAttribute('class', 'slider')
            const freqTitle = document.createElement('span');
            freqTitle.setAttribute('class', 'slider__title');
            freqTitle.innerText = "Frequency";
            const freqSlider = document.createElement('input');
            freqSlider.id = `freq_slider_${trackCounter}`;
            freqSlider.setAttribute('class', 'slider__range');
            freqSlider.setAttribute('type', 'range');
            freqSlider.setAttribute('min', '0');
            freqSlider.setAttribute('max', '100');
            freqSlider.setAttribute('value', freq.toString());
            freqSlider.setAttribute('orient', 'vertical');
            freqSlider.addEventListener('click', (event) => { handleFrequenceChange.call(this, event.currentTarget); });
            freqSlider.addEventListener('mousedown', (event) => { activateFrequenceChange.call(this, event); });

            const freqInput = document.createElement('input');
            freqInput.id = `freq_input_${trackCounter}`;
            freqInput.setAttribute('class', 'slider__input');
            freqInput.setAttribute('type', 'number');
            freqInput.setAttribute('min', '0');
            freqInput.setAttribute('max', '100');
            freqInput.setAttribute('value', freq.toString());
            freqInput.addEventListener('change', (event) => { handleFrequenceChange.call(this, event.currentTarget); });

            freqBlock.appendChild(freqTitle);
            freqBlock.appendChild(freqSlider);
            freqBlock.appendChild(freqInput);

            const speedBlock = document.createElement('div');
            speedBlock.setAttribute('class', 'slider')
            const speedTitle = document.createElement('span');
            speedTitle.setAttribute('class', 'slider__title');
            speedTitle.innerText = "Speed";
            const speedSlider = document.createElement('input');
            speedSlider.id = `speed_slider_${trackCounter}`;
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
            speedInput.id = `speed_input_${trackCounter}`;
            speedInput.setAttribute('class', 'slider__input');
            speedInput.setAttribute('type', 'number');
            speedInput.setAttribute('min', '0');
            speedInput.setAttribute('max', '100');
            speedInput.setAttribute('step', '0.1');
            speedInput.setAttribute('value', speed.toString());
            speedInput.addEventListener('change', (event) => { handleSpeedChange.call(this, event.currentTarget); });

            speedBlock.appendChild(speedTitle);
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

            container.appendChild(trackHeader);
            container.appendChild(trackDiv);
        }

        function handleTrackToggle(event) {
            const target = event.currentTarget.dataset['target'];
            const elTarget = document.getElementById(target);

            if(elTarget.classList.contains('close')) {
                elTarget.classList.remove('close');
            } else {
                elTarget.classList.add('close');
            }
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
            const id = target.id.split('_')[2];

            document.getElementById(`vol_slider_${id}`).value = target.value;
            document.getElementById(`vol_input_${id}`).value = target.value;

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
            const id = target.id.split('_')[2];

            document.getElementById(`freq_slider_${id}`).value = target.value;
            document.getElementById(`freq_input_${id}`).value = target.value;
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
            const id = target.id.split('_')[2];
            
            document.getElementById(`speed_slider_${id}`).value = target.value;
            document.getElementById(`speed_input_${id}`).value = target.value;
            this.setSpeed(target.value);
        }

        function nopFunction(event) {
            event.stopPropagation();
            event.preventDefault();
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