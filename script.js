const occupationsArr = [];
const statesArr = [];
const signupForm = document.getElementById("user-signup");
const occupationOptions = document.getElementById("occupations");
const stateOptions = document.getElementById("states");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const error = document.getElementById("error");
const formJSON = {
    name: "",
    email: "",
    password: "",
    occupation: "",
    state: ""
};

const formHandler = () => {
    if (!nameInput.value) {
        error.innerText = 'All fields are required!';
        return; } else {
        formJSON.name = nameInput.value;
    };
    if (!emailInput.value) {
        error.innerText = 'All fields are required!'; 
        return; } else {
        formJSON.email = emailInput.value;
    };
    if (!passwordInput.value) {
        error.innerText = 'All fields are required!'; 
        return; } else {
        formJSON.password = passwordInput.value;
    };
    if (!occupationOptions.value) {
        error.innerText = 'All fields are required!'; 
        return; } else {
        formJSON.occupation = occupationOptions.value;
    };
    if (!stateOptions.value) { 
        error.innerText = 'All fields are required!'; 
        return; } else { 
        formJSON.state = stateOptions.value;
        postSignupForm(formJSON);
    };
}

const getSignupOptions = () => {
    fetch('https://frontend-take-home.fetchrewards.com/form', {
        method: 'GET',
        headers: {
            accept: 'application.json',
            'Content-Type': 'application/json'
        }
    })
    .then(function(response){
        console.log(response);
            for (let i = 0; i < response.occupations.length; i++) {
                occupationsArr.push(response.occupations[i]);
                var option = document.createElement("option");
                option.setAttribute("value", response.occupations[i]);
                option.value(response.occupations[i]);
                occupationOptions.appendChild(option);
            };
            for (let i = 0; i < response.states.length; i++) {
                statesArr.push(response.states[i]);
                var option = document.createElement("option");
                option.setAttribute("value", response.states[i].abbreviation);
                option.value(response.states[i].name);
                stateOptions.appendChild(option);
            };
    })
}

const postSignupForm = data => {
    fetch('https://frontend-take-home.fetchrewards.com/form', {
        method: 'POST',
        headers: {
            accept: 'application.json',
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(function(response){
        if (!response.ok) {
            console.log(response.status.json())
        } else {
            error.innerText('Thank you!');
            return response.status(200);
        }
    })
}


signupForm.addEventListener("submit", function(event){
    event.preventDefault();
    formHandler();
});

getSignupOptions();