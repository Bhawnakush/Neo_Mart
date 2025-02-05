// models/User.js
import * as driver from './neo4j.js'; // Import your Neo4j driver

// Function to find a user by Google ID
export const findUserByGoogleId = async (googleId) => {
  const session = driver.getDriver().session();
  try {
    const result = await session.run('MATCH (u:User {googleId: $googleId}) RETURN u', { googleId });
    return result.records.length ? result.records[0].get('u').properties : null;
  } finally {
    await session.close();
  }
};

//Function to find user by email
export const findUserByEmail = async (email) => {
  const session = driver.getDriver().session();
  try {
    const result = await session.run('MATCH (u:User {email: toLower($email)}) RETURN u', { email });
    return result.records.length ? result.records[0].get('u').properties : null;
  } finally {
    await session.close();
  }
};

//Function to create a user
export const createUser = async (id,name,email,password) => {
  const session = driver.getDriver().session();
  try {
    const result = await session.run(
      'CREATE (u:User {id: $id, name: $name, email: toLower($email), password: $password}) RETURN u',
      {id, name, email, password}
    );
    return result.records.length ? result.records[0].get('u').properties : null;
  } finally {
    await session.close();
  }
};

//find user by id
export async function findUserById(userId) {
  const session = driver.getDriver().session();
  try {
    const result = await session.run(
      `MATCH (u:User {id: $userId}) RETURN u`,
      { userId } // Passing the userId as a parameter
    );
    // Check if the user exists
    return result.records.length ? result.records[0].get('u').properties : null;
  } finally {
    // Close the session
    await session.close();
  }
}
