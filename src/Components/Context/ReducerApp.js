export const getBasketTotal = (basket) => {
    return basket.reduce((accumelator, current) => {
        return accumelator + current.price
    }, 0)
}


export const initializeState = {
    basket: [],
    user: null
}


const ReducerApp = (state = initializeState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }

        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        case "REMOVE_FROM_BASKET":
            return {
                ...state,
                basket: state.basket.filter((item) => item.id !== action.id)
            }
        case "EMPTY_BASKET":
            return {
                ...state,
                basket: [],
            };
        default:
            return state;
    }
}

export default ReducerApp