var Items = [];
var RSkip = true, bSortACS = false;
var btnSort = document.getElementById('btnSort');
var TD = setInterval(() => { TimeDisplayer() }, 1000);
InsisulaiseItems();

async function InsisulaiseItems() {
    var Loged = localStorage.getItem('LogedIn');
    if (Loged == 'false') {
        window.location.pathname = '/';
        return;
    }
    if (localStorage.getItem('User') == '') {
        localStorage.setItem('LogedIn', false);
        localStorage.setItem('LogREM', false);
        window.location.pathname = '/';
        return;
    }
    Items = await (await fetch('/Main/List', {
        method: 'post',
        body: JSON.stringify({ UName: localStorage.getItem('User') }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })).json();/*
    if (Items == false && Items != []) {
        alert('Un Able To Create A List.\rSending You Back To Login Page');
        localStorage.setItem('LogedIn', false);
        localStorage.setItem('LogREM', false);
        localStorage.setItem('User', '');
        window.location.pathname = '/';
        return;
    }*/
    if (Items == null)
        Items = [];

    RSkip = true;/*
    Items.sort((a, b) => new Date(b.CDate).getTime() -
        new Date(a.CDate).getTime());*/
    Items.forEach(element => {
        Add(element.Value, new Date(element.CDate));
    });
    RSkip = false;
};

function TimeDisplayer() {
    var lbl = document.getElementById('TimeDesplay');
    var T =
        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

    lbl.innerHTML = T;
}

async function DelList() {
    var Res = await (await fetch('/Login/Del', {
        method: 'post',
        body: JSON.stringify({ UName: localStorage.getItem('User') }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })).json();
    if (Res.res == true) {
        SignOut();
        return;
    }

    alert(Res.res);
}

function SignOut() {
    localStorage.setItem('LogedIn', false);
    localStorage.setItem('LogREM', false);
    localStorage.setItem('User', '');
    window.location.pathname = '/';
}

function SortOrder() {
    RSkip = true;
    document.getElementById("List").innerHTML = "";
    if (bSortACS) {
        Items.sort((a, b) => new Date(a.CDate).getTime() -
            new Date(b.CDate).getTime());
        btnSort.innerHTML = 'Sort DECS';
        bSortACS = false;
    }
    else {
        Items.sort((a, b) => new Date(b.CDate).getTime() -
            new Date(a.CDate).getTime());
        btnSort.innerHTML = 'Sort ACS';
        bSortACS = true;
    }
    Items.forEach(el => {
        Add(el.Value, new Date(el.CDate));
    });
    RSkip = false;
}

function InputEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("Add").click();
    }
}

async function Add(Input, DateCreated) {
    console.log(Input);
    if (Input == "")
        return;

    var BTN = document.createElement("button");
    var Row = document.createElement("tr");
    var CItem = document.createElement("td");
    var CDate = document.createElement("td");

    BTN.id = Input;
    BTN.className = "Remove";
    BTN.innerHTML = "X";
    BTN.onclick = Remove;

    DateCreated =
        `${DateCreated.getDay() + 1}/${DateCreated.getMonth() + 1}/${DateCreated.getFullYear()}
    ${DateCreated.getHours()}:${DateCreated.getMinutes()}`;

    CDate.innerHTML = DateCreated;

    CItem.innerHTML = "● \t " + Input;
    CItem.id = "Item";

    Row.appendChild(CItem);
    Row.appendChild(CDate);
    Row.appendChild(BTN);
    Row.id = Input;

    document.getElementById("List").appendChild(Row);
    document.getElementById("Input").value = "";
    if (RSkip)
        return
    Items = await (await fetch('/Main/List/Add', {
        method: 'post',
        body: JSON.stringify({ UName: localStorage.getItem('User'), Value: Input, CDate: DateCreated }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })).json();
}

async function RemoveLast() {
    var List = document.getElementById("List");
    List.removeChild(List.lastElementChild);
    Items = await (await fetch('/Main/List/RemoveAt', {
        method: 'post',
        body: JSON.stringify({ UName: localStorage.getItem('User'), Value: (Items.length - 1) }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })).json();
}

async function RemoveAll() {
    document.getElementById("List").innerHTML = "";
    Items = await (await fetch('/Main/List/RemoveAll', {
        method: 'post',
        body: JSON.stringify({ UName: localStorage.getItem('User') }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })).json();
}

async function Remove(Item) {
    Item = Item.srcElement.id;
    const index = Items.findIndex(e => e.Value === Item);
    if (index <= -1)
        return;
    var List = document.getElementById("List");
    List.removeChild(List.children[Item]);
    Items = await (await fetch('/Main/List/RemoveAt', {
        method: 'post',
        body: JSON.stringify({ UName: localStorage.getItem('User'), Value: index }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })).json();
}