var mainserver = 'https://ark-servers.net/api/?object=servers&element=detail&key=UGkfgK5PNgpdgwGmGHKGcUgflPIjqIOE9M2';
var secondserver = 'https://ark-servers.net/api/?object=servers&element=detail&key=afmC096pkzTMAL8WDM0HOWpBtpjJTodqs';

var error = 'unknown';

var classes = {
    error: "fa-question",
    0: "fa-times",
    1: "fa-check"
};

var allclasses = "";

for (i in classes) {
    allclasses += ' ' + classes[i];
}

function ParseAndDisplay(Display, Url) {
    $.ajax({
        url: Url,
        type: 'GET',
        dataType: 'json'
    })

        .done(function (data) {
            console.log(data);
            Display(data);
        })

        .fail(function (data) {
            console.log("error");
        })

        .always(function () {
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

function DisplayData(data) {
    var
        is_online =  $('#is_online'),
        players =    $('#players'),
        maxplayers = $('#maxplayers'),
        version =    $('#version'),
        map =        $('#map'),
        lastcheck =  $('#last_check'),
        updated =    $('#updated'),
        hostname =   $('#hostname'),
        address =    $('#address'),
        query_port = $('#query_port');
    //setclass(is_online, data.is_online);
    var table = document.getElementById("statusTable");
    console.log(data.is_online);
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    if (data.is_online === "1") {
        /* Add the data with "server online" stuff */
        cell1.innerHTML = data.hostname.replace(" - (v" + data.version + ")", "");
        console.log(data.is_online.replace("1", '<i class="fab fa-asymmetrik"></i>'));
        cell2.innerHTML = data.is_online.replace("1", '<i class="fa fa-check"></i>');
        cell3.innerHTML = data.players + "/" + data.maxplayers;
        cell4.innerHTML = data.map;
        cell5.innerHTML = data.version;
        cell6.innerHTML = '<a href="steam://connect/' + data.address + ':' + data.query_port + '">Connect</a>';
        cell6.id = "noborder";
    }

    else {
        /* Add the data with "server offline" stuff */
        cell1.innerHTML = data.hostname.replace(" - (v" + data.version + ")", "");
        console.log(data.is_online.replace("1", '<i class="fab fa-asymmetrik"></i>'));
        cell2.innerHTML = data.is_online.replace("1", '<i class="fa fa-times"></i>');
        cell3.innerHTML = data.players + "/" + data.maxplayers;
        cell4.innerHTML = data.map;
        cell5.innerHTML = data.version;
        cell6.innerHTML = '(Offline)';
        cell6.id = "noborder";
    }
}
$(document).ready(function () {
    ParseAndDisplay(DisplayData, mainserver);
    ParseAndDisplay(DisplayData, secondserver);
});
