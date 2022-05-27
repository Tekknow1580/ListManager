import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UsersFile = path.join(__dirname.substring(0, __dirname.length - 6), '/Data/Users.json');
var Items = ReadFile()

function ReadFile() {
    var Output = fs.readFileSync(UsersFile);
    return JSON.parse(Output);
}

function WriteFile() {
    fs.writeFileSync(UsersFile, JSON.stringify(Items));
}

export function LogIn(Name, Password) {
    let Find = false;/*
    Items.forEach(element => {
        if (Name == element.UName && Password == element.Pass)
            Find = true;
    });*/
    Items.every(el => {
        if (Name == el.UName && Password == el.Pass) {
            Find = true;
            return false
        }
        return true;
    });
    return Find;
}

export function SignUp(Name, Password) {
    let Find = false;
    Items.every(el => {
        if (Name == el.UName && Password == el.Pass) {
            Find = true;
            return false
        }
        return true;
    });
    if (Find)
        return false;
    let NewUser = { "UName": Name, "Pass": Password };
    Items.push(NewUser);
    WriteFile();
    return true;
}

export function Del(Name) {
    var UserIndex = Items.findIndex(e => e.UName === Name);

    if (UserIndex <= -1)
        return 'UC01'

    if (Items[UserIndex].UName == 'Admin')
        return 'UC0A'

    Items.splice(UserIndex, 1);
    WriteFile();
    return true;
}