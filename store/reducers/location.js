const initialState = {}
export const location = (state = initialState, {type, payload}) => {
  switch (type) {   
    case 'app/saveCurrentLocation':
      return {...state, ...payload}
    default:
      return state
  }
}