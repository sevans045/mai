exports.run = (main) => {
  console.info(`Connection to ${main.config.host}:${main.config.port} successful`);
  main.DiscordSay(["admin"], `Connection to **${main.config.host}:${main.config.port}** successful.`);
  main.DiscordSay(["public"], "Connection to server successful.");
};
