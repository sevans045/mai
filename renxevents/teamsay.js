exports.run = (main, player, text) => {
  main.DiscordSay(["admin"], `**${player.GetDiscordName()}**: ${text}`);
};
