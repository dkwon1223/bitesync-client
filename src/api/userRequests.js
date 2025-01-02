export const signupUser = async (userCredentials) => {
    try {
        const response = await fetch("http://localhost:8080/api/user/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        });
    
        if(!response.ok) {
            throw new Error(response.message);
        }
    } catch (error) {
        console.log("Error: ", error.message);
    }
}

export const loginUser = async (userCredentials) => {
    try {
        const response = await fetch("http://localhost:8080/api/user/authenticate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        });

        if(!response.ok) {
            throw new Error(response.message)
        }
    } catch(error) {
        console.log("Error: ", error.message);
    }
}