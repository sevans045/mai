exports.run = (main, killer, victim, deathType) => {
  main.DiscordSay(["public", "admin"], `**${killer}** killed **${victim.GetDiscordName()}** (**${deathType}**).`);
};
