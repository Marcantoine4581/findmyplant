let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let saveUserId = (uid) => {
    localStorage.setItem('userId', uid)
}

let saveUserName = (userName) => {
    localStorage.setItem('userName', userName)
}

let getUserId = () => {
    localStorage.getItem('userId')
}

let logout = () => {
    localStorage.removeItem('token')
}

let isLogged = () => {
    let token = localStorage.getItem('token')

    return !!token
}

export const accountService = {
    saveToken, logout, isLogged, saveUserId, getUserId, saveUserName
}