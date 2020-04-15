exports.run = (main, player) => {
  main.DiscordSay(["public", "admin"], `**${player.GetDiscordName()}** left the game.`);
  main.PlayerManager.RemovePlayer("Name", player.Name);
};
