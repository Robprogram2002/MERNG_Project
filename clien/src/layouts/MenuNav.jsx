import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
const MenuNav = () => {
  const [activeItem, setActiveItem] = useState("home");
  const auth_context = useContext(AuthContext);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div>
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Item
          name="messages"
          active={activeItem === "messages"}
          onClick={handleItemClick}
          as={Link}
          to="/messeges"
        />
        {auth_context.user ? (
          <Menu.Menu position="right">
            <Menu.Item
              name={auth_context.user.username}
              active={activeItem === "user"}
            />
            <Menu.Item name="LogOut" onClick={auth_context.logOut} />
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item
              name="login"
              active={activeItem === "login"}
              onClick={handleItemClick}
              as={Link}
              to="/login"
            />
            <Menu.Item
              name="register"
              active={activeItem === "register"}
              onClick={handleItemClick}
              as={Link}
              to="/register"
            />
          </Menu.Menu>
        )}
      </Menu>
    </div>
  );
};

export default MenuNav;
