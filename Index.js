var Items = [];

(function InsisulaiseItems() 
{
    Items = localStorage.getItem("Items");
    if (Items == null)
        Items = [];
    else
        Items = Items.split(',');

    Items.forEach(element => {
        var Child = document.createElement("li");
        Child.innerHTML = element;
        document.getElementById("List").appendChild(Child);
    });
    console.log(Items);
})();

function Add() 
{
    var Input = document.getElementById("input").value;
    if (Input == "")
        return;
    var Child = document.createElement("li");
    Child.innerHTML = Input;
    document.getElementById("List").appendChild(Child);
    document.getElementById("input").value = "";
    Items.push(Input);
    localStorage.setItem("Items", Items);
}

function Remove() 
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