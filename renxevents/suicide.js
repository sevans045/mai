exports.run = (main, player, deathClass) => {
  main.DiscordSay(["public", "admin"], `**${player.GetDiscordName()}** died. (${deathClass})`);
};
