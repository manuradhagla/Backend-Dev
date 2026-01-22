//promises is used to handle asynchronous operations in JavaScript.
// It represents a value that may be available now, in the future, or never.
function login() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("login");
            resolve();
        }, 2000);
    });
}

function userDeatils() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("user details");
            resolve();
        }, 1000);
    });
}

function password() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("password");
            resolve();
        }, 3000);
    });
}

promises 
login().then(() => {
    return userDeatils();
}).then(() => {
    return password();
}).then(() => {
    console.log("all done");
}).catch((error) => {
    console.log("Error:", error);
});

// Async Await EXAMPLE
//in async function we don't use await then it will not run and can be in infinite state
async function run() {
    try {
        await login();
        await userDeatils();
        await password();
        console.log("all done");
    } catch (error) {
        console.log("Error:", error);
    }
}
run()