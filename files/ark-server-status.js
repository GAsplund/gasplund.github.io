var mainserver = 'https://use.gameapis.net/ark/query/info/gasplund.mc-server.net:7777';
var secondserver = 'https://use.gameapis.net/ark/query/info/gasplund.mc-server.net:7778';

function ParseAndDisplay(Url) {
    $.ajax({
        url: Url,
        type: 'GET',
        dataType: 'json'
    })

        .done(function (data) {
            console.log(data);
            AddDataToTable(data);
        })

        .fail(function (data) {
            console.log("error");
        })

        .always(function () {
        });
}

function AddDataToTable(data) {
    var is_online = data.status + '',
        players = data.players.online,
        maxplayers = data.players.max,
        map = data.map,
        lastcheck = data.last_check,
        hostname = data.name,
        name = data.hostname,
        query_port = data.queryPort,
        steamlink = data.join,
        versiontemp = hostname.split(" - (v"),
        version = versiontemp[versiontemp.length - 1].replace(")", "");

    var table = document.getElementById("statusTable");
        row = table.insertRow(table.rows.length),
        cell1 = row.insertCell(0),
        cell2 = row.insertCell(1),
        cell3 = row.insertCell(2),
        cell4 = row.insertCell(3),
        cell5 = row.insertCell(4),
        cell6 = row.insertCell(5);

    // Add data that is independent of online/offline
    cell1.innerHTML = hostname.replace(" - (v" + version + ")", "");
    cell3.innerHTML = players + "/" + maxplayers;
    cell4.innerHTML = map.replace("TheIsland", "The Island");
    cell5.innerHTML = version;

    if (is_online === "true") {
        // Add the data that is dependent on online/offline for ONLINE STATUS
        cell2.innerHTML = '<i style="font-size:22px" class="fas fa-check"></i>';
        cell6.innerHTML = '<a href="' + steamlink + '"><i style="font-size:24px" class="fas fa-sign-in-alt"></i></a>';
        cell6.id = "noborder";
    }

    else {
        // Add the data that is dependent on online/offline for OFFLINE STATUS
        cell2.innerHTML = '<i style="font-size:22px" class="fas fa-times"></i>';
        cell6.innerHTML = '(Offline)';
        cell6.id = "noborder";
    }
}

$(document).ready(function () {
    ParseAndDisplay(mainserver);
    ParseAndDisplay(secondserver);
});
