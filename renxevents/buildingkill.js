exports.run = (main, killer, victim, deathType) => {
  main.DiscordSay(["public", "admin"], `**${killer.GetDiscordName()}** destroyed the **${victim}** (${deathType}).`);
};
