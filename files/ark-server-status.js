var rq = 'https://ark-servers.net/api/?object=servers&element=detail&key=UGkfgK5PNgpdgwGmGHKGcUgflPIjqIOE9M2';
var rr = ''

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
        lastcheck = $('#last_check'),
        updated = $('#updated')
        settext(updated, lastcheck);
        setclass(is_online, data.is_online);

    if (data.is_online) {
        /* Add the corresponding line data */
        settext(players, data.players);
        settext(maxplayers, data.maxplayers);
        settext(version, data.version);
        settext(map, data.map);
        settext(last_check, data.last_check);

    }

    else {
        /* Just dont add the data I guess */
    }
}
