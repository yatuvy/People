import {createContext, useEffect, useState} from "react";
import axios from "axios";

const serverUrl = `http://localhost:3000`;

export const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {
  console.log('PeopleProvider', children);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/people/randomPeople`);
        setPeople(res.data);
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    };
    fetchPeople();
  }, []);

  return (
    <PeopleContext.Provider value={{ people, setPeople }}>
      {children}
    </PeopleContext.Provider>
  );
};
