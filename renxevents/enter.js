exports.run = (main, team, pID, pName, pIP, pSteam, isbot = false) => {
  var NewPlayer = new main.PlayerManager.Player(pName, pID, pIP, pSteam, team, isbot);
  var teamname = "";
  var emoji = "";

  if (team == "GDI")
  {
    teamname = "Global Defense Initiative";
    emoji = "%gdi%";
  }
  else if (team == "Nod")
  {
    teamname = "Brotherhood of Nod";
    emoji = "%nod%";
  }
  else
    teamname = "Neutral";

  main.DiscordSay(["public"], `**${NewPlayer.GetDiscordName()}** joined the game, fighting for the ${emoji}**${teamname}**!`);

  if (!isbot)
    main.DiscordSay(["admin"], `**${NewPlayer.GetDiscordName()}** joined the game, fighting for the ${emoji}**${teamname}**! **IP**: ${NewPlayer.Ip} **Steam**: ${NewPlayer.Steam}`);
  else
    main.DiscordSay(["admin"], `**${NewPlayer.GetDiscordName()}** joined the game, fighting for the ${emoji}**${teamname}**!`);
};
