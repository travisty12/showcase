const Chat = (props) => {
  // console.log(props);
  const {user, message, createdAt} = props.chat;
  // console.log(createdAt);
  const nameToColor = (userName) => {
    let num = parseInt(userName, 36);
    return `rgba(${num >> 16}, ${(num >> 8) & 0xff}, ${num & 0xff}, ${createdAt ? 0.4 : 0.9}`;
  }
  return (
    <div className="Chat" style={{backgroundColor:`${nameToColor(user)}`}}>
      <p className="Message">{user}: {message}</p>
      <p className="Timestamp">{createdAt ? `Written ${createdAt}` : `pending...`}</p>
    </div>
  );
}


export default Chat;