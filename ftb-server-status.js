var rq = 'https://mcapi.us/server/status?ip=gasplund.mc-server.net';

var error = 'unknown';

var classes = {
	error: "fa-question",
	false: "fa-times",
	true: "fa-check",
};

var allclasses = "";
	for(i in classes) {
	allclasses += ' '+classes[i];
};

function q(addr, cb) {
	$.ajax({
	url: rq,
	type: 'GET',
	dataType: 'json',
	data: {ip: addr, players: true},
})

.done(function(data) {
	console.log("success");
	console.log(data);
	cb(data);
})

.fail(function(data) {
	console.log("error");
})

.always(function() {
});}

function setclass(o, c) {
	o.removeClass(allclasses);
	o.addClass(classes[c]);
	o.html('');
}

function settext(o, t) {
	o.removeClass(allclasses);
	o.html(t);
}

function display(data) {
	var
		playersnow = $('#playersnow'),
		playersmax = $('#playersmax'),
		version = $('#version'),
		online = $('#online'),
		status = $('#status'),
		updated = $('#updated'),
		d = new Date(data.last_updated*1000);
		moment.locale('*');
		
		setclass(online, data.online);

	if (data.online) {
		settext(playersnow, data.players.now);
		settext(playersmax, data.players.max);
		settext(version, data.server.name);
		settext(status, data.status);
	}

	else {
		setclass(playersnow, error);
		setclass(playersmax, error);
		setclass(version, error);
		setclass(status, error);
	}
}

$(document).ready(function() {
	q('//lentium.xyz', display);
});
