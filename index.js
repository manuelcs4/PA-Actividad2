const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const fechaNacimiento = document.getElementById('fechaNacimiento'); 

const expMay = RegExp("[A-Z]"); 
const expMin = RegExp("[a-z]"); 
const expNum = RegExp("[0-9]"); 

var userNameCheck = false; 
var emailCheck = false; 
var passwordCheck = false; 
var password2Check = false; 
var fechaNacimientoCheck = false; 

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const isValidPassword = password => {
    const repass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return repass.test(String(password))
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const fechaNacimientoValue = fechaNacimiento.value.trim(); 

    //VALIDACION DEL USUARIO
    if(usernameValue === '') {
        setError(username, 'Usuario es Requerido. Por favor ingrese un nombre usuario.');
        userNameCheck = false; 
    } else {
        setSuccess(username);
        userNameCheck = true; 
    }

    //VALIDACION DEL EMAIL 
    if(emailValue === '') {
        setError(email, 'E-mail es Requerido. Por favor ingrese un E-mail.');
        emailCheck = false; 
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Por favor ingrese un E-mail valido.');
        emailCheck = false; 
    } else {
        setSuccess(email);
        emailCheck = true; 
    }

    //VALIDACION DE LA CONTRASEÑA
    if(passwordValue === '') {
        setError(password, 'Contraseña es obligatoria. Por favor ingrese una contraseña.');
        passwordCheck = false; 
    } else if (passwordValue.length < 8 ) {
        setError(password, 'La contraseña debe de ser al menos de 8 caracteres.');
        passwordCheck = false; 
    } else if(!isValidPassword(passwordValue)){
        setError(password, 'Por favor ingrese una contraseña valida. Debe de contener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un simbolo'); 
        passwordCheck = false; 
    }else {
        setSuccess(password);
        passwordCheck = true; 
    }

    //VALIDACION DE CONTRASEÑA NO. 2 
    if(password2Value === '') {
        setError(password2, 'Por favor confirme su contraseña.');
        password2Check = false; 
    } else if (password2Value !== passwordValue) {
        setError(password2, "Las contraseñas no coinciden.");
        password2Check = false; 
    } else {
        setSuccess(password2);
        password2Check = true; 
    }

    //VALIDACION DE FECHA 
    if(fechaNacimientoValue === ''){
        setError(fechaNacimiento, 'Por favor ingrese una Fecha Valida'); 
        fechaNacimientoCheck = false; 
    }else {
        setSuccess(fechaNacimiento); 
        fechaNacimientoCheck = true; 
    }

    if(userNameCheck && emailCheck && passwordCheck && password2Check && fechaNacimientoCheck){
        window.comunicacion.registroValido([username.value, password.value]);
       }
};

