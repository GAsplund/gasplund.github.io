var servers = ['gasplund.mc-server.net:7777', 'gasplund.mc-server.net:7778'];

function ParseAndDisplay() {
    var serverslist = servers[0];
    for (i = 1; i + 1 <= servers.length; i++) {
        serverslist = serverslist + "," + servers[i];
    }

    $.ajax({
        url: "https://use.gameapis.net/ark/query/info/" + serverslist,
        type: 'GET',
        dataType: 'json'
    })

        // I guess this is where data comes from
        .done(function (data) {
            for (i = 0; i + 1 <= servers.length; i++) {
                AddDataToTable(data[servers[i]]);
            }
        })
}

function AddDataToTable(data) {
    var status = data.status,
        players = data.players.online,
        maxplayers = data.players.max,
        map = data.map,
        name = data.name,
        query_port = data.queryPort,
        steamlink = data.join,
        versiontemp = name.split(" - (v"),
        version = versiontemp[versiontemp.length - 1].replace(")", "");

    var table = document.getElementById("ARKTable");
    row = table.insertRow(table.rows.length),
        cell1 = row.insertCell(0),
        cell2 = row.insertCell(1),
        cell3 = row.insertCell(2),
        cell4 = row.insertCell(3),
        cell5 = row.insertCell(4),
        cell6 = row.insertCell(5);

    // Add data that is independent of online/offline
    cell1.innerHTML = name.replace(" - (v" + version + ")", "");
    cell3.innerHTML = players + "/" + maxplayers;
    cell4.innerHTML = map.replace("TheIsland", "The Island");
    cell5.innerHTML = version;
    cell6.id = "noborder";

    if (status === "true") {
        // Add the data that is dependent on online/offline for ONLINE STATUS
        cell2.innerHTML = '<i class="fas fa-check fa-lg"></i>';
        cell6.innerHTML = '<a href="' + steamlink + '"><i class="fas fa-sign-in-alt fa-lg"></i></a>';
    }

    else {
        // Add the data that is dependent on online/offline for OFFLINE STATUS
        cell2.innerHTML = '<i class="fas fa-times fa-lg"></i>';
        cell6.innerHTML = '(Offline)';
    }
}

$(document).ready(function () {
    ParseAndDisplay(servers);
});
