exports.run = (main, action, team, player) => {
  if (action == "left")
    main.DiscordSay(["public", "admin"], `**${player.GetDiscordName()}** switched to **${team}**!`);
  else
    main.DiscordSay(["public", "admin"], `**${player.GetDiscordName()}** joined **${team}**!`);
};
