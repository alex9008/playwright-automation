import * as nodeFetch from 'node-fetch';


export const getLoginToken = async (usernameInput, passwordInput) => {

    const response = await nodeFetch('http://localhost:2221/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameInput,
            password: passwordInput
        })
    })
    if (response.status !== 200) {
        throw new Error('Failed to get login token')
    }
    const data = await response.json()
    return data.token
}