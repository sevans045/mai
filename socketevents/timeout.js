exports.run = (main) => {
  console.error(`Connection to ${main.config.host}:${main.config.port} timed out.`);
}
