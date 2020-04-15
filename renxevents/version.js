exports.run = (main, version) => {
  version = version.replace("\n", "");

  main.DiscordSay(["admin"], `**Game Version**: ${version}`);
};
