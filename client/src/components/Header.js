import { Link } from "react-router-dom";
import UserSearch from "./UserSearch";
import HeaderAccountInfo from "./HeaderAccountInfo";
import LinkList from "./LinkList";
import "./Header.css"

function Header() {
  return (
    <div className="Header">
      <div className = "HeaderTop">
        <HeaderAccountInfo />
        <h2><Link to="/">Home</Link></h2>
        <UserSearch />
      </div>
      <div className = "HeaderBottom">
        <LinkList />
      </div>
    </div>
  );
}

export default Header;
