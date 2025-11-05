import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload.access
            state.refreshToken = action.payload.refresh
            state.isAuthenticated = true
        },
        logout: state => {
            state.accessToken = null
            state.refreshToken = null
            state.isAuthenticated = false
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer