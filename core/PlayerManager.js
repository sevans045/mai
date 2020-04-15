var Players = [];

exports.Player = Player;
exports.Players = Players;
exports.GetPlayerCount = GetPlayerCount;
exports.GetPlayer = GetPlayer;
exports.RemovePlayer = RemovePlayer;

function GetPlayerCount() {
  return Players.length;
}

function GetPlayer(Property, Value) {
  return Players.find(Player => Player[Property] == Value);
}

function RemovePlayer(Property, Value) {
  if (this.GetPlayer(Property, Value) != undefined) {
    Players.findIndex();
  }
}

function Player(name, id, ip, steam, team, isbot) {
  if (Players.find(Player => Player["Name"] == name && !Player["bBot"]))
    throw new Error("Tried to create new Player with the same name as existing one. " + name);
  else if (Players.find(Player => Players["Name"] == name && Player["bBot"])) 
    return;

  console.log("New player " + name);

  this.Name = name;
  this.Id = id;
  this.Ip = ip;
  this.Steam = steam;
  this.Hwid = 0;
  this.Team = team;
  this.Kills = 0;
  this.Deaths = 0;
  this.Score = 0;
  this.Ping = 0;
  this.Credits = 0;
  this.bBot = isbot;
  this.Character = "";
  this.Admin = "";

  Players.push(this);
}

Player.prototype.KD = this.Kills/this.Deaths;
Player.prototype.valueOf = function() { return this.Name; };
Player.prototype.GetDiscordName = function() {if (this.Team == "GDI") return "%gdi%" + this.Name; else if (this.Team == "Nod") return "%nod%" + this.Name; else return this.Name;};