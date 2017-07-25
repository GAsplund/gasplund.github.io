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
console.log("success");
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
players = $('#players'),
map = $('#map'),
version = $('#version'),
is_online = $('#online'),
last_check = $('#lastcheck'),
last_online = $('#lastonline'),
moment.locale('*');
settext(updated, moment(d).fromNow());
setclass(online, data.online);
if (data.online) {
settext(np, data.players.now);
settext(version, data.server.name);
settext(map, data.map);
} else {
setclass(np, error);
setclass(version, error);
setclass(map, error);
}
}
$(document).ready(function() {
q('//lentium.xyz', display);
});
