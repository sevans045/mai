exports.run = (main, Player) => {

  main.DiscordSay(["admin"], `**${Player.GetDiscordName()}** purchased a refill.`);
};
