# What's this?
Statically linked [audiowaveform](https://github.com/bbc/audiowaveform) binary that can be run in Netlify's CI pipeline to generate audio waveform visualization data to use with [wavesurfer.js](https://github.com/katspaugh/wavesurfer.js/).

# TODO
- Use json data to visualize waveform instead of preloading the audiofile.
- add multiple wavesurfer instances
  + playing one file should pause the other, sync play/pause status?
  + stretch goal, add one main player to site that loads any other audio that is played and play audio once but run the waveform in both main player and the selected player.