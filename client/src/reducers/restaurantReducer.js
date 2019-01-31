export function restaurantReducer(state={},action)
{
switch(action.type)
{
    case "GET_RESTAURANT_DATA":
    return {...action.payload};
    case "GET_RESTAURANT_DATA_REJECTED":
    return {...action.payload};
    default:
    return state;

}

}