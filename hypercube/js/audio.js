
// C E G B
var g_scale_0 = [ 261.63, 329.63, 392.0, 493.88, 523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51, 1567.98, 1975.53, 2093.00, 2637.02, 3135.96, 3951.07 ];

var osc = new Tone.Oscillator(440, "square");

// vibrato
//var vibrato = new Tone.LFO(6, -25, 25);
//vibrato.start();
//vibrato.connect(osc.detune);

// feedback
var feedbackDelay = new Tone.PingPongDelay("8n");
feedbackDelay.setFeedback(0.7);
osc.connect(feedbackDelay);
feedbackDelay.toMaster();	
feedbackDelay.setWet(0.8);	

// panner
var panner = new Tone.AutoPanner();
panner.toMaster();
panner.setDry(0);
panner.setFrequency(2);
osc.connect(panner);

//a lowpass filter
//var lowpass = new Tone.Filter(600, "highpass");
//osc.connect(lowpass);
//lowpass.toMaster();

// envelope
var env = new Tone.Envelope(3.0, 0.1, 0.4, 0.2);
env.connect(osc.output.gain);

//connect it to the output
//osc.setVolume(-10);

osc.toMaster();
osc.start();