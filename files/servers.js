var CurrentlyCountingDown = true;
var ARKservers = ["85.195.17.54:7777", "85.195.17.54:7778", "85.195.17.54:7779"];
var FTBservers = ["85.195.17.54:25565", "85.195.17.54:25566"];

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function RefreshCountdown() {

	refreshtxt = document.getElementsByClassName("refreshtxt")[0];
	while (CurrentlyCountingDown === true) {

		for (i = 1; i <= 31; i++) {
			await sleep(1000);
			refreshtxt.innerHTML = "Auto-refresh in " + (31 - i) + "s";
		}

		ReloadTables();
	}
}

function ParseAndDisplay(game) {

	var ARKserverslist = ARKservers[0];
	if (ARKservers.length >= 2) {
	for (i = 1; i + 1 <= ARKservers.length; i++) {
		ARKserverslist = ARKserverslist + "," + ARKservers[i];
	}
	}
	

	var FTBserverslist = FTBservers[0];
	if (FTBservers.length >= 2) {
	for (i = 1; i + 1 <= FTBservers.length; i++) {
		FTBserverslist = FTBserverslist + "," + ARKservers[i];
	}
	}

	if (game === "ARK") {
		$.ajax({
			url: "https://use.gameapis.net/ark/query/info/" + ARKserverslist,
			type: 'GET',
			dataType: 'json'
		})

		// I guess this is where data comes from
		.done(function (data) {
			if (ARKservers.length === 1){
				AddDataToTable(data, game);
			} else {
			for (i = 0; i + 1 <= ARKservers.length; i++) {
				AddDataToTable(data[ARKservers[i]], game);
			}
			}
		});
	}

	else if (game === "FTB") {
		$.ajax({
			url: "https://use.gameapis.net/mc/query/info/" + FTBserverslist,
			type: 'GET',
			dataType: 'json'
		})

		.done(function (data) {
			if (FTBservers.length === 1){
				AddDataToTable(data, game);
			} else {
			for (i = 0; i + 1 <= FTBservers.length; i++) {
				AddDataToTable(data[FTBservers[i]], game);
			}
			}
		});
	}

}

function AddDataToTable(indata, game) {

    if (game === "ARK") {

        var status,
            players,
            maxplayers,
            table;

        //   ADD THE SERVER DATA FOR ARK: SURVIVAL EVOLVED SERVER(S)

        status = indata.status;
        if (status) {
            players = indata.players.online;
            maxplayers = indata.players.max;
            name = indata.name;
            var query_port = indata.queryPort,
                map = indata.map,
                steamlink = indata.join,
                versiontemp = indata.name.split(" - (v"),
            version = versiontemp[versiontemp.length - 1].replace(")", "");
        }

        table = document.getElementById("ARKTable");
        row = table.insertRow(table.rows.length),
            cell1 = row.insertCell(0),
            cell2 = row.insertCell(1),
            cell3 = row.insertCell(2),
            cell4 = row.insertCell(3),
            cell5 = row.insertCell(4),
            cell6 = row.insertCell(5);

        // Add data that is independent of online/offline
        cell6.className += "noborder";

        if (status === true) {
            // Add the data that is dependent on online/offline for ONLINE STATUS
            cell1.innerHTML = name.replace(" - (v" + version + ")", "");
            cell2.innerHTML = '<i class="fas fa-check fa-lg"></i>';
            cell3.innerHTML = players + "/" + maxplayers;
            cell4.innerHTML = map.replace("TheIsland", "The Island").replace("ScorchedEarth", "Scorched Earth");
            cell5.innerHTML = version;
            cell6.innerHTML = '<a href="' + steamlink + '"><i class="fas fa-sign-in-alt fa-lg"></i></a>';
        }

        else {
            // Add the data that is dependent on online/offline for OFFLINE STATUS
            cell1.innerHTML = "?";
            cell2.innerHTML = '<i class="fas fa-times fa-lg"></i>';
            cell3.innerHTML = "0/0";
            cell4.innerHTML = "?";
            cell5.innerHTML = "0.0";
            cell6.innerHTML = '(Offline)';
        }

    }

    else if (game === "FTB") {

        // ADD THE SERVER DATA FOR FEED THE BEAST SERVER
        status = indata.status;
        if (status) {
            players = indata.players.online;
            maxplayers = indata.players.max;
            var name = indata.motds.html;
            version = indata.version;
        }

        table = document.getElementById("FTBTable");
        row = table.insertRow(table.rows.length),
            cell1 = row.insertCell(0),
            cell2 = row.insertCell(1),
            cell3 = row.insertCell(2),
            cell4 = row.insertCell(3);

        // Add data that is independent of online/offline
        cell4.className += "noborder";

        if (status === true) {
            // Add the data corresponding to ONLINE STATUS
            cell1.innerHTML = name.replace("\n", "<br>");
            cell2.innerHTML = '<i class="fas fa-check fa-lg"></i>';
            cell3.innerHTML = players + "/" + maxplayers;
            cell4.innerHTML = version;

        }

        else {
            // Add the data corresponding to OFFLINE STATUS
            cell1.innerHTML = "?";
            cell2.innerHTML = '<i class="fas fa-times fa-lg"></i>';
            cell3.innerHTML = "0/0";
            cell4.innerHTML = "?";
        }

    }

}

function ReloadTables() {
	CurrentlyCountingDown = false;
	ARKTableRemoveQuery = document.getElementById("ARKTable");
	FTBTableRemoveQuery = document.getElementById("FTBTable");
	while (ARKTableRemoveQuery.rows.length > 1) {
		ARKTableRemoveQuery.deleteRow(ARKTableRemoveQuery.rows.length-1);
	}
	while (FTBTable.rows.length > 1) {
		FTBTableRemoveQuery.deleteRow(FTBTableRemoveQuery.rows.length-1);
	}
	InitiateFetch();
	CurrentlyCountingDown = true;
}

function InitiateFetch() {
	ParseAndDisplay("ARK");
	ParseAndDisplay("FTB");
}

$(document).ready(function () {
	CurrentlyCountingDown = true;
	RefreshCountdown();
	InitiateFetch();
});
