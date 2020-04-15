exports.run = (main, error) => {
  if (error.code == "ECONNREFUSED") {
    console.error(`${error.code}: ${main.config.host}:${main.config.port} refused connection. Make sure a server is running or that the host & port are correct.`);
  }
};
