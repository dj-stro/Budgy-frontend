import React, { createContext, useState, useContext, useEffect } from "react";
import { getUsers, addUser } from "../services/sqliteService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      const dbUsers = await getUsers();
      setUsers(dbUsers);

      const savedUserId = localStorage.getItem("currentUserId");
      const savedUser = dbUsers.find((u) => u.id.toString() === savedUserId);
      if (savedUser) setCurrentUser(savedUser);
      else if (dbUsers.length > 0) setCurrentUser(dbUsers[0]);
    };
    loadUsers();
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUserId", currentUser.id);
    }
  }, [currentUser]);

  const createUser = async (username) => {
    const newUser = await addUser(username);
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  return (
    <UserContext.Provider
      value={{ users, currentUser, setCurrentUser, createUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
