export const SET_CITY = 'SET_CITY';


export const geolocationInitialState = {
    city: null,
    lat:null,
    lng:null,
  };
 
  export const geolocationReducer = (state = geolocationInitialState, action) => {
    switch (action.type) {
      case SET_CITY:
        return {
          ...state,
            city: action.payload,
            lat:action.payload,
            lng:action.payload,
        };
  
      default:
        return state;
    }
  };
  