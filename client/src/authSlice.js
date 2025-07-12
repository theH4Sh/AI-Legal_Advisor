const initialState = {
    username: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username,
            state.accessToken = action.payload.access,
            state.refreshToken = action.payload.refresh,
            state.isAuthenticated = action.isAuthenticated
        },
        logout: state => {
            state.username = null,
            state.accessToken = null,
            state.refreshToken = null,
            state.isAuthenticated = false
        }
    }
})

export const { login, logut } = authSlice.actions

export default authSlice.reducer