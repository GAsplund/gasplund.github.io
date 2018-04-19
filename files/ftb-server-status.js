var server = 'gasplund.mc-server.net';

function ParseAndDisplay(server) {

    $.ajax({
        url: "https://use.gameapis.net/mc/query/extensive/" + server,
        type: 'GET',
        dataType: 'json'
    })

        // I guess this is where data comes from
        .done(function (data) {
            console.log(data);
            AddDataToTable(data[server]);
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

    if (status === "true") {
        // Add the data that is dependent on online/offline for ONLINE STATUS
        cell2.innerHTML = '<i class="fas fa-check fa-lg"></i>';
        cell4.id = "noborder";
    }

    else {
        // Add the data that is dependent on online/offline for OFFLINE STATUS
        cell2.innerHTML = '<i class="fas fa-times fa-lg"></i>';
        cell4.id = "noborder";
    }
}

$(document).ready(function () {
    ParseAndDisplay(servers);
});
