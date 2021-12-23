const KEY_USER = 'user'

export const saveUser = (userData) => {
    if (!localStorage) return
    localStorage.setItem(KEY_USER, userData)
}

export const removeUser = () => {
    if (!localStorage) return
    localStorage.removeItem(KEY_USER)
}

export const getCurrentUser = () => {
    if (!localStorage) return undefined
    return JSON.parse(localStorage.getItem(KEY_USER))
}

export const getAuthToken = () => {
    const user = getCurrentUser()

    if (user) {
        return 'Bearer ' + user.accessToken
    }
    return ''
}
