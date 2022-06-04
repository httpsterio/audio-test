#!/bin/bash
#./bin/audiowaveform -i funkytest.wav -o funky.json -z 256 -b 8
files=( audio1 audio2 )
for audiofile in "${files[@]}"
do
  ./bin/audiowaveform -i audio/$audiofile.mp3 -o audio/$audiofile.json -z 256 -b 8
done