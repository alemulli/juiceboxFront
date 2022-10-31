const BASE_URL = "https://shielded-fjord-88557.herokuapp.com";

export async function LogIn(username, password) {
    try {
        const options = {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    username,
                    password,
        })}
    
        const response = await fetch (`${BASE_URL}/api/users/login`, options)
        const result = await response.json()
        console.log(result)

        
        return result
    } catch (error) {
        console.error(error)
    }
}

export async function GetPosts() {
    try {
        const response = await fetch (`${BASE_URL}/api/posts`)
        const result = await response.json()
        const postResult = result.posts
        return postResult
    } catch (error) {
        console.error(error)
    }
}