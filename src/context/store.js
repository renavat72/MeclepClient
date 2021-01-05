import React, { createContext, useContext, useReducer } from 'react';
import { authReducer, initialState } from './auth';
import { messageReducer, messageInitialState} from './message';
import { geolocationReducer, geolocationInitialState} from '../reducers/geolocation';



const StoreContext = createContext();

const store = {
  geolocation: geolocationInitialState,
  message: messageInitialState,
  auth: initialState,
};

const reducers = (store, action) => ({
  message: messageReducer(store.message, action),
  auth: authReducer(store.auth, action),
  geolocation: geolocationReducer(store.geolocation, action),

});

export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={useReducer(reducers, store)}>
    {children}
  </StoreContext.Provider>
);

export const useStore = () => useContext(StoreContext);