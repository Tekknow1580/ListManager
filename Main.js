var Users = [];
var RSkip = true;

(function InsisulaiseItems() 
{
    Users = JSON.parse(localStorage.getItem("Items"));
    if (Users == null)
        Users = [];

    RSkip = true;
    Users.forEach(element => {
        Add(element.name, new Date(element.dateCreated));
    });
    RSkip = false;
})();

function InputEnter(event)
{
    if (event.key === "Enter") 
    {
    event.preventDefault();
    document.getElementById("Add").click();
    }
}

function Add(Input, DateCreated) 
{
    if (Input == "")
        return;


        let item = {};

        item.name = Input;
        item.dateCreated = new Date().toString();

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
    Users.push(item);
    localStorage.setItem("Items", JSON.stringify(Users));
}

function RemoveLast() 
{
    var List = document.getElementById("List");
    List.removeChild(List.lastElementChild);
    Users.pop();
    localStorage.setItem("Items", Users);
}

function RemoveAll()
{
    document.getElementById("List").innerHTML = "";
    Users = [];
    localStorage.setItem("Items", Users);
}

function Remove(Item)
{
    Item = Item.srcElement.id;
    var List = document.getElementById("List");
    List.removeChild(List.children[Item]);
    const index = Users.indexOf(Item);
    if (index > -1) {
      Users.splice(index, 1);
    }
    localStorage.setItem("Items", Users);
}