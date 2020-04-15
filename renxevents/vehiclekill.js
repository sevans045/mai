exports.run = (main, killer, victim, deathType) => {
  main.DiscordSay(["public", "admin"], `**${killer.GetDiscordName()}** destroyed a **${victim}** (**${deathType}**).`);
};
