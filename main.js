'use strict';

// Create an instance
let wavesurfer = {};

let audioFiles = [
    {
        "src": "http://localhost:8000/audio1.mp3"
    },
    {
        "src": "http://localhost:8000/audio2.mp3"
    }
]

// Init & load audio file
document.addEventListener('DOMContentLoaded', function() {

    let wavesurferList = [];
    audioFiles.forEach((f, i) => {
        // Div which contains all wave components
        let root = document.getElementById('waveforms');
        
        let wavesurferComponent = getWavesurferComponent(f, i);
    
        /*
            Objects are collected so that their methods can be called.
            Since they are generated at the same time, component id should match the position of the wavesurfer object.
            For example user has clicked the play/pause button of the first audio, so the component should have id wf-0,
            and the correspondent wavesurfer should be at index 0 in wavesurferList
        */
        wavesurferList.push(wavesurferComponent[1]);

        root.appendChild(wavesurferComponent[0]);
    });

    document.getElementById('demo').onclick = (event) => {
        if (event.target.nodeName == "BUTTON") {
            // Find the wavesurfer element from sibling nodes
            event.target.parentNode.childNodes.forEach((elem) => {
                let hasClassWaveform = false;

                // Class name is used to determine if this node contains the wavesurfer
                for (let i=0; i < elem.classList.length; i++) {
                    if (elem.classList[i] == 'waveform') {
                        hasClassWaveform = true
                    }
                }

                // Wavesurfer found, now toggle playing
                if (hasClassWaveform) {

                    let idInd = elem.id.split('-')[1];

                    // Pause all the other audio files and toggle play/pause for the clicked one
                    for (let i=0; i < wavesurferList.length; i++) {

                        // This wavesurfer is from the component which has the button user has clicked
                        if (i == idInd) {
                            wavesurferList[i].playPause();
                        } else {
                            // Not the one user has toggled, pause it
                            wavesurferList[i].pause();
                        }
                    }
                }
            })
        }
    }
});

/**
 * @param {*} audioFile 
 * @param {*} index Used to form id which is used to determine which audio file should be played
 * @returns an array containing a wavesurfer component for html and a wavesurfer object for handling audio file
 */
function getWavesurferComponent(audioFile, index) {
    // Return value
    let ret = [];

    // Root element for this component
    let waveformRoot = document.createElement('div');

    // Should contain wavesurfer object
    let waveformElement = document.createElement('div');

    waveformElement.id = `wf-${index}`;
    waveformElement.classList.add('waveform');

    wavesurfer = WaveSurfer.create({
        container: waveformElement,
        waveColor: '#D9DCFF',
        progressColor: '#4353FF',
        cursorColor: '#4353FF',
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 1,
        height: 200,
        barGap: 3
    });

    wavesurfer.on('error', function(e) {
        console.warn(e);
    });

    // Load audio from URL
    wavesurfer.load(`${audioFile.src}`);

    // Play button
    let playButtonElement = document.createElement('button');
    playButtonElement.innerHTML = 'Play / Pause';

    waveformRoot.appendChild(waveformElement);
    waveformRoot.appendChild(playButtonElement);

    ret.push(waveformRoot);
    ret.push(wavesurfer);

    return ret
}