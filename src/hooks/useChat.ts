import { useEffect, useState } from 'react';
import { Message } from '../types/message';
import { User } from '../types/user';
import {
  addNewMessage,
  changeMessageLikes,
  getMessages,
  getUserDetails,
  getUsers,
} from './server-requests';

export function useChat() {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    getUsers().then((userList) => {
      setUsers(userList);
      setCurrentUser(userList[0]);
    });

    getMessages().then((messageList) => {
      setMessages(messageList);
    });
  }, []);

  const [selectedAuthor, setSelectedAuthor] = useState<User | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showMessageDetails, setShowMessageDetails] = useState<boolean>(false);

  const selectUser = (id: string) => {
    const foundUser = users.find((user) => user.id === +id);
    foundUser && setCurrentUser(foundUser);
  };

  const addMessage = async (event: any) => {
    if (event.key === 'Enter' && event.target.value) {
      const newMessage = {
        id: messages.length + 1, // in reality, id should be added by the server
        timestamp: new Date(),
        body: event.target.value,
        authorId: currentUser!.id,
        // todo: likes should be initialized in the server,
        // todo: authorName should be added by the server
      };

      // todo - bonus: handle changing the message status from 'pending' to 'ok'
      //  when a success response is returned from the server
      const response = await addNewMessage(newMessage);

      if (response === 'success') {
        getMessages().then((messageList) => {
          setMessages(messageList);
        });
      }
      event.target.value = '';
      // todo - remove these lines - mocking changing the message status
    }
  };

  const toggleLike = async (message: Message) => {
    // todo: change the likes in the server
    const response = await changeMessageLikes(message.id, currentUser!.id);
    if (response === 'success') {
      getMessages().then((messageList) => {
        setMessages(messageList);
      });
    }
  };

  const openAuthorDetails = async (author: User) => {
    setSelectedAuthor(author); // name and id only
    setSelectedAuthor((await getUserDetails(author.id)) || null);
    // todo: get user details from the server
  };

  return {
    messages,
    users,
    currentUser,
    selectedAuthor,
    selectedMessage,
    showMessageDetails,
    setSelectedAuthor,
    setSelectedMessage,
    setShowMessageDetails,
    openAuthorDetails,
    selectUser,
    addMessage,
    toggleLike,
  };
}
