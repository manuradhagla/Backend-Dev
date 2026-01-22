console.log("start");
function login(cb) {
    setTimeout(() => {
        console.log("login");
        cb();
    }, 2000);
}
function userDeatils(cb) {
    setTimeout(() => {
        console.log("user details");
    }, 1000);
    cb();
}

function password(cb) {
    setTimeout(() => {
        console.log("password");
    }, 3000);
    cb();
}

function sighup() {
    setTimeout(() => {
        console.log("sighup");
    }, 4000);
}
login(() => {
    userDeatils(() => {
        password(() => {
            sighup();
        });
    });
});
console.log("end");

