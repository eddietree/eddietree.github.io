MIDI.Player.addListener(function(data) {
	console.log(data);
});

window.onload = function () {
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano",
		callback: function() {
			MIDI.Player.timeWarp = 1; // speed the song is played back
			MIDI.Player.loadFile("midi/ct600ad2.mid", MIDI.Player.start); // load .MIDI from base64 or binary XML request.
		}
	});

	
};