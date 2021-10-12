/* eslint-disable no-redeclare */
Array.prototype.insert = function(index, item) {
  this.splice(index, 0, item);
};

Array.prototype.last = function() {
  return this.slice(-1)[0];
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

var responseBuffer = "";

exports.ProcessRawData = (main, data) => {
  data = String(data); //Convert the object received from the connection to a string.
  console.log(data);
  const nostripdata = data.split(""); // Non-stripped type.
  data = data.substr(1); //Strip the type ID.
  data = data.split(""); //Split the raw message into seperate strings, removing the delimiter.
  const type = data[1]; // Assign a "type". Enter, TeamJoin, Exit etc.

  function RenXEvent(eventName, ...args) {
    main.RXEmit(eventName, ...args);
  }

  function SplitAString(toSplit) {
    return main.HelperFunctions.SplitAString(toSplit);
  }

  function CleanPlayerName(playerName) {
    return main.HelperFunctions.CleanPlayerName(playerName);
  }

  function friendlyClass(className) {
    return main.HelperFunctions.friendlyClass(className);
  }

  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, "g"), replace);
  }

  function SetPlayerInfo(value, key, Player) {
    var ThisPlayer = main.PlayerManager.GetPlayer("Name", Player.get("Name"));

    if (ThisPlayer === undefined) 
      RenXEvent("enter", Player.get("Team"), Player.get("Id"), Player.get("Name"), Player.get("Ip"), Player.get("Steam"));

    ThisPlayer = main.PlayerManager.GetPlayer("Name", Player.get("Name"));

    ThisPlayer[key] = friendlyClass(value);

    //console.info("setplayerinfo -> " + key + ": " + friendlyClass(value));
  }

  if (nostripdata[0] == "rNAME") {
    responseBuffer = [...data];
  } 
  else if (responseBuffer.length > 0 && nostripdata[0] != "rNAME") {
    responseBuffer = [...responseBuffer, ...data];
    //console.info(responseBuffer);
  }

  if (responseBuffer.length > 0 && responseBuffer.last().includes("c\n")) {
    processPlayerInfo(responseBuffer);
    responseBuffer = [];
    return;
  }

  //console.log(data);

  processData(data);

  if (data[0].startsWith("Conn")) RenXEvent("authenticated", true);
  else if (data[0].startsWith("Invalid")) RenXEvent("authenticated", false);
  else if (nostripdata[0].startsWith("v")) RenXEvent("version", data[2]);

  function processPlayerInfo(info) {
    const properties = ["NAME", "ID", "IP", "HWID", "PING", "TEAM", "STEAM", "ADMIN", "SCORE", "CREDITS", "CHARACTER"];
    var cleanInfo = [...info];
    var i, j;

    function cleanPlayerInfo(value, index) {
      if (value.includes("\nr"))
      {
        cleanInfo.splice(index + 1, null, cleanInfo[index].split("\nr")[1]);
        cleanInfo[index] = cleanInfo[index].split("\nr")[0];
      }
    }

    cleanInfo.forEach(cleanPlayerInfo);

    if (cleanInfo.last().includes("\nc\n"))
      cleanInfo[cleanInfo.length - 1] = cleanInfo.last().replace("\nc\n", "");

    cleanInfo = cleanInfo.slice(properties.length);

    for (i = 0; cleanInfo.length > 0; i++) {
      var NewMap = new Map();

      for (j = 0; j < properties.length; j++) {
        NewMap.set(properties[j].toLowerCase().capitalize(), cleanInfo[j]);
      }

      cleanInfo = cleanInfo.slice(properties.length);

      NewMap.forEach(SetPlayerInfo);
    }
  }

  function processData(data) {
    //console.log("type " + type);
    if (type == "Enter;") {
      const split = SplitAString(data[2]);
      const team = split[0];
      const pID = split[1];
      var pName = CleanPlayerName(data[2]);
      const pIP = data[4];
      var pSteam = data[8];

      if (pSteam === undefined)
        pSteam = "";

      RenXEvent("enter", team, pID, pName, pIP, pSteam);
    } else if (type == "HWID;") {
      const upname = data[3];
      const playerName = SplitAString(upname);
      const HWID = data[5];
      RenXEvent("hwid", main.PlayerManager.GetPlayer("Name", playerName), HWID);
    } else if (type == "Subscribed;") {
      RenXEvent("subscribed", data);
    } else if (type == "TeamJoin;") {
      const action = data[5];
      const split = SplitAString(data[2]);
      const team = split[0];
      const playerID = split[1];
      if (playerID.includes("b")) { playerName = "[B]" + playerName; }
      var playerName = split[2];
      RenXEvent("teamjoin", action, team, main.PlayerManager.GetPlayer("Name", playerName));
    } else if (type == "Exit;") {
      const split = SplitAString(data[2]);
      var playerName = split[2].trim();
      const playerID = split[1];
      const team = split[0];
      if (playerID.includes("b")) { playerName = "[B]" + playerName; }
      RenXEvent("exit", main.PlayerManager.GetPlayer("Name", playerName), team);
    } else if (type == "Purchase;") {
      const split = SplitAString(data[data.length - 1]);
      const playerID = split[1];
      var playerName = split[2].trim();
      const boughtClass = friendlyClass(data[3]);
      if (playerID.includes("b")) { playerName = "[B]" + playerName; }
      if (data[2] == "refill")
        RenXEvent("refill", main.PlayerManager.GetPlayer("Name", playerName));
      else if (data[2] == "character" || data[2] == "vehicle")
        RenXEvent("purchase"+data[2], main.PlayerManager.GetPlayer("Name", playerName), boughtClass);
    } else if (type == "Spawn;") {
      if (data[2] == "player") {
        const split = SplitAString(data[3]);
        const spawnClass = friendlyClass(data[data.length - 1].trim());
        const playerID = split[1];
        const team = split[0];
        var playerName = split[2];

        if (playerID.includes("b"))
          playerName = "[B]" + playerName;

        if (!data[3].includes("Harvester_")) {
          if (main.PlayerManager.GetPlayer("Name", playerName) === undefined)
            RenXEvent("enter", team, playerID, playerName, "127.0.0.1", team, true);
          RenXEvent("spawn", main.PlayerManager.GetPlayer("Name", playerName), spawnClass, team);
        }
      } else if (data[2].includes("bot")) {
        const split = SplitAString(data[3]);
        var botID = split[1];
        const team = split[0];
        var botName = split[2];
        botName = botName.replace("\n", "");
        botName = botName.replace("lGAME", "");
        RenXEvent("enter", team, botID, "[B]" + botName, "127.0.0.1", team, true);
        RenXEvent("spawn", main.PlayerManager.GetPlayer("Name", "[B]" + botName), "default", team);
      } else if (data[2].includes("vehicle")) {
        const split = SplitAString(data[3]);
        if (split[1] == "Rx_Vehicle_Harvester_GDI\n") {
          RenXEvent("harvyspawn", "GDI");
        } else if (split[1] == "Rx_Vehicle_Harvester_Nod\n") {
          RenXEvent("harvyspawn", "Nod");
        }
      }
    } else if (type == "Death;") {
      if (data[2] == "player" || data[2] == "bot") {
        const deathClass = friendlyClass(data[data.length - 1].trim());
        const split = SplitAString(data[3]);
        var playerName = split[2].trim();
        const playerID = split[1];
        const team = split[0];
        if (playerID.includes("b")) { playerName = "[B]" + playerName; }
        if (data[4] == "suicide by") {
          RenXEvent("suicide", main.PlayerManager.GetPlayer("Name", playerName), deathClass, team);
        } else if (data[4] == "by") {
          const kSplit = SplitAString(data[5]);
          var killerName = kSplit[2].trim();
          const killerPlayerID = kSplit[1];
          if (killerPlayerID.includes("b")) { killerName = "[B]" + killerName; }
          console.log(killerPlayerID + killerName + deathClass + playerName + "" + main.PlayerManager.GetPlayer("Name", playerName));
          if (killerPlayerID == "ai")
            RenXEvent("defensekill", killerName, main.PlayerManager.GetPlayer("Name", playerName), deathClass);
          else
            RenXEvent("kill", main.PlayerManager.GetPlayer("Name", killerName), main.PlayerManager.GetPlayer("Name", playerName), deathClass);
        }
      }
    } else if (type == "Destroyed;") {
      const deathClass = friendlyClass(data[data.length - 1].trim());
      var destroyedClass = friendlyClass(data[3]);
      const split = SplitAString(data[5]);
      var killerName = split[2].trim();
      const killerID = split[1];
      if (killerID.includes("b")) { killerName = "[B]" + killerName; }
      if (data[2].includes(("vehicle" || "emplacement" || "defence"))) {
        RenXEvent("vehiclekill", main.PlayerManager.GetPlayer("Name", killerName), destroyedClass, deathClass);
      } else {
        RenXEvent("buildingkill", main.PlayerManager.GetPlayer("Name", killerName), destroyedClass, deathClass);
      }
    } else if (type == "MatchEnd;") {
      const gdiScore = data[data.length - 2].substr(4);
      const nodScore = data[data.length - 1].substr(4);
      if (data[2].includes("tie")) {
        RenXEvent("tie", gdiScore, nodScore);
      } else if (data[3].includes("GDI" || "Nod")) {
        RenXEvent("matchend", data[3], gdiScore, nodScore);
      }
    } else if (type == "Start;") {
      const map = data[2].trim();
      RenXEvent("start", map);
    } else if (type == "Loaded;") {
      RenXEvent("loaded", data[2].trim());
    } else if (type == "Changing;") {
      RenXEvent("changing", data[2].trim());
    } else if (type == "Say;") {
      const split = SplitAString(data[2]);
      const team = split[0];
      const player = split[2];
      const msg = data[4].slice(0, data[4].length - 1);

      RenXEvent("say", main.PlayerManager.GetPlayer("Name", player), msg, team);
    } else if (type == "TeamSay;") {
      const split = SplitAString(data[2]);
      const team = split[0];
      const player = split[2];
      const msg = data[4].slice(0, data[4].length - 1);

      RenXEvent("teamsay", main.PlayerManager.GetPlayer("Name", player), msg, team);
    }
  }
};
