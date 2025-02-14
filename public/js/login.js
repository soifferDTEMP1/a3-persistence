//make two functions, one for login and one for register
//assign those to proper buttons on load

const register = function (e) {
    e.preventDefault()
    let pw = document.getElementById("p").value;
    let un = document.getElementById("u").value;

    json = { u: un, p: pw },
        body = JSON.stringify(json)
    fetch('/register', {
        method: 'POST',
        body: body,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            console.log(response);
            return response.json();
        }).then(function (data) {
            if (data.failed === "exists") {
                alert("That username already exists. Please try a different one or log in.")
            }
            else if (data.failed === "empty") {
                alert("The username or password cannot be left empty.")
            }
            else {
                //WHY DOESNT THIS WORK?
                //WAIT WHY IS IT SUDDENLY WORKING
                //nvm it broke again
                //login(e);
                window.location.href = "main.html";
            }
            console.log(data);
        })
}

const login = function (e) {
    console.log("LOGIN CALLED");
    e.preventDefault()
    let pw = document.getElementById("p").value;
    let un = document.getElementById("u").value;

    json = { u: un, p: pw },
        body = JSON.stringify(json)
    fetch('/login', {
        method: 'POST',
        body: body,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            console.log(response);
            test = response.json()
            return test;
        }).then(function (data) {
            if (data.failed === "incorrect") {
                alert("Username or password is incorrect. Please try again.");
            }
            else if (data.failed === "false") {
                window.location.href = "main.html";
            }
        })
}

window.onload = function () {
    const lbutton = document.getElementById("login");
    const rbutton = document.getElementById("register");
    lbutton.onclick = login;
    rbutton.onclick = register;
}