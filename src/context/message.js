export const SET_MESSAGE = 'SET_MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

export const messageInitialState = {
  content: {
    type: '',
    text: '',
    autoClose: true,
  },
};

export const messageReducer = (state = messageInitialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        content: {
          type: action.payload.type,
          text: action.payload.text,
          autoClose: action.payload.autoClose,
        },
      };
    case CLEAR_MESSAGE: {
      return {
        ...state,
        ...messageInitialState,
      };
    }

    default:
      return state;
  }
};
