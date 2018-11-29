let totalState = {
    isLogin: false,
    username: '',
    password: '',
    activityList: []
};
export default function (state = totalState, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                isLogin: true
            });
        default:
            return state;
    }
}