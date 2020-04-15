exports.run = (main, winner, GDIScore, NodScore) => {
  var emoji = "";

  if (winner == "GDI")
    emoji = "%gdi%";
  else
    emoji = "%nod%";

  main.DiscordSay(["public", "admin"], `**${emoji}${winner}** won the match. %gdi%**GDI**: ${GDIScore} %nod%**Nod**: ${NodScore}`);
};
