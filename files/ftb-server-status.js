var servers = ['gasplund.mc-server.net'];

function ParseAndDisplay() {
    var serverslist = servers[0];
    for (i = 1; i + 1 <= servers.length; i++) {
        console.log("Doing operation " + i + " out of " + servers.length);
        serverslist = serverslist + "," + servers[i];
    }

    $.ajax({
        url: "https://use.gameapis.net/mc/query/extensive/" + serverslist,
        type: 'GET',
        dataType: 'json'
    })

        // I guess this is where data comes from
        .done(function (data) {
            console.log(data);
            for (i = 0; i + 1 <= servers.length; i++) {
                AddDataToTable(data[servers[i]]);
            }
        })

        .fail(function (data) {
            console.log("error");
        })

        .always(function () { });
}

function AddDataToTable(data) {
    var status = data.status,
        players = data.players.online,
        maxplayers = data.players.max,
        hostname = data.hostname,
        port = data.port,
        version = data.version;

    var table = document.getElementById("FTBTable");
    row = table.insertRow(table.rows.length),
        cell1 = row.insertCell(0),
        cell2 = row.insertCell(1),
        cell3 = row.insertCell(2),
        cell4 = row.insertCell(3),
		cell5 = row.insertCell(4),

    // Add data that is independent of online/offline
    cell1.innerHTML = hostname;
	cell2.innerHTML = port;
    cell4.innerHTML = players + "/" + maxplayers;
    cell5.innerHTML = version;

    if (status === "true") {
        // Add the data that is dependent on online/offline for ONLINE STATUS
        cell3.innerHTML = '<i class="fas fa-check fa-lg"></i>';
        cell5.id = "noborder";
    }

    else {
        // Add the data that is dependent on online/offline for OFFLINE STATUS
        cell3.innerHTML = '<i class="fas fa-times fa-lg"></i>';
        cell5.id = "noborder";
    }
}

$(document).ready(function () {
    ParseAndDisplay(servers);
});
