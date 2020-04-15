exports.run = (main, player, spawnClass) => {

  if (spawnClass == "default" || spawnClass.split(",")[0] == "Nod" || spawnClass.split(",")[0] == "GDI" && spawnClass.split(",").Length === 3)
    player.Character = player.Team + " Soldier";
  else
    player.Character = spawnClass;

  main.DiscordSay(["public", "admin"], `**${player.GetDiscordName()}** spawned as a **${player.Character}**.`);
};
