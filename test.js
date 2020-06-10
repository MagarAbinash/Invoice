document.getElementById('itemAddForm').addEventListener('submit', addItem);

var items = [];

var itemId = 0;
var sub_total = [];
editItem = false;
// var total = document.getElementById('subTotal');

function addItem(event) {
    var itemName = document.getElementById('itemAddName').value;
    var itemPrice = document.getElementById('itemAddPrice').value;
    var itemQuantity = document.getElementById('itemAddQuantity').value;
    itemId += 1;
    var newItem = { 
        id: itemId, 
        name: itemName,
        setName: (name) => {
            this.name = name;
        },
        getName: () => {
            return this.name;
        },
        price: itemPrice,
        setPrice: (price) => {
            this.price = price;
        },
        getPrice: () => {
            return this.price;
        }, 
        qty: itemQuantity,
        setQty: (qty) => {
            this.qty = qty;
        },
        getQty: () => {
            return this.qty;
        }
    };
    items.push(newItem);

    showCart();

    subTotal(newItem.price, newItem.qty);

    event.preventDefault();
}


function showCart() {
    var cartEle = document.getElementById('cart');
    cartEle.innerHTML = "";
    for (let index = 0; index < items.length; index++) {
        cartEle.innerHTML += '<tr>' +
            '<th scope="row">' + items[index].id + '</th>' +
            '<td contenteditable='+ editItem +'>' + items[index].name + '</td>' +
            '<td contenteditable=' + editItem + '>' + items[index].qty + '</td>' +
            '<td contenteditable=' + editItem + '>' + items[index].price + '</td>' +
            '<td>'+ calculateAmt(items[index].price, items[index].qty) +'</td>' +
            '<td>'+
                '<div>' +
                    '<button class="btn btn-primary btn-sm btn-inline" data-toggle="modal" data-target="#myModal" onclick="editInvoice(\'' + items[index].id + '\')">Edit</button>' +
                    '<button class="btn btn-danger btn-sm btn-inline" onclick ="deleteInvoice(\'' + items[index].id + '\')">Delete</button>' +
                '</div>'
            '</td></tr>';
    }
}

function editInvoice(id) {
    // editItem = true;
    var newName = document.getElementById('editName');
    var newPrice = document.getElementById('editPrice');
    var newQuantity = document.getElementById('editQuantity')
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == id) {
            console.log("Edit me " + id + " and editable: " + editItem);
            newName.value = items[i].name;
            newPrice.value = items[i].price;
            newQuantity.value = items[i].qty;
        }
    }
    showCart();
}

function deleteInvoice(id) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == id) {
            console.log("Doing splice");
            items.splice(i, 1);
            showCart();
        }
    }
}

function calculateAmt(price, qty) {
    var amt =  price * qty;
    return amt;
}

function subTotal(price, qty) {
    sub_total.push(price * qty);
    // showTotal();
}

// function showTotal() {
//     var t = sub_total.reduce((a, b) => a+b, 0);
//     console.log(t)
//     total.innerHTML = "<div>This shit why not working</div>";
// }
