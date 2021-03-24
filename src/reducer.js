export const initialState={
    user: null,
    list: [],

}

export const reducer = (state,action) => {
    switch (action.type){
        case 'UPDATE_USER':
            console.log(action.user)
            return {...state,user:action.user};
        
        case "CHANGE_LIST":
            console.log(action.list);
            return{...state,list:action.list}
        default:
            return {...state};
    }
}

