import React, { createContext, useState, useContext, useEffect } from "react";
import { getAllUsers } from "../services/userService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);

        const savedUserId = localStorage.getItem("currentUserId");
        const savedUser = data.find((u) => u.id.toString() == savedUserId);

        if (savedUser) {
          setCurrentUser(savedUser);
        } else if (data.length > 0) {
          setCurrentUser(data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);
  // keep localStorage updated when user changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUserId", currentUser.id);
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ users, currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
