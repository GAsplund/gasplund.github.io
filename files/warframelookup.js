var FrameData;
var Warframes = [];
var ExportManifest;

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

// Cuz the API is ass at doing names
function ParseFrameNumbersToNames(NumbersJSON) {
    for (var i = 0; i < NumbersJSON.length; i++) {
        Warframes[NumbersJSON[i].name] = [];
        Warframes[NumbersJSON[i].name][0] = i;
        Warframes[NumbersJSON[i].name][1] = NumbersJSON[i].name;

    }
}

// Makes things easier
function GetInfoForWarframe(FrameName) {
    return (FrameData[Warframes[FrameName][0]]);
}


// Real juicy stuff. Adds info for warframes and soon weapons
function AddInfoToTable(FrameParsedData) {
    clearAllTables();
    if (FrameParsedData.type)
        var FrameVariablesToAdd = ["masteryReq", "health", "shield", "armor", "power", "sprint", "polarities", "aura"]
    table = document.getElementById("FrameTable");
    var frameImage = Object.values(ExportManifest["Manifest"]).find(obj => {
        //console.log("Subject:" + ExportManifest["Manifest"][obj]["uniqueName"]);
        //console.log("Target: " + FrameParsedData.uniqueName);
        return obj["uniqueName"] === FrameParsedData.uniqueName;
    })
    var img = new Image();
    img.onload = function () {
        table.rows[0].getElementsByTagName("th")[0].innerHTML = "<img id=\"itemImage\" src=\"" + img.src + "\"<\\img>";
        document.getElementById("itemImage").height = document.getElementById("itemImage").height * (171 / 256);
        document.getElementById("itemImage").width = document.getElementById("itemImage").width / (171 / 256);
    }
    img.src = "http://content.warframe.com/MobileExport" + frameImage.textureLocation;
    table.rows[1].getElementsByTagName("th")[0].innerHTML = FrameParsedData.name;

    for (var i = 0; i < FrameVariablesToAdd.length; i++) {
        row = table.insertRow(table.rows.length),
            cell1 = row.insertCell(0),
            cell2 = row.insertCell(1),
            cell1.colSpan = 1;
        cell2.colSpan = 1;
        cell2.className += "noborder";
        statName = FrameVariablesToAdd[i].replace(FrameVariablesToAdd[i], stats[FrameVariablesToAdd[i]]);
        cell1.innerHTML = statName;
        if (FrameVariablesToAdd[i] === "polarities" || FrameVariablesToAdd[i] === "aura") {
            var _framePolarities = String(FrameParsedData[FrameVariablesToAdd[i]]);

            if (FrameParsedData[FrameVariablesToAdd[i]] != undefined) {
                if (FrameParsedData[FrameVariablesToAdd[i]].constructor === Array) {
                    for (var l = 0; l < FrameParsedData[FrameVariablesToAdd[i]].length; l++) {
                        var _framePolarities = _framePolarities.replace(FrameParsedData[FrameVariablesToAdd[i]][l], polaritiesToImage[FrameParsedData[FrameVariablesToAdd[i]][l]]);
                    }
                } else {
                    var _framePolarities = _framePolarities.replace(FrameParsedData[FrameVariablesToAdd[i]], polaritiesToImage[FrameParsedData[FrameVariablesToAdd[i]]]);
                }
            } else {
                var _framePolarities = "N/A";
            }


            var _frameInfo = _framePolarities.replaceAll(",", "");
        } else {
            var _frameInfo = String(FrameParsedData[FrameVariablesToAdd[i]]).replaceAll(",", "");
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

    searchResult = Object.keys(Warframes).filter(function (key) {
        return Warframes[key][1].toLowerCase().includes(searchQuery.toLowerCase());
    });

    document.getElementById("ItemSelect").innerHTML = "";

    var select = document.getElementById("ItemSelect");
    for (index in searchResult) {
        select.options[select.options.length] = new Option(searchResult[index], index);
    }
}

function querySelection() {
    var FrameNameTable = [];
    AddInfoToTable(GetInfoForWarframe(searchResult[document.getElementById("ItemSelect").value]));
}

// Get and store information from API
function InitiateFetch() {

    $.ajax({
        url: "https://api.warframestat.us/warframes",
        type: 'GET',
        dataType: 'json'
    })

        .done(function (data) {
            FrameData = data;
            ParseFrameNumbersToNames(data);
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
