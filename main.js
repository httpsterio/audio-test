'use strict';

// Create an instance
let wavesurfer = {};

// Init & load audio file
document.addEventListener('DOMContentLoaded', function() {
    wavesurfer = WaveSurfer.create({
        container: document.querySelector('#waveform'),
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
    wavesurfer.load('funkytest.wav');

    // Play button
    const button = document.querySelector('[data-action="play"]');

    button.addEventListener('click', wavesurfer.playPause.bind(wavesurfer));
});

fetch('funky.json')
.then(response => {
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    return response.json();
})
.then(peaks => {
    console.log('loaded peaks! sample_rate: ' + peaks.sample_rate);

    // load peaks into wavesurfer.js
    wavesurfer.load(mediaElt, peaks.data);
})
.catch((e) => {
    console.error('error', e);
});