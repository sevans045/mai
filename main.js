if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

// Load node modules
const net = require("net");
const fs = require("fs");
const EventEmitter = require("events");
require("console-stamp")(console, "HH:MM:ss");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-sqlite");

// Load Discord related things
const Discord = require("discord.js");
//const SQLite = require("better-sqlite3");
//const sql = new SQLite("./scores.sqlite");
const DiscordClient = new Discord.Client({autoReconnect: true});

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
DiscordClient.commands = new Enmap();
DiscordClient.aliases = new Enmap();

// TCP/RenX
var client;

// Load static files
const config = require("./config.js");
const package = require("./package.json");

DiscordClient.config = config;

// Load all of our core modules
const RCONParser = require("./core/RCONParser.js");
const HelperFunctions = require("./core/HelperFunctions.js");
const PlayerManager = require("./core/PlayerManager.js");
DiscordClient.logger = require("./core/Logger");
require("./core/functions.js")(DiscordClient);

// Some variables we need for discord
var prefix = config.prefix;
var guild;
var messagecaches = {};
var loadedchannels = {};
var gdiicon, nodicon;

// Attach these to main so we can pass that to all the events and access these objects
exports.PlayerManager = PlayerManager;
exports.HelperFunctions = HelperFunctions;
exports.config = config;

// Function for emiting renx events, this activates files in renxevents
exports.RXEmit = function(eventName, ...args) {
  RenX.emit(eventName, ...args);
};

// How we communicate with Discord
exports.DiscordSay = function(channels, text) {
  if (gdiicon != null)
    text = text.replace(/%gdi%/gi, gdiicon);
  if (nodicon != null)
    text = text.replace(/%nod%/gi, nodicon);

  AddChannelMessage(channels, text);
};

// To fetch info
exports.StartClientListLoop = function() {
  ClientListLoop();
  setInterval(ClientListLoop, 5000);
  setInterval(ClientListLoopBot, 7500);
};

function ClientListLoop() {
  client.write("cClientVarList NAME ID IP HWID PING TEAM STEAM ADMIN SCORE CREDITS CHARACTER\n");
}

function ClientListLoopBot() {
  client.write("cBotVarList ID NAME TEAM SCORE CREDITS CHARACTER\n");
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

DiscordClient.on("ready", () => {
  console.info(`Loading Mai ${package.version}`);
  console.info("Starting Discord client");

  guild = DiscordClient.guilds.first();

  if (guild == null)
    throw new Error("This bot is was not invited to any guild");

  Object.keys(config.channels).forEach(function(channel) {
    if (!Object.keys(loadedchannels).includes(config.channels[channel]))
      loadedchannels[config.channels[channel]] = [channel];
    else
      loadedchannels[config.channels[channel]].push(channel);
  });

  gdiicon = DiscordClient.emojis.find(emoji => emoji.name === config.gdiemojiname);
  nodicon = DiscordClient.emojis.find(emoji => emoji.name === config.nodemojiname);

  if (gdiicon == null || nodicon == null)
    throw new Error("Please include gdiicon and nodicon in your config correctly.");

  setInterval(SendMessages, 2000);
});

DiscordClient.on("message", message => {
  if (message.author === DiscordClient.user) return;

  if (message.content.startsWith(prefix + "ping")) message.channel.send("pong");
  if (message.content.startsWith(prefix + "rc") && permlevel(message) >= 3) client.write(`c${message.content.slice(0, message.content.length - 3)}`);

  if (!message.content.startsWith(prefix))
    client.write(`cHostSay ${message.author.username}: ${message.content}\n`);
});

function AddChannelMessage(channels, text) {
  channels.forEach(channeltype => {
    if (Object.keys(loadedchannels).includes(channeltype)) {
      loadedchannels[channeltype].forEach(channelname => {
        if (Object.keys(messagecaches).includes(channelname))
          messagecaches[channelname].push(text);
        else
          messagecaches[channelname] = [text];
      });
    }
  });

  setInterval(SendMessages, 2000);
}

function SendMessages() {
  let message = "";

  Object.keys(messagecaches).forEach(channelname => {
    messagecaches[channelname].forEach(cachedmessage => {
      message += cachedmessage + "\n";
    });

    if (message != "")
      guild.channels.find(channel => channel.name == channelname).send(message);
    message = "";

    messagecaches[channelname] = [];
  });
}

const init = async () => {

  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const cmdFiles = await readdir("./discordcommands/");
  console.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = DiscordClient.loadCommand(f);
    if (response) console.log(response);
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./discordevents/");
  console.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    console.log(`Loading Event: ${eventName}`);
    const event = require(`./discordevents/${file}`);
    // Bind the DiscordClient to any event, before the existing arguments
    // provided by the discord.js event.
    // This line is awesome by the way. Just sayin'.
    DiscordClient.on(eventName, event.bind(null, DiscordClient));
  });

  // Generate a cache of client permissions for pretty perm names in commands.
  DiscordClient.levelCache = {};
  for (let i = 0; i < DiscordClient.config.permLevels.length; i++) {
    const thisLevel = DiscordClient.config.permLevels[i];
    DiscordClient.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Here we login the client.
  DiscordClient.login(DiscordClient.config.token);

// End top-level async/await function.
};

init();

Connect();

function Connect() {
  // Create TCP socket to the game server.
  client = new net.Socket();
  sleep(5000).then(() => {
    client.connect(config.port, config.host, function() {
      //Authenticate.
      console.info("Attempting to authenticate");
      client.write("a" + config.pass + "\n");
  
      //Subscribe to public log.
      console.info("Subscribing to public log");
      client.write("s\n");
    });
  });
}

// This loop reads the /renxevents/ folder and attaches each event file to the appropriate event.
var RenX = new EventEmitter();
fs.readdir("./renxevents/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const eventFunction = require(`./renxevents/${file}`);
    const eventName = file.split(".")[0];
    RenX.on(eventName, (...args) => eventFunction.run(this, ...args));
  });
});

// This loop reads the /socketevents/ folder and attaches each event file to the appropriate event.
fs.readdir("./socketevents/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const eventFunction = require(`./socketevents/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(this, ...args));
  });

  client.removeAllListeners("data");
  client.on("data", (...args) => RCONParser.ProcessRawData(this, ...args));
});

//Watch for commands from the CLI or stdin
process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", function(text) {
  if (text === "quit\n")
    client.destroy();
  else // \n is automatically appended when the user presses enter.
    client.write("c" + text);
});