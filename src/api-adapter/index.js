const BASE_URL = "https://shielded-fjord-88557.herokuapp.com";
// const BASE_URL = "http://localhost:8080"

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
        return result

    } catch (error) {
        console.error(error)
    }
}

export async function registerUser(username, password, name, location) {
    const registerOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
            username,
            password,
            name, 
            location
      }),
    };
  
    const response = await fetch(
      `${BASE_URL}/api/users/register`,
      registerOptions
    );

    const result = await response.json();
    console.log(result);
    return result
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

export async function makePost(title, content, tags){
    try {
        const options = {
            method:"POST",
            headers: {
                'Content-Type':"application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }, body: JSON.stringify({
                    title,
                    content,
                    tags
            })
        }
        
        const response = await fetch (`${BASE_URL}/api/posts`, options)
        const result = await response.json()

        return result

    } catch (error) {
        console.error(error)
    }
}

export async function getUser() {
    try {
        const response = await fetch (`${BASE_URL}/api/users`)
        const result = await response.json()
        const userResults = result.users
        const singleUser = userResults.filter((user)=>{
            if (user.username === localStorage.getItem("username")) {
                return user
            }
        })
        return singleUser
    } catch (error) {
        console.error(error)
    }
}

export async function deletePost(postIdDelete) {
    try {
        const options = {
            method:"DELETE",
            headers: {
                'Content-Type':"application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        const response = await fetch(`${BASE_URL}/api/posts/${postIdDelete}`, options)
        console.log(response)
        const data = await response.json();
        }
        
     catch (error) {
        console.error(error)
    }
}

export async function updatePost(title, content, tags, id) {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title,
        content,
        tags
      }),
    };
    const response = await fetch(
      `${BASE_URL}/api/posts/${id}`,
      options
    );
    const result = await response.json();
    return result;
  }