var rq = 'https://ark-servers.net/api/?object=servers&element=detail&key=UGkfgK5PNgpdgwGmGHKGcUgflPIjqIOE9M2';

var error = 'unknown';

var classes = {
	error: "fa-question",
	0: "fa-times",
	1: "fa-check",
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
		console.log(data);
		cb(data);
	})

	.fail(function(data) {
		console.log("error");
	})

	.always(function() {
	});
}

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
		is_online = $('#online'),
		players = $('#players'),
		maxplayers = $('#maxplayers'),
		version = $('#version'),
	    	map = $('#map'),
		last_check = $('#lastcheck'),
		updated = $('#updated'),
		d = new Date(data.last_updated*1000);
		moment.locale('*');
		settext(updated, moment(d).fromNow());
		setclass(is_online, data.is_online);

	if (data.is_online) {
		settext(players, data.players);
		settext(maxplayers, data.maxplayers);
		settext(version, data.version);
		settext(map, data.map);
		settext(last_check, data.last_check);
	}

	else {
		setclass(players, error);
		setclass(maxplayers, error);
		setclass(version, error);
		setclass(map, error);
		setclass(last_check, error);
	}
}

$(document).ready(function() {
	q('//lentium.xyz', display);
});
