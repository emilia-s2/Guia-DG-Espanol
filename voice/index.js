'use strict';

const { exec } = require('child_process');

function format_message(message) {
	const unescape_map = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&#039;': "'"
	};
	message = message.toLowerCase();
	for (const [key, value] of Object.entries(unescape_map)) {
		message = message.replace(new RegExp(key, 'g'), value);
	}
	for (const value of ['<-','->','<','>']) {
		message = message.replace(new RegExp(value, 'g'), ' ');
	}
	return message;
}

exports.speak = function(message, rate) {
	const command =
		'powershell.exe Add-Type -AssemblyName System.speech; ' +
		'$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer; ' +
		'$speak.Rate = ' + rate + '; ' +
		'[Console]::InputEncoding = [System.Text.Encoding]::UTF8; ' +
		'$speak.Speak([Console]::In.ReadToEnd()); ' + 
		'exit'
	;
	exec(command).stdin.end(format_message(message));
};