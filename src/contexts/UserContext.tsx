import React, { createContext, useState, useContext, useEffect } from "react";
import type { User } from "../types/models.js";
import { getAllUsers } from "../services/userService.js"; 

interface UserContextType {
  users: User[];
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const defaultContextValue: UserContextType = {
  users: [],
  currentUser: null,
  setCurrentUser: () => {}, 
};

const UserContext = createContext<UserContextType>(defaultContextValue);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data: User[] = await getAllUsers(); 
        setUsers(data);

        const savedUserId = localStorage.getItem("currentUserId");
        const savedUser = data.find((u) => u.id === savedUserId); 

        if (savedUser) {
          setCurrentUser(savedUser!);
        } else if (data.length > 0) {
          setCurrentUser(data[0]!);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUserId", currentUser.id);
    }
  }, [currentUser]);

  const contextValue: UserContextType = { users, currentUser, setCurrentUser };
  
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => useContext(UserContext);