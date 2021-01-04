import "./Chat.css";
import {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';

const ChatBox = ({socket, session}) => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    socket.on("load", (data) => {
      console.log(data);
      const reversed = data.reverse();
      setChats(reversed,...chats);
      scrollToBottom();
    });

    socket.on("push", ({user, message, createdAt}) => {
      setChats([...chats,{user, message, createdAt}]);
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
  
  return (
    <div className="ChatBox">
      <div className="ChatHeader">
        <div>
          <button>X</button>
          <button>-</button>
        </div>
        <p>Chat Box</p>
        <button>settings</button>
      </div>
      <div id="ChatBody">
        {chats && chats.length > 0 ?
        chats.map((chat, index) => <Chat key={index} chat={chat} />) : <p>Loading...</p>}
      </div>
      <form className="NewChatBox" onSubmit={handleSendMessage}>
        <input placeholder="New message..." />
      </form>
    </div>
  );
}

const mapStateToProps = ({socket, session}) => ({
  socket,
  session
});

export default connect(mapStateToProps)(ChatBox);
