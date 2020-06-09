document.getElementById('itemAddForm').addEventListener('submit', addItem);

var items = [
    { name: "Apple", price: 120, qty: 0 },
    { name: "Orange", price: 60, qty:0 },
    { name: "Mango", price: 60, qty: 0 },
    { name: "Banana", price: 80, qty: 0 },
    { name: "Papaya", price: 90, qty: 0 },
];

function addItem(event) {
    // console.log("Adding item now");
    var itemName = document.getElementById('itemAddName').value;
    var itemPrice = document.getElementById('itemAddPrice').value;
    var newItem = { name: itemName, price: itemPrice, qty:0};
    items.push(newItem);

    fetchItems();

    event.preventDefault();
}

function fetchItems() {
    var itemList = document.getElementById('items');
    itemList.innerHTML = "";

    for (var i = 0; i < items.length; i++){
        // console.log(items[i].name+ " Price: "+ items[i].price);
        itemList.innerHTML += '<div class="card card-flex float-left m-3" style="width: 15rem;">'+
        '<h1 class="card-img-top">' + items[i].name + '</h1>' +
        '<div class="card-body">'+
            '<h5 class="card-title">Price: ' + items[i].price + ' </h5>'+
            '<a href="#" onclick="addTo(\'' + items[i].name + '\')" class="btn btn-danger">Add to cart</a>' +
        '</div></div>';
    };
};

fetchItems();


var cart = [];
function addTo(list) {
    cart.push(list);
    showCart();
}

function showCart() {
    var cartEle = document.getElementById('cart');
    cartEle.innerHTML = "<div><ul>";

    for (let index = 0; index < cart.length; index++) {
        for (let j = 0; j < items.length; j++) {
            if (items[j].name == cart[index]) {
                cartEle.innerHTML += '<li>' + items[j].name+' Price: '+items[j].price + '</li>';
            }
        }   
    }
    cartEle.innerHTML+='</ul></div>'
}