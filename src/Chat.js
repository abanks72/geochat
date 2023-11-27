import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { getAuth } from 'firebase/auth';
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Input,
  Button,
} from 'reactstrap';
import './Chat.css';

function Chat({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const auth = getAuth();
  const chatsCollectionRef = collection(db, 'chats');
  const chatRoom = chatId === 'Atlanta' ? 'Atlanta' : 'SanFrancisco';

  useEffect(() => {
    if (auth.currentUser) {
      const messagesQuery = query(
        collection(chatsCollectionRef, chatRoom, 'messages'),
        orderBy('timestamp'),
        limit(50)
      );

      const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
        const messageData = [];
        querySnapshot.forEach((doc) => {
          messageData.push({ id: doc.id, ...doc.data() });
        });
        setMessages(messageData);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [chatId, chatRoom, auth.currentUser]);

  const handleSendMessage = async () => {
    if (messageInput.trim() === '') return;

    const newMessage = {
      text: messageInput,
      timestamp: new Date(),
    };

    try {
      const docRef = await addDoc(collection(chatsCollectionRef, chatRoom, 'messages'), newMessage);
      setMessages([...messages, { id: docRef.id, ...newMessage }]);
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Container>
      {auth.currentUser && (
        <Card className="my-4">
          <CardBody>
            <CardTitle tag="h2">Chat</CardTitle>
            <div className="chat-container">
              {messages.map((message) => (
                <CardText key={message.id}>{message.text}</CardText>
              ))}
            </div>
            <div className="message-input">
              <Input
                type="text"
                placeholder="Type a message"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <Button color="primary" onClick={handleSendMessage}>
                Send
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
    </Container>
  );
}

export default Chat;

