import * as driver from '../neo4j/neo4j.js';
const connectDB = async (uri, username, password) => {
    try {
        await driver.initDriver(uri, username, password);
        console.log('Connected to Neo4j');
    } catch (error) {
        console.error('Error connecting to Neo4j:', error);
        process.exit(1); // Exit the process if the connection fails
    }
}
export default connectDB;