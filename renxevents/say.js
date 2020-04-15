exports.run = (main, player, text) => {
  main.DiscordSay(["public", "admin"], `**${player.GetDiscordName()}**: ${text}`);
};
