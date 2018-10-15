var ItemData = {
    "Warframes" : [],
    "Primaries": [],
    "Secondaries": [],
    "Melees":[],
    "Sentiels":[],
    "Sentiel Weapons":[],
    "Companions":[],
    "Archwings":[],
    "Arch-Melees":[],
    "Resources":[],
    "Relics":[]
}

var ExportManifest;

var FrameVariablesToAdd = ["masteryReq", "health", "shield", "armor", "power", "sprint", "polarities", "aura"]
var PrimaryVariablesToAdd = ["masteryReq"]

// API text to real text
var stats = {
	"armor"				:"Armor",
	"aura"				:"Aura Polarity",
	"buildPrice"		:"Build Cost",
	"buildTime"			:"Build Time",
	"category"			:"Category",
	"color"				:"Color",
	"components"		:"Components",
	"concalve"			:"Conclave",
	"consumeOnBuild"	:"Infinite Blueprint",
	"description"		:"Description",
	"health"			:"Health",
	"introduced"		:"Introduced",
	"masteryReq"		:"Mastery",
	"name"				:"Name",
	"polarities"		:"Polarities",
	"power"				:"Energy",
	"sex"				:"Sex",
	"shield"			:"Shield",
	"skipBuildTimePrice":"Rush Cost",
	"sprint"			:"Sprint Speed",
	"type"				:"Type"
}

// An image link for each polarity
var polaritiesToImage = {
	"madurai":"<img src=\"https://cdn.discordapp.com/attachments/389344871925809163/494951796373192705/20.png\"</img>",
	"vazarin":"<img src=\"https://cdn.discordapp.com/attachments/389344871925809163/494951820053970944/20.png\"</img>",
	"naramon":"<img src=\"https://cdn.discordapp.com/attachments/389344871925809163/494951835732410393/20.png\"</img>",
	"zenurik":"<img src=\"https://cdn.discordapp.com/attachments/389344871925809163/494951835732410393/20.png\"</img>",
	"unairu":"<img src=\"https://cdn.discordapp.com/attachments/389344871925809163/494951851960172546/20.png\"</img>",
	"penjaga":"<img src=\"https://cdn.discordapp.com/attachments/389344871925809163/494951868741713930/20.png\"</img>",
	"umbra":"<img src=\"https://cdn.discordapp.com/attachments/389344871925809163/494951890119819265/20.png\"</img>"
}

// Why doesn't the normal replace function have this?
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

// Makes things easier
function GetInfoForWarframe(FrameNumber) {
    return (ItemData.Warframes[FrameNumber]);
}


// Real juicy stuff. Adds info for warframes and soon weapons
function AddInfoToTable(FrameParsedData, VariablesToAdd, TargetTable) {
    clearAllTables();
    if (FrameParsedData.type)
    var frameImage = Object.values(ExportManifest["Manifest"]).find(obj => {
        return obj["uniqueName"] === FrameParsedData.uniqueName;
    })
    TargetTable.rows[0].getElementsByTagName("th")[0].innerHTML = "Loading...";
    var img = new Image();
    img.onload = function () {
        TargetTable.rows[0].getElementsByTagName("th")[0].innerHTML = "<img id=\"itemImage\" src=\"" + img.src + "\"<\\img>";
        document.getElementById("itemImage").height = document.getElementById("itemImage").height * (171 / 256);
        document.getElementById("itemImage").width = document.getElementById("itemImage").width / (171 / 256);
    }
    img.src = "http://content.warframe.com/MobileExport" + frameImage.textureLocation;
    TargetTable.rows[1].getElementsByTagName("th")[0].innerHTML = FrameParsedData.name;

    for (var i = 0; i < VariablesToAdd.length; i++) {
        row = TargetTable.insertRow(TargetTable.rows.length),
            cell1 = row.insertCell(0),
            cell2 = row.insertCell(1),
            cell1.colSpan = 1;
        cell2.colSpan = 1;
        cell2.className += "noborder";
        statName = VariablesToAdd[i].replace(VariablesToAdd[i], stats[VariablesToAdd[i]]);
        cell1.innerHTML = statName;
        if (VariablesToAdd[i] === "polarities" || VariablesToAdd[i] === "aura") {
            var _framePolarities = String(FrameParsedData[VariablesToAdd[i]]);

            if (FrameParsedData[VariablesToAdd[i]] != undefined) {
                if (FrameParsedData[VariablesToAdd[i]].constructor === Array) {
                    for (var l = 0; l < FrameParsedData[VariablesToAdd[i]].length; l++) {
                        var _framePolarities = _framePolarities.replace(FrameParsedData[VariablesToAdd[i]][l], polaritiesToImage[FrameParsedData[VariablesToAdd[i]][l]]);
                    }
                } else {
                    var _framePolarities = _framePolarities.replace(FrameParsedData[VariablesToAdd[i]], polaritiesToImage[FrameParsedData[VariablesToAdd[i]]]);
                }
            } else {
                var _framePolarities = "N/A";
            }


            var _frameInfo = _framePolarities.replaceAll(",", "");
        } else {
            var _frameInfo = String(FrameParsedData[VariablesToAdd[i]]).replaceAll(",", "");
        }
        cell2.innerHTML = _frameInfo;
        cell2.style.TextAlign = "left";
    }
}

function clearAllTables() {
    // Clear item data table
    while (document.getElementById("FrameTable").rows.length > 2) {
        document.getElementById("FrameTable").deleteRow(document.getElementById("FrameTable").rows.length - 1);
    }
    // Clear item obtain information table
}

function searchUpdate() {
    var searchQuery = document.getElementById("ItemSearch").value;

    searchResult = Object.keys(ItemData.Warframes).filter(function (key) {
        return ItemData.Warframes[key]["name"].toLowerCase().includes(searchQuery.toLowerCase());
    });

    document.getElementById("ItemSelect").innerHTML = "";

    var select = document.getElementById("ItemSelect");
    for (index in searchResult) {
        //select.options[select.options.length] = new Option(searchResult[index], index); // OLD
        select.options[select.options.length] = new Option(ItemData.Warframes[searchResult[index]]["name"], index);
    }
}

function querySelection() {
    AddInfoToTable(GetInfoForWarframe(searchResult[document.getElementById("ItemSelect").value]), FrameVariablesToAdd, document.getElementById("FrameTable"));
}

// Get and store information from API
function InitiateFetch() {

    $.ajax({
        url: "https://api.warframestat.us/warframes",
        type: 'GET',
        dataType: 'json'
    })

        .done(function (data) {
            ItemData.Warframes = data;
            searchUpdate()
        });


    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + "http://content.warframe.com/MobileExport/Manifest/ExportManifest.json",
        type: 'GET',
        dataType: 'json'
    })

        .done(function (data) {
            ExportManifest = data;
        });

    $.ajax({
        url: "https://api.warframestat.us/weapons",
        type: 'GET',
        dataType: 'json'
    })
        .done(function (data) {
            var Weapons = data;
        });
}

// Sleep Function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Entry point
$(document).ready(function () {
    CurrentlyCountingDown = true;
    InitiateFetch();
});
