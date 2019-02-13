export function restaurantReducer(state={restaurantData:[],error:{}},action)
{
switch(action.type)
{
    case "GET_RESTAURANT_DATA":
    return {...state,restaurantData:[...action.payload],error:{}};
    case "GET_RESTAURANT_DATA_REJECTED":
    return {...state,error:{...action.payload},restaurantData:[]};
    default:
    return state;

}

}