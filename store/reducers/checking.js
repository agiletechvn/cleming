const initialState = {
    data: {
        revenue: '',
        mcTotalMoney: 0,
        clmTotalMoney: 0,
        charge: 0,
    }
}

export const checking = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'app/setCheckingData':
            return {
                ...state,
                data: payload.data,
            }
        default:
            return state;
    }
}