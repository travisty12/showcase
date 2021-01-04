const Chat = (props) => {
  console.log(props);
  const {user, message, createdAt} = props.chat;

  const nameToColor = (userName) => {
    let num = parseInt(userName, 36);
    return `rgba(${num >> 16}, ${(num >> 8) & 0xff}, ${num & 0xff})`;
  }
  return (
    <div className="Chat" style={{backgroundColor:`${nameToColor(user)}`}}>
      <p className="Message">{user}: {message}</p>
      <p className="Timestamp">Written {createdAt}</p>
    </div>
  );
}


export default Chat;