exports.run = (main, GDIScore, NodScore) => {
  main.DiscordSay(["public", "admin"], `The game ended in a tie. %gdi%: ${GDIScore} %nod%: ${NodScore}`);
};
