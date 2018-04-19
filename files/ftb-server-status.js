var server = 'gasplund.mc-server.net';

function ParseAndDisplay() {

    $.ajax({
        url: "https://use.gameapis.net/mc/query/info/" + server,
        type: 'GET',
        dataType: 'json'
    })

    // I guess this is where data comes from
    .done(function (data) {
            AddDataToTable(data);
        })
}

function AddDataToTable(data) {
    var status = data.status,
        players = data.players.online,
        maxplayers = data.players.max,
        hostname = data.hostname,
        version = data.version;

    var table = document.getElementById("FTBTable");
    row = table.insertRow(table.rows.length),
        cell1 = row.insertCell(0),
        cell2 = row.insertCell(1),
        cell3 = row.insertCell(2),
        cell4 = row.insertCell(3);

    // Add data that is independent of online/offline
    cell1.innerHTML = hostname;
    cell3.innerHTML = players + "/" + maxplayers;
    cell4.innerHTML = version;
	cell4.id = "noborder";

    if (status === "true") {
        // Add the data that is dependent on online/offline for ONLINE STATUS
        cell2.innerHTML = '<i class="fas fa-check fa-lg"></i>';
    }

    else {
        // Add the data that is dependent on online/offline for OFFLINE STATUS
        cell2.innerHTML = '<i class="fas fa-times fa-lg"></i>';
    }
}

$(document).ready(function () {
    ParseAndDisplay(server);
});
