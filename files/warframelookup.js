var ItemData = {
    "Warframes" : {},
    "Primary": {},
    "Secondary": {},
    "Melee":{},
    "Sentiels":{},
    "Sentiel Weapons":{},
    "Companions":{},
    "Archwings":{},
    "Arch-Melees":{},
    "Resources":{},
    "Relics":{},
    "Misc":{}
}

//var ItemTypes = $.getJSON("files/warframeDataDefine.json")

/*var ItemTypes = {
"Blade and Whip"    :"Melee",
"Bow"               :"Primary",
"Claws"             :"Melee",
"Crossbow"          :"Primary",
"Dagger"            :"Melee",
"Dual Daggers"      :"Melee",
"Dual Pistols"      :"Secondary",
"Dual Shotguns"     :"Secondary",
"Dual Swords"       :"Melee",
"Fist"              :"Melee",
"Glaive"            :"Melee",
"Gunblade"          :"Melee",
"Hammer"            :"Melee",
"Heavy Blade"       :"Melee",
"Launcher"          :"Primary",
"Machete"           :"Melee",
"Melee"             :"Melee",
"Misc"              :"Misc",
"Nikana"            :"Melee",
"Nunchaku"          :"Melee",
"Pistol"            :"Secondary",
"Polearm"           :"Melee",
"Rapier"            :"Melee",
"Rifle"             :"Primary",
"Scythe"            :"Melee",
"Shotgun"           :"Primary",
"Shotgun Sidearm"   :"Secondary",
"Sniper Rifle"      :"Primary",
"Sparring"          :"Melee",
"Speargun"          :"Primary",
"Staff"             :"Melee",
"Sword"             :"Melee",
"Sword and Shield"  :"Melee",
"Thrown"            :"Secondary",
"Tonfa"             :"Melee",
"Warfan"            :"Melee",
"Whip"              :"Melee",
"Warframe"          :"Warframe"
}*/

var Weapons;
var searchResult = {};

var ExportManifest;

var ItemFormat = {
    "Warframes":["masteryReq", "health", "shield", "armor", "power", "sprint", "polarities", "aura"],
    "Primary":["masteryReq","type","noise","fireRate","accuracy","magazineSize","ammo","reloadTime","disposition"],
    "Secondary":["masteryReq","type","trigger","noise","fireRate","accuracy","magazineSize","ammo","reloadTime","disposition"],
    "Melee":["masteryReq","type","fireRate","channeling","disposition"]
}

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
    "type"				:"Type",
    "noise"             :"Noise",
    "fireRate"          :"Fire Rate",
    "accuracy"          :"Accuracy",
    "magazineSize"      :"Magazine Size",
    "ammo"              :"Max Ammo",
    "reloadTime"        :"Reload Time",
    "disposition"       :"Disposition",
    "trigger"           :"Trigger Type",
    "channeling"        :"Channeling Damage"
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

var categoryConvert = {
    "Warframes":"Warframes",
    "Primary":"Primary",
    "Secondary":"Secondary",
    "Melee":"Melee",
    "Sentiel":"Sentiel",
    "Sentiel Weapons":"Sentiel Weapon",
    "Companions":"Companion",
    "Archwings":"Archwing",
    "Arch-Melees":"Arch-Melee",
    "Resources":"Resource",
    "Relics":"Relic",
    "Misc":"Misc"
}

// Why doesn't the normal replace function have this?
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function dynamicSort(prop) {
    var keysSorted = [];
    var sortableObj = {};

    Object.keys(prop).forEach(function(key){
        keysSorted.push(prop[parseInt(key)]);
    });

    keysSorted.sort();

    for(item in keysSorted){
        sortableObj[Object.keys(sortableObj)["length"]] = keysSorted[item];
    }
    return sortableObj;
}

// Makes things easier
function GetInfoForItem(GetInfoQuery) {
    for (entry in ItemData){
        var QueryResult = Object.values(ItemData[entry]).find(obj => {
            return obj["name"] === GetInfoQuery;
        })
        if (QueryResult != undefined) {if (QueryResult["name"] === GetInfoQuery) return QueryResult; break;}
    }
    return QueryResult;
    //return (ItemData.Warframes[FrameNumber]);
}

function CategorizeWeapons(WeaponsList){

    Object.keys(WeaponsList).forEach(function(key) {

        // Select what category the item should be put in
        //var PushCat = ItemTypes[WeaponsList[key]["type"]];
        var PushCat = WeaponsList[key]["category"];

        ItemData[PushCat][Object.keys(ItemData[PushCat])["length"]] = WeaponsList[key];
      
      });
}

// Real juicy stuff. Adds info for warframes and soon weapons
function AddInfoToTable(ParsedData, TargetTable) {
    clearAllTables();
    VariablesToAdd = ItemFormat[ParsedData["category"]];
    if (ParsedData.type)
    var frameImage = "https://raw.githubusercontent.com/WFCD/warframe-items/development/data/img/" + ParsedData.imageName;
    TargetTable.rows[0].getElementsByTagName("th")[0].innerHTML = "Loading...";
    var img = new Image();
    img.onload = function () {
        TargetTable.rows[0].getElementsByTagName("th")[0].innerHTML = "<img id=\"itemImage\" src=\"" + img.src + "\"<\\img>";
        //document.getElementById("itemImage").height = document.getElementById("itemImage").height * (171 / 256);
        //document.getElementById("itemImage").width = document.getElementById("itemImage").width / (171 / 256);
    }
    img.src = frameImage;
    TargetTable.rows[1].getElementsByTagName("th")[0].innerHTML = ParsedData.name;

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
            var _framePolarities = String(ParsedData[VariablesToAdd[i]]);

            if (ParsedData[VariablesToAdd[i]] != undefined) {
                if (ParsedData[VariablesToAdd[i]].constructor === Array) {
                    for (var l = 0; l < ParsedData[VariablesToAdd[i]].length; l++) {
                        var _framePolarities = _framePolarities.toLowerCase().replace(ParsedData[VariablesToAdd[i]][l], polaritiesToImage[ParsedData[VariablesToAdd[i]][l]]);
                    }
                } else {
                    var _framePolarities = _framePolarities.toLowerCase().replace(ParsedData[VariablesToAdd[i]], polaritiesToImage[ParsedData[VariablesToAdd[i]]]);
                }
            } else {
                // There are no polarities for the item, set the value as N/A
                var _framePolarities = "N/A";
            }


            var _frameInfo = _framePolarities.replaceAll(",", "");
        } else {
            var _frameInfo = String(ParsedData[VariablesToAdd[i]]).replaceAll(",", "");
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
        searchQuery = "";
        searchQuery = document.getElementById("ItemSearch").value;

        searchResult = {};

        var categorySelect = document.getElementById("CategorySelect").value;

    for (typeKey in ItemData){
        var searchResultNumbers = Object.keys(ItemData[typeKey]).filter(function (key) {
            return ItemData[typeKey][key]["name"].toLowerCase().includes(searchQuery.toLowerCase()) && (ItemData[typeKey][key]["category"] == categoryConvert[categorySelect] || categorySelect == "All");
        });
        Object.keys(searchResultNumbers).forEach(function(srn){
            searchResult[parseInt(srn)+parseInt(Object.keys(searchResult)["length"])] = ItemData[typeKey][searchResultNumbers[srn]]["name"];
        })
    }

    if (Object.keys(searchResult)[length] == "0"){
        console.log("No matches when comparing item category ", categorySelect);
    }

    searchResult = dynamicSort(searchResult);

    document.getElementById("ItemSelect").innerHTML = "";

    var select = document.getElementById("ItemSelect");
    for (index in searchResult) {
        //select.options[select.options.length] = new Option(searchResult[index], index); // OLD
        select.options[select.options.length] = new Option(/*ItemData.Warframes[searchResult[index]]["name"]*/searchResult[index], index);
    }
}

function querySelection() {
    AddInfoToTable(GetInfoForItem(searchResult[document.getElementById("ItemSelect").value]), document.getElementById("FrameTable"));
}

function queryCategorySelection() {
    searchUpdate();
}

// Get and store information from API
function InitiateFetch() {

    $.when(FrameAjax(), WeaponAjax()).done(function(a1, a2){
        ItemData.Warframes = JSON.parse(a1[2]["responseText"]);
        //ExportManifest = JSON.parse(a2[2]["responseText"]);
        CategorizeWeapons(JSON.parse(a2[2]["responseText"]));
        searchUpdate()
    });
    function FrameAjax(){
    return $.ajax({
        url: "https://api.warframestat.us/warframes",
        type: 'GET',
        dataType: 'json'
    })
    }

    function ManifAjax(){
    return $.ajax({
        url: "https://crossorigin.me/" + "http://content.warframe.com/MobileExport/Manifest/ExportManifest.json",
        //url: "http://content.warframe.com/MobileExport/Manifest/ExportManifest.json",
        type: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        dataType: 'json'
    })
    }

    function WeaponAjax(){
    return $.ajax({
        url: "https://api.warframestat.us/weapons",
        type: 'GET',
        dataType: 'json'
    })
    }
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
