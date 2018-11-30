let totalState = {
    token:null
};
export default function (state = totalState, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                token: action.token
            });
        default:
            return state;
    }
}