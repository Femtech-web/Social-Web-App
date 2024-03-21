export default function serverConfig(server, config) {
  server.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`)
  });
}