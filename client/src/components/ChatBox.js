import "./Chat.css";
import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import {toggleChat} from '../actions/chat';

const ChatBox = ({socket, session, chatOpen, toggleChat}) => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    socket.on("load", (data) => {
      const reversed = data.reverse();
      setChats(reversed,...chats);
      scrollToBottom();
    });

    socket.on("push", ({_id, user, message, createdAt}) => {
      setChats([...chats,{_id, user, message, createdAt}]);
      scrollToBottom();
    });
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("newChat",{session, message: e.target[0].value});
    e.target[0].value = "";
  }

  const scrollToBottom = () => {
    const chat = document.getElementById('ChatBody');
    chat.scrollTop = chat.scrollHeight;
  }

  const handleToggleChat = () => {
    toggleChat();
  }
  
  return (
    <div className="ChatBox">
      <div className="ChatHeader">
        <div>
          <button onClick={handleToggleChat}>X</button>
        </div>
        <p>Chat Box</p>
        <button>settings</button>
      </div>
      { chatOpen ? 
      <React.Fragment>
        <div id="ChatBody">
          {chats && chats.length > 0 ?
          chats.map((chat, index) => <Chat key={index} chat={chat} />) : <p>Loading...</p>}
        </div>
        <form className="NewChatBox" onSubmit={handleSendMessage}>
          <input placeholder="New message..." />
        </form>
      </React.Fragment>
      : <React.Fragment></React.Fragment>}
    </div>
  );
}

const mapStateToProps = ({socket, session, chatOpen}) => ({
  socket,
  session,
  chatOpen
});

const mapDispatchToProps = dispatch => ({ 
  toggleChat: _ => dispatch(toggleChat())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
