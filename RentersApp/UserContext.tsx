import { createContext, useState } from 'react';

export const UserContext = createContext({
  userType: '',
  setUserType: (userType: string) => {},
  loggedin: false,
  setLoggedin: (loggedin: boolean) => {},
  userID: '',
  setUserID: (userID: string) => {}
});

export function UserContextProvider(props: { children: React.ReactNode }) {
  const [userType, setUserType] = useState('');
  const [loggedin, setLoggedin] = useState(false);
  const [userID, setUserID] = useState('');

  return (
    <UserContext.Provider
      value={{ userType, setUserType, loggedin, setLoggedin, userID, setUserID }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
