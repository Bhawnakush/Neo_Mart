import passport from 'passport';
import * as driver from '../neo4j/neo4j.js'; // Import Neo4j driver
import '../config/passport-google.js'; // Import passport configuration
import axios from 'axios';

export const googleAuth = passport.authenticate('google', { session:true, scope: ['profile', 'email', 'https://www.googleapis.com/auth/contacts.readonly']});

export const googleAuthCallback = passport.authenticate('google', {
  session:true,
  successRedirect:`${process.env.BACKEND_HOST}/protected`,
  failureRedirect: `${process.env.FRONTEND_HOST}/login`},
);

export const googleAuthFailure = (req, res) => {
  res.status(401).json({
    message: 'Authentication failed!',
  });
};

export const protectedRoute = async (req, res) => {
  if(req.user) {
    const { displayName, email } = req.user.profile;
    console.log(req.user);

    const session = driver.getDriver().session(); // Create a new session
    try {
      // Save or update user data in Neo4j
      await session.run(
        'MERGE (u:User {id: $id}) ' +
        'SET u.name = $name, u.email = $email',
        {
          id: req.user.profile.id, // User ID from Google profile
          name: displayName,
          email: email
        }
      );

      res.json({
        message: `Hello ${displayName}, your email is ${email}`
      });
    } catch (error) {
      console.error('Error saving user to Neo4j:', error);
      res.status(500).send('Error saving user data');
    } finally {
      session.close(); // Always close the session after use
    }
  } else {
    res.status(401).send('Unauthorized');
  }
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error', err);
      res.status(500).send('Error');
    }
    req.session.destroy((err) => {
      res.redirect(`${process.env.FRONTEND_HOST}`);
    });
  });
};

export const usercontact = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  
  const accessToken = req.user.accessToken;
  console.log(accessToken); 

  try {
    let contacts = [];
    let nextPageToken = null;
    const pageSize = 1000; 
    do {
      const response = await axios.get('https://people.googleapis.com/v1/people/me/connections', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        params: {
          'pageSize': pageSize, // Fetch the maximum allowed number of contacts per request
          'pageToken': nextPageToken, // Token for fetching the next page, if it exists
          'personFields': 'names,emailAddresses,phoneNumbers',
        }
      });

      // Add the current page of contacts to the list
      const currentContacts = response.data.connections || [];
      contacts = contacts.concat(currentContacts);

      // Get the next page token, if it exists
      nextPageToken = response.data.nextPageToken;

    } while (nextPageToken); // Keep fetching until there's no more nextPageToken

    // Format contacts with names and phone numbers
    const formattedContacts = contacts.map(contact => ({
      name: contact.names ? contact.names[0].displayName : 'No name',
      phoneNumber: contact.phoneNumbers ? contact.phoneNumbers[0].value : 'No phone number',
      email: contact.emailAddresses ? contact.emailAddresses[0].value : 'No Email'
    }));

    // Sort the formatted contacts by name in ascending order
    const sortedContacts = formattedContacts.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // Ignore case while sorting
      const nameB = b.name.toUpperCase(); // Ignore case while sorting

      return nameA.localeCompare(nameB);
    });

    res.status(200).json(sortedContacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
};
