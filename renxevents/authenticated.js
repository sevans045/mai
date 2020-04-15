exports.run = (main, succeeded) => {
  switch (succeeded) {
    case true:
      console.info("Connection has been authenticated");
      main.DiscordSay(["admin"], "Connection has been authenticated.");
    break;
    case false:
      console.error("Invalid password! Authentication failed");
      main.DiscordSay(["admin"], "Invalid password! Authentication failed.");
  }
};
