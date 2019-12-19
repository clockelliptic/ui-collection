export const Actions = {
    INC_PAGE: 'INC_PAGE',
    DEC_PAGE: 'DEC_PAGE',
    SET_PAGE: 'SET_PAGE',
    DISABLE: 'DISABLE',
    ENABLE: 'ENABLE'
}

export const stateReducer = (state, action) => {
    switch (action.type) {
        case 'INC_PAGE':
            return { ...state, curPage: state.curPage+1 }
        case 'DEC_PAGE':
            return { ...state, curPage: state.curPage-1 }
        case 'SET_PAGE':
            return { ...state, curPage: action.page }
        case 'DISABLE':
            return { ...state, isEnabled: false }
        case 'ENABLE':
            return { ...state, isEnabled: true }
    }
}