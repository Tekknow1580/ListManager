var Items = [];
var RSkip = true;

(function InsisulaiseItems() 
{
    Items = localStorage.getItem("Items");
    if (Items == null)
        Items = [];
    else
        Items = Items.split(',');

    RSkip = true;
    Items.forEach(element => {
        Add(element);
    });
    RSkip = false;
})();

function InputEnter(event)
{
    if (event.key === "Enter") 
    {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("Add").click();
    }
}

function Add(Input) 
{
    //var Input = document.getElementById("input").value;
    if (Input == "")
        return;

    var BTN = document.createElement("button");
    var Row = document.createElement("tr");
    var CItem = document.createElement("td");
    var CBTN = document.createElement("td");

    BTN.id = Input;
    BTN.className = "Remove";
    BTN.innerHTML = "X";
    BTN.onclick = Remove;

    CBTN.appendChild(BTN);

    CItem.innerHTML = "● \t " + Input;
    CItem.id = "Item";

    Row.appendChild(CItem);
    Row.appendChild(BTN);
    Row.id = Input;

    document.getElementById("List").appendChild(Row);
    document.getElementById("Input").value = "";
    if (RSkip)
        return
    Items.push(Input);
    localStorage.setItem("Items", Items);
}

function RemoveLast() 
{
    var List = document.getElementById("List");
    List.removeChild(List.lastElementChild);
    Items.pop();
    localStorage.setItem("Items", Items);
}

function RemoveAll()
{
    document.getElementById("List").innerHTML = "";
    Items = [];
    localStorage.setItem("Items", Items);
}

function Remove(Item)
{
    Item = Item.srcElement.id;
    var List = document.getElementById("List");
    List.removeChild(List.children[Item]);
    const index = Items.indexOf(Item);
    if (index > -1) {
      Items.splice(index, 1);
    }
    localStorage.setItem("Items", Items);
}