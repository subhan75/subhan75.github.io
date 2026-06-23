import { createServer } from '../dist/server/server.js';

export default async function handler(req, res) {
  const server = await createServer();
  return server(req, res);
}
