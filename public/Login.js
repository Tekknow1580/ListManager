LogTest();
function LogTest() {
    var LogRem = localStorage.getItem("LogREM");
    var Loged = localStorage.getItem('LogedIn');
    if (LogRem == 'true' || Loged == 'true') {
        localStorage.setItem('LogedIn', true);
        window.location.pathname = '/Main';
        return;
    }
}

async function LogIn(Name, Password, Remember) {
    var ANS = true;
    ANS = await (await fetch('/Login', {
        method: 'POST',
        body: JSON.stringify({ UName: Name, Pass: Password }),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    })).json();
    if (ANS.res != true && ANS.res != false)
        ErrorMSG('Error: ' + ANS.res);

    if (ANS.res == false)
        ErrorMSG("* In Valid User Nane \r\nOr Password");

    if (ANS.res == true) {
        localStorage.setItem('LogREM', Remember);
        localStorage.setItem('LogedIn', true);
        localStorage.setItem('User', Name);
        window.location.pathname = '/Main';
    }

}

async function SingUp(Name, Password, Remember) {
    var ANS = true;
    ANS = await fetch('/Login/SignUp', {
        body: JSON.stringify({ UName: Name, Pass: Password }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
    });
    ANS = await ANS.json();
    ANS = ANS.res;
    if (!ANS)
        ErrorMSG("* In Valid User Nane \r\nOr Password");
    else {
        localStorage.setItem('LogREM', Remember);
        localStorage.setItem('LogedIn', true);
        localStorage.setItem('User', Name);
        window.location.pathname = '/Main';
    }
    if (ANS != true)
        ErrorMSG('Error: ' + ANS);
}

function ErrorMSG(Message) {
    document.getElementById("MSG").innerHTML = Message;
}