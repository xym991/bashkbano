export const initialState = {
  user: null,
  list: [],

  roomFilters: {
    rooms: [],
    bathrooms: [],
    propertyType: [],
    furnished: [],
    preferredGender: [],
  },

  roommateFilters: { lookingFor: [], children: [], gender: [], age: [] },
  filteredList: [],
  city: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      // console.log(action.user)
      return { ...state, user: action.user };

    case "CHANGE_LIST":
      // console.log(action.list);
      return { ...state, list: action.list, filteredList: [] };

    case "CHANGE_CITY":
      // console.log(action.city);
      return {
        ...state,
        city: action.city,
        roomFilters: {
          rooms: [],
          bathrooms: [],
          propertyType: [],
          furnished: [],
          preferredGender: [],
        },
        roommateFilters: { lookingFor: [], children: [], gender: [], age: [] },
      };
    case "SET_FILTER":
      // console.log(action);
      if (action.filterType == "rooms") {
        if (state.roomFilters[action.arr[0]]?.includes(action.arr[1])) {
          return {
            ...state,
            roomFilters: {
              ...state.roomFilters,
              [action.arr[0]]: state.roomFilters[action.arr[0]]?.filter(
                (item) => item !== action.arr[1]
              ),
            },
          };
        } else {
          return {
            ...state,
            roomFilters: {
              ...state.roomFilters,
              [action.arr[0]]: state.roomFilters[action.arr[0]]?.concat([
                action.arr[1],
              ]),
            },
          };
        }
      } else {
        if (state.roommateFilters[action.arr[0]]?.includes(action.arr[1])) {
          return {
            ...state,
            roommateFilters: {
              ...state.roommateFilters,
              [action.arr[0]]: state.roommateFilters[action.arr[0]]?.filter(
                (item) => item != action.arr[1]
              ),
            },
          };
        } else {
          return {
            ...state,
            roommateFilters: {
              ...state.roommateFilters,
              [action.arr[0]]: state.roommateFilters[action.arr[0]]?.concat([
                action.arr[1],
              ]),
            },
          };
        }
      }

    case "CHANGE_FILTERED_LIST":
      // console.log(action);
      return { ...state, filteredList: action.list };

    default:
      return { ...state };
  }
};
