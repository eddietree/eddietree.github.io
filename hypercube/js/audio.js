
// D-Akebono scale - http://www.hapitones.com/virtual-hapi-drum-d-akebono.html
var g_scale_0 = [ "D3", "E3", "F3", "A3", "E4", "F4", "Bb3", "D4", "E4", "F4", "A4", "E5", "F5", "Bb4" ];


var osc = new Tone.Oscillator(440, "square");

// vibrato
//var vibrato = new Tone.LFO(6, -25, 25);
//vibrato.start();
//vibrato.connect(osc.detune);

// feedback
var feedbackDelay = new Tone.PingPongDelay("8n");
feedbackDelay.setFeedback(0.6);
osc.connect(feedbackDelay);
feedbackDelay.toMaster();	
feedbackDelay.setWet(0.8);	

// panner
var panner = new Tone.AutoPanner();
panner.toMaster();
panner.setDry(0.3);
panner.setFrequency(0.5);
osc.connect(panner);

//a lowpass filter
//var lowpass = new Tone.Filter(600, "highpass");
//osc.connect(lowpass);
//lowpass.toMaster();

// envelope
var env = new Tone.Envelope(2.5, 0.1, 0.4, 0.2);
env.connect(osc.output.gain);

//connect it to the output
//osc.setVolume(-10);
osc.toMaster();
osc.start();