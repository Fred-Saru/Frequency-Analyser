define(["audio", "signal-generator", "global-generator"], (Audio, Generator, GlobalGenerator) => {

    let trackCounter = 0;
    let globalVisu;

    function Track(type, freq, amp = 1, speed = 1) {
        const publicApi = {};
        let trackId = 0;


        let isPlaying = true;
        let isGlobal = false;
        let amplitude = amp;
        let generator, audio;

        type = type.toLowerCase();
        isGlobal = type === 'global';

        initialize.apply(this);

        if (!isGlobal) {
            generator = Generator(trackCounter, type, freq, amp, speed);
            audio = Audio(type, freq, amp);
        } else {
            generator = GlobalGenerator(amp);
            globalVisu = generator;
            audio = Audio(type);
        }


        function initialize() {
            if (!isGlobal) { trackCounter++; }
            trackId = isGlobal ? 'global' : trackCounter;

            const container = document.getElementById('shelf');

            const trackHeader = document.createElement('div');
            trackHeader.setAttribute('class', 'track__header');
            trackHeader.setAttribute('data-target', `track_${trackId}`);
            trackHeader.addEventListener('click', handleTrackToggle);

            const trackName = document.createElement('span');
            trackName.setAttribute('class', 'track__header-name')
            trackName.innerText = `Track ${trackId}`;
            trackHeader.appendChild(trackName);

            if (!isGlobal) {
                const trackDelete = document.createElement('button');
                trackDelete.setAttribute('type', 'button');
                trackDelete.setAttribute('class', 'track__delete-btn');
                trackDelete.addEventListener('click', handleDeleteTrack);

                trackDelete.appendChild(generateIcon('icon-close'));
                trackHeader.appendChild(trackDelete);
            }

            const trackDiv = document.createElement('div');
            trackDiv.setAttribute('class', 'track__body');
            trackDiv.id = `track_${trackId}`;

            const controlDiv = document.createElement('div');
            controlDiv.setAttribute('class', 'control');

            if (!isGlobal) {
                const btnGroup = document.createElement('div');
                btnGroup.setAttribute('class', 'btn-group');

                const playBtn = document.createElement('button');
                playBtn.addEventListener('click', (event) => { handlePlayBtnClick.call(this, event); });
                playBtn.appendChild(generateIcon('icon-pause'));

                const waveGroup = document.createElement('div');
                waveGroup.setAttribute('class', 'wave-group');

                const sineBtn = document.createElement('button');
                sineBtn.setAttribute('class', 'active');
                sineBtn.setAttribute('data-wave', 'sine');
                sineBtn.addEventListener('click', handleTypeChange);
                sineBtn.appendChild(generateIcon('icon-sine'));

                const squareBtn = document.createElement('button');
                squareBtn.setAttribute('data-wave', 'square');
                squareBtn.addEventListener('click', handleTypeChange);
                squareBtn.appendChild(generateIcon('icon-square'));

                const triangleBtn = document.createElement('button');
                triangleBtn.setAttribute('data-wave', 'triangle');
                triangleBtn.addEventListener('click', handleTypeChange);
                triangleBtn.appendChild(generateIcon('icon-triangle'));

                const sawtoothBtn = document.createElement('button');
                sawtoothBtn.setAttribute('data-wave', 'sawtooth');
                sawtoothBtn.addEventListener('click', handleTypeChange);
                sawtoothBtn.appendChild(generateIcon('icon-sawtooth'));

                waveGroup.appendChild(sineBtn);
                waveGroup.appendChild(squareBtn);
                waveGroup.appendChild(triangleBtn);
                waveGroup.appendChild(sawtoothBtn);

                btnGroup.appendChild(playBtn);
                btnGroup.appendChild(waveGroup);

                controlDiv.appendChild(btnGroup);
            }

            const sliders = document.createElement('div');
            sliders.setAttribute('class', 'slider__container');

            const volBlock = document.createElement('div');
            volBlock.setAttribute('class', 'slider');
            const volTitle = document.createElement('span');
            volTitle.setAttribute('class', 'slider__title');
            volTitle.innerText = "Volume";
            const volSlider = document.createElement('input');
            volSlider.id = `vol_slider_${trackId}`;
            volSlider.setAttribute('class', 'slider__range');
            volSlider.setAttribute('type', 'range');
            volSlider.setAttribute('min', '0');
            volSlider.setAttribute('max', '100');
            volSlider.setAttribute('value', (amp * 100).toString());
            volSlider.setAttribute('orient', 'vertical');
            volSlider.addEventListener('click', (event) => { handleVolumeChange.call(this, event.currentTarget); });
            volSlider.addEventListener('mousedown', (event) => { activateVolumeChange.call(this, event); });

            const volInput = document.createElement('input');
            volInput.id = `vol_input_${trackId}`;
            volInput.setAttribute('class', 'slider__input');
            volInput.setAttribute('type', 'number');
            volInput.setAttribute('min', '0');
            volInput.setAttribute('max', '100');
            volInput.setAttribute('value', (amp * 100).toString());
            volInput.addEventListener('change', (event) => { handleVolumeChange.call(this, event.currentTarget); });

            volBlock.appendChild(volTitle);
            volBlock.appendChild(volSlider);
            volBlock.appendChild(volInput);

            sliders.appendChild(volBlock);

            if (!isGlobal) {

                const freqBlock = document.createElement('div');
                freqBlock.setAttribute('class', 'slider')
                const freqTitle = document.createElement('span');
                freqTitle.setAttribute('class', 'slider__title');
                freqTitle.innerText = "Frequency";
                const freqSlider = document.createElement('input');
                freqSlider.id = `freq_slider_${trackId}`;
                freqSlider.setAttribute('class', 'slider__range');
                freqSlider.setAttribute('type', 'range');
                freqSlider.setAttribute('min', '0');
                freqSlider.setAttribute('max', '100');
                freqSlider.setAttribute('value', freq.toString());
                freqSlider.setAttribute('orient', 'vertical');
                freqSlider.addEventListener('click', (event) => { handleFrequenceChange.call(this, event.currentTarget); });
                freqSlider.addEventListener('mousedown', (event) => { activateFrequenceChange.call(this, event); });

                const freqInput = document.createElement('input');
                freqInput.id = `freq_input_${trackId}`;
                freqInput.setAttribute('class', 'slider__input');
                freqInput.setAttribute('type', 'number');
                freqInput.setAttribute('min', '0');
                freqInput.setAttribute('max', '100');
                freqInput.setAttribute('value', freq.toString());
                freqInput.addEventListener('change', (event) => { handleFrequenceChange.call(this, event.currentTarget); });

                freqBlock.appendChild(freqTitle);
                freqBlock.appendChild(freqSlider);
                freqBlock.appendChild(freqInput);

                sliders.appendChild(freqBlock);
            }

            const speedBlock = document.createElement('div');
            speedBlock.setAttribute('class', 'slider')
            const speedTitle = document.createElement('span');
            speedTitle.setAttribute('class', 'slider__title');
            speedTitle.innerText = "Speed";
            const speedSlider = document.createElement('input');
            speedSlider.id = `speed_slider_${trackId}`;
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
            speedInput.id = `speed_input_${trackId}`;
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

            sliders.appendChild(speedBlock);

            controlDiv.appendChild(sliders);

            const displayDiv = document.createElement("div");
            displayDiv.setAttribute('class', 'display');
            displayDiv.id = `display-track-${trackId}`;

            trackDiv.appendChild(controlDiv);
            trackDiv.appendChild(displayDiv);

            container.appendChild(trackHeader);
            container.appendChild(trackDiv);
        }

        function generateIcon(iconName) {
            const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgEl.setAttribute('viewBox', '0 0 1000 1000');

            const useEl = document.createElementNS("http://www.w3.org/2000/svg", "use");;
            useEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${iconName}`);

            svgEl.appendChild(useEl);

            return svgEl;
        }

        function handleTypeChange(event) {
            const target = event.currentTarget;
            const type = target.dataset.wave;

            document.querySelector('.active').classList.remove('active');
            target.classList.add('active');

            if (type) {
                setType(type);
            }
        }

        function handleDeleteTrack(event) {
            event.stopPropagation();
            event.preventDefault();

            document.getElementById(`track_${trackId}`).remove();
            document.querySelector(`[data-target=track_${trackId}`).remove();
            audio.stop();

            const customEvent = new CustomEvent("deletetrack", { "detail": { trackId: trackId } });
            document.dispatchEvent(customEvent);


        }

        function handleTrackToggle(event) {
            const target = event.currentTarget.dataset['target'];
            const elTarget = document.getElementById(target);

            if (elTarget.classList.contains('close')) {
                elTarget.classList.remove('close');
            } else {
                elTarget.classList.add('close');
            }
        }

        function handlePlayBtnClick(event) {
            const target = event.currentTarget;

            if (isPlaying) {
                target.querySelector('use').setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#icon-play');
                pause();
            } else {
                target.querySelector('use').setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#icon-pause');
                play();
            }
        }

        function activateVolumeChange(event) {
            const target = event.currentTarget;
            const handle = handleVolumeChange.bind(this, target);
            const remove = removeDrag.bind(this)

            target.addEventListener('mousemove', handle);
            target.addEventListener('mouseup', remove);

            function removeDrag(event) {
                const target = event.currentTarget;
                target.removeEventListener('mousemove', handle);
                target.removeEventListener('mouseup', remove);
            }
        }

        function handleVolumeChange(target) {
            setTimeout(debounceVol.bind(this), 10);

            function debounceVol() {
                const id = target.id.split('_')[2];

                document.getElementById(`vol_slider_${id}`).value = target.value;
                document.getElementById(`vol_input_${id}`).value = target.value;

                const volume = target.value / 100;
                setAmplitude(volume);
            }
        }

        function activateFrequenceChange(event) {
            const target = event.currentTarget;
            const handle = handleFrequenceChange.bind(this, target);
            const remove = removeDrag.bind(this)

            target.addEventListener('mousemove', handle);
            target.addEventListener('mouseup', remove);

            function removeDrag(event) {
                const target = event.currentTarget;
                target.removeEventListener('mousemove', handle);
                target.removeEventListener('mouseup', remove);
            }
        }

        function handleFrequenceChange(target) {
            setTimeout(debounceFreq.bind(this), 50);

            function debounceFreq() {
                const id = target.id.split('_')[2];

                document.getElementById(`freq_slider_${id}`).value = target.value;
                document.getElementById(`freq_input_${id}`).value = target.value;
                setFrequency(target.value);
            }
        }

        function activateSpeedChange(event) {
            const target = event.currentTarget;
            const handle = handleSpeedChange.bind(this, target);
            const remove = removeDrag.bind(this)

            target.addEventListener('mousemove', handle);
            target.addEventListener('mouseup', remove);

            function removeDrag(event) {
                const target = event.currentTarget;
                target.removeEventListener('mousemove', handle);
                target.removeEventListener('mouseup', remove);
            }
        }

        function handleSpeedChange(target) {
            setTimeout(debounceSpeed.bind(this), 100);

            function debounceSpeed() {
                const id = target.id.split('_')[2];

                document.getElementById(`speed_slider_${id}`).value = target.value;
                document.getElementById(`speed_input_${id}`).value = target.value;
                setSpeed(target.value);
            }
        }

        function play() {
            if (!isPlaying) {
                audio.play();
                generator.setAmplitude(amplitude);
                isPlaying = true;
                globalVisu.refresh();
            }
        }

        function pause() {
            if (isPlaying) {
                audio.pause();
                generator.setAmplitude(0);
                isPlaying = false;
                globalVisu.refresh();
            }
        }

        function getSignalFunction() {
            return generator.getSignalFunction();
        }

        function getTrackId() {
            return trackId;
        }

        function setType(type) {
            audio.setType(type);
            generator.setType(type);
            globalVisu.refresh();
        }

        function setFrequency(frequency) {
            audio.setFrequency(frequency);
            generator.setFrequency(frequency);
            globalVisu.refresh();
        }

        function setSpeed(speed) {
            generator.setSpeed(speed);
        }

        function setAmplitude(amp) {
            if (!isGlobal) { 
                audio.setVolume(amp); 
            } else {
                audio.setMasterVolume(amp);
            }
            generator.setAmplitude(amp);
            amplitude = amp;
            globalVisu.refresh();
        }

        function setTracks(tracks) {
            generator.setTracks(tracks);
        }

        if (!isGlobal) {
            publicApi.setType = setType;
            publicApi.setFrequency = setFrequency;
        } else {
            publicApi.setTracks = setTracks;
        }

        publicApi.setAmplitude = setAmplitude;
        publicApi.setSpeed = setSpeed;
        publicApi.getSignalFunction = getSignalFunction;
        publicApi.getTrackId = getTrackId;

        return publicApi;
    };

    return Track;

});