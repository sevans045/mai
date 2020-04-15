exports.run = (main, data) => {
  const cNumber = data[2].substr(4).trim();

  main.DiscordSay(["admin"], `Subscribed as **${cNumber}**.`);

  main.StartClientListLoop();
};
