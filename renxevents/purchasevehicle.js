exports.run = (main, Player, Purchased) => {

  main.DiscordSay(["admin"], `**${Player.GetDiscordName()}** purchased a **${Purchased}**.`);
};
