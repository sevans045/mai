exports.run = (main, killer, victim, deathType) => {
  main.DiscordSay(["public", "admin"], `**${killer.GetDiscordName()}** killed **${victim.GetDiscordName()}** (**${killer.Character}/${deathType}** vs **${victim.Character}**).`);
};
