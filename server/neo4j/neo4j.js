// server/neo4j/neo4j.js
import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

let driver;

export async function initDriver() {
  const uri = process.env.NEO4J_URI;
  const username = process.env.NEO4J_USERNAME;
  const password = process.env.NEO4J_PASSWORD;

  driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
  await driver.verifyConnectivity();
}

export function getDriver() {
  return driver;
}

export async function closeDriver() {
  if (driver) {
    await driver.close();
  }
}