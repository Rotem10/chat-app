import { Message } from '../types/message';
// todo: remove this line after server implementation

const endpoint = 'http://localhost:3000'; // todo: add endpoint (server) address (starting with http://)

/**
 * GET Request to get the list of messages
 **/
export async function getMessages() {
  // todo: replace this with fetch to get the messages from the server
  const messages = await fetch(`${endpoint}/messages`).then((res) =>
    res.json()
  );

  // todo: this should be implemented in the server. Chat Messages should already have the authors' names.
  // todo: remove this mapping when getting the data from the server
  return messages;
}

/**
 * GET request to get the full list of users - id + name
 **/
export async function getUsers() {
  // todo: replace this with fetch to get the user list from the server
  const users = await fetch(`${endpoint}/users`).then((res) => res.json());
  return users;
}

/**
 * GET request to get the full details of a user
 **/
export async function getUserDetails(userId: number) {
  // todo: replace this with fetch to get the user details from the server.
  //  For mocking example, we're calling an external JSON service.
  //  You can use mockUserDetails.ts for the list of user details in the server.
  const userDetails = await fetch(`${endpoint}/id=${userId}`).then((res) =>
    res.json()
  );
  return userDetails;
}

/**
 * POST request to add a message. The message contains: id, body, timestamp, authorId
 **/
export async function addNewMessage(message: Message) {
  // todo: implement sending a new message to the server

  const response = await fetch(`${endpoint}/new-message`, {
    method: 'POST',
    body: JSON.stringify(message),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.text());
  return response;
}

/**
 * POST request to change the user's like of a message
 **/
export async function changeMessageLikes(messageId: number, userId: number) {
  // todo: implement sending a rquest to change the like of a message by the user
  const response = await fetch(`${endpoint}/change-like`, {
    method: 'POST',
    body: JSON.stringify({ messageId, userId }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.text());
  return response;
}
