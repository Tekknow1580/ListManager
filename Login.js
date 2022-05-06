var Users = JSON.parse(Users);
var LogedIn = localStorage.getItem("LogIn");
if (LogedIn == 'true')
location.assign("Main.html");

function LogIn(Name,Password,Remember)
{
    let Find = false;
    Users.forEach(element => {
        if (Name == element.UName && Password == element.Pass)
            Find = true;
    });

    LogedIn = Remember;
    localStorage.setItem("LogIn",Remember);

    if (Find)
        location.assign("Main.html");
    else
        ErrorMSG("* In Valid User Nane \r\nOr Password");
}

function SignUp(Name,Password)
{
    if (Name == '' || Password == '')
    {
        ErrorMSG("* Please Enter A Valid \r\nUser Name And Password")
        return;
    }
    if (Users.find((UName,Pass) => UName == Name && Pass == Password))
    {
        ErrorMSG("* User Name And Password\r\nAlready Exists")
        return;
    }

    let NewUser = {"UName":Name,"Pass":Password};
    Users.push(NewUser);
    Users.dat =
    data =  JSON.stringify(Users);
    /*
    let data = JSON.stringify(Users);
    let fs = new FileSystem().require('fs');
    fs.writeFile('Users.dat', data, 'utf8', callback);*/
}

function ErrorMSG(Message)
{
    document.getElementById("MSG").innerHTML = Message;
}