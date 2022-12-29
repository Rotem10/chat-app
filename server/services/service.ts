import { mockMessages, setMessages } from '../models/Messages';
import { mockUsers } from '../models/Users';
import { mockUserDetails } from '../models/UsersDetails';

interface Message {
  authorId: number;
  id: number;
  body: string;
  timestamp: number;
  likes: number[];
}

function getMessages() {
  const messages = mockMessages.map((message) => {
    const name = mockUsers.find(({ id }) => id === message.authorId)?.name;
    return { ...message, authorName: name };
  });
  return messages;
}

function getUsers() {
  return mockUsers;
}

function getUsersDetails(userId: string) {
  const user = mockUserDetails.find(({ id }) => id.toString() === userId);
  return user;
}

function addNewMessage(message: Message) {
  message.likes = [];
  const copyMessages = JSON.parse(JSON.stringify(mockMessages));
  copyMessages.push(message);
  setMessages(copyMessages);
}

function changeLike({
  messageId,
  userId,
}: {
  messageId: number;
  userId: number;
}) {
  const copyMessages = JSON.parse(JSON.stringify(mockMessages));
  let message = copyMessages.find(({ id }: { id: number }) => id === messageId);
  if (message.likes.includes(userId)) {
    message.likes = message.likes.filter((like: number) => like !== userId);
  } else {
    message.likes.push(userId);
  }
  setMessages(copyMessages);
}

export default {
  getMessages,
  getUsers,
  getUsersDetails,
  addNewMessage,
  changeLike,
};
