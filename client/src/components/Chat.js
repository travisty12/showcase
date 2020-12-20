import "./Chat.css";

function Chat() {
  return (
    <div className="Chat">
      <div className="ChatHeader">
        <div>
          <button>X</button>
          <button>-</button>
        </div>
        <p>Chat Box</p>
        <button>settings</button>
      </div>
      <div className="ChatBody">

      </div>
      <div className="NewChatBox">
        <input placeholder="New message..." />
      </div>
    </div>
  );
}

export default Chat;
