exports.run = (main) => {
  console.error(`Connection to ${main.config.host}:${main.config.port} closed`);
  main.DiscordSay(["admin"], `Connection to **${main.config.host}:${main.config.port}** closed.`);
  main.DiscordSay(["public"], "Connection to server closed.");
};
