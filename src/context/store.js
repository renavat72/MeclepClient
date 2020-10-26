import React, { createContext, useContext, useReducer } from 'react';
import { authReducer, initialState } from './auth';
import { messageReducer, messageInitialState} from './message';


const StoreContext = createContext();

const store = {
  message: messageInitialState,
  auth: initialState,
};

const reducers = (store, action) => ({
  message: messageReducer(store.message, action),
  auth: authReducer(store.auth, action),
});

export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={useReducer(reducers, store)}>
    {children}
  </StoreContext.Provider>
);

export const useStore = () => useContext(StoreContext);