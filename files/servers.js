var ARKservers = ['gasplund.mc-server.net:7777', 'gasplund.mc-server.net:7778'];
var FTBservers = ['gasplund.mc-server.net'];

function ParseAndDisplay(game) {
    var ARKserverslist = ARKservers[0];
    for (i = 1; i + 1 <= ARKservers.length; i++) {
        ARKserverslist = ARKserverslist + "," + ARKservers[i];
    }

    var FTBserverslist = ARKservers[0];
    for (i = 1; i + 1 <= ARKservers.length; i++) {
        FTBserverslist = FTBserverslist + "," + ARKservers[i];
    }

    if (game === "ARK") {
        $.ajax({
            url: "https://use.gameapis.net/ark/query/info/" + ARKservers,
            type: 'GET',
            dataType: 'json'
        })

        // I guess this is where data comes from
        .done(function (data) {
            for (i = 0; i + 1 <= ARKservers.length; i++) {
                AddDataToTable(data[ARKservers[i]], game);
            }
        });
    }

	else if (game === "FTB") {
        $.ajax({
            url: "https://use.gameapis.net/mc/query/info/" + FTBservers[0],
            type: 'GET',
            dataType: 'json'
        })

        .done(function (data) {
            AddDataToTable(data, game);
        });
    }
}

function AddDataToTable(data, game) {
    if (game === "ARK") {

        var status,
            players,
            maxplayers,
            table;

        //   ADD THE SERVER DATA FOR ARK: SURVIVAL EVOLVED SERVER(S)

        status = data.status;
        players = data.players.online;
        maxplayers = data.players.max;
            name = data.name;
        var query_port = data.queryPort,
            map = data.map,
            steamlink = data.join,
            versiontemp = name.split(" - (v"),
            version = versiontemp[versiontemp.length - 1].replace(")", "");

        table = document.getElementById("ARKTable");
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

    if (status === true) {
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

    else if (game === "FTB") {

        //   ADD THE SERVER DATA FOR FEED THE BEAST SERVER
            status = data.status;
            players = data.players.online;
            maxplayers = data.players.max;
        var name = data.motds.html;
            version = data.version;

        table = document.getElementById("FTBTable");
        row = table.insertRow(table.rows.length),
        cell1 = row.insertCell(0),
        cell2 = row.insertCell(1),
        cell3 = row.insertCell(2),
        cell4 = row.insertCell(3);

        // Add data that is independent of online/offline
        cell1.innerHTML = name;
        cell3.innerHTML = players + "/" + maxplayers;
        cell4.innerHTML = version;
        cell4.id = "noborder";

        if (status === true) {
            // Add the data that is dependent on online/offline for ONLINE STATUS
            cell2.innerHTML = '<i class="fas fa-check fa-lg"></i>';
        }

        else {
            // Add the data that is dependent on online/offline for OFFLINE STATUS
            cell2.innerHTML = '<i class="fas fa-times fa-lg"></i>';
        }
    }
}

$(document).ready(function () {
    ParseAndDisplay("ARK");
    ParseAndDisplay("FTB");
});
