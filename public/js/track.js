define(["audio", "visualiser"], (Audio, Visualiser) => {

    let trackCounter = 0;

    function Track(type, freq, amp) {
        let isPlaying = true;
        let amplitude = amp;

        initialize.apply(this);
        const visualiser = new Visualiser(trackCounter, type, freq, amp);
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
            const volInput = document.createElement('input');
            volInput.setAttribute('class', 'slider__range');
            volInput.setAttribute('type', 'range');
            volInput.setAttribute('min', '0');
            volInput.setAttribute('max', '100');
            volInput.setAttribute('value', (amp * 100).toString());
            volInput.setAttribute('orient', 'vertical');
            volInput.addEventListener('click', (event) => { handleVolumeChange.call(this, event.currentTarget); });
            volInput.addEventListener('mousedown', (event) => { activateVolumeChange.call(this, event); });

            const freqInput = document.createElement('input');
            freqInput.setAttribute('class', 'slider__range');
            freqInput.setAttribute('type', 'range');
            freqInput.setAttribute('min', '0');
            freqInput.setAttribute('max', '20000');
            freqInput.setAttribute('value', freq.toString());
            freqInput.setAttribute('orient', 'vertical');
            freqInput.addEventListener('click', (event) => { handleFrequenceChange.call(this, event.currentTarget); });
            freqInput.addEventListener('mousedown', (event) => { activateFrequenceChange.call(this, event); });

            sliders.appendChild(volInput);
            sliders.appendChild(freqInput);

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
    
        this.setAmplitude = function(amp) {
            audio.setVolume(amp);
            visualiser.setAmplitude(amp);
            amplitude = amp;
        }
    };

    return Track;

});