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
    
    if (result.error) {
        return(
            alert("Account is already registered. Please log in.")
        )
    }

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
        return (
            <p className="loading">Loading the page... thank you for your patience!</p>
        )
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
        return(
            alert("There was an error making your post. Please try again.")
        )
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
        const data = await response.json();
        }
        
     catch (error) {
        console.error(error)
        return(
            alert("There was an error deleting your post. Please try again.")
        )
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

  export async function getPostByUserId(userId) {
    try {
        const response = await fetch(
            `${BASE_URL}/api/users/${userId}/posts`
          );
      
          const result = await response.json();
          return result;

    } catch (error) {
        console.error(error)
        return (
            <p className="loading">Loading the page... thank you for your patience!</p>
        )
    }
  }

  export async function getPostByTag(tagName) {
    try {
        const response = await fetch(
            `${BASE_URL}/api/tags/%23${tagName}/posts`
          );
      
          const result = await response.json();
          return result;

    } catch (error) {
        console.error(error)
        return (
            <p className="loading">Loading the page... thank you for your patience!</p>
        )
    }
  }