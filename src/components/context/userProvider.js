import React, { createContext, useState } from "react";

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

function UserProvider({ children }) {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cartProducts-live")) || {}
  );

  return (
    <UserContext.Provider value={cart}>
      <UserDispatchContext.Provider value={setCart}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext, UserDispatchContext };
