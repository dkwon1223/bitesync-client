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
            throw new Error(JSON.stringify(await response.json()));
        }
    } catch (error) {
        console.log(JSON.parse(error.message).message[0]);
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
            throw new Error(await response.text());
        }
    } catch(error) {
        console.log(error.message);
    }
}