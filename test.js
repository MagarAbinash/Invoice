document.getElementById('itemAddForm').addEventListener('submit', addItem);

var items = [];

var itemId = 5;

function addItem(event) {
    // console.log("Adding item now");
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

    fetchItems();

    event.preventDefault();
}

function fetchItems() {
    var itemList = document.getElementById('items');
    itemList.innerHTML = "";

    for (var i = 0; i < items.length; i++) {
        // console.log(items[i].name+ " Price: "+ items[i].price);
        itemList.innerHTML += '<div class="card card-flex float-left m-3" style="width: 15rem;">' +
            '<h1 class="card-img-top">' + items[i].name + '</h1>' +
            '<div class="card-body">' +
            '<h5 class="card-title">Price: ' + items[i].price + ' </h5>' +
            '<h5 class ="card-title">Quantity: '+ items[i].qty + '</h5>'+
            '<a href="#" onclick="addTo(\'' + items[i].id + '\')" class="btn btn-danger">Add to cart</a>' +
            '</div></div>';
    };
};

fetchItems();

var cart = [];
// var bills = [];

function addTo(list) {
    cart.push(list);
    // copyToBills();
    showCart();
}

// function copyToBills() {
//     for (let i = 0; i < cart.length; i++) {
//         for (let j = 0; j < items.length; j++) {
//             if (items[j].id == cart[i]) {
//                 bills.push({
//                     id: items[j].id,
//                     name: items[j].name,
//                     qty: items[j].qty,
//                     price: items[j].price
//                 });
//             }
//         }
//     }
//     console.log(bills);
// }


function showCart() {
    var cartEle = document.getElementById('cart');
    cartEle.innerHTML = "";
    for (let index = 0; index < cart.length; index++) {
        for (let j = 0; j < items.length; j++) {
            if (items[j].id == cart[index]) {
                cartEle.innerHTML += '<tr>' +
                    '<th scope="row">' + (index + 1) + '</th>' +
                    '<td>' + items[j].name + '</td>' +
                    // '<td class="w-25">' + 
                    //     '<div class="md-form">' +
                    //         '<input id="q" onclick="calculateAmt()" type="number" min="0" value="0" id="numberExample" class="form-control">'+
                    //     '</div>'+ 
                    // '</td>' +
                    '<td>' + items[j].qty + '</td>' +
                    '<td>' + items[j].price + '</td>' +
                    '<td>Amount</td>' +
                    '<td><button class="btn btn-primary btn-sm btn-inline" type="submit">Edit</button><button class="btn btn-danger btn-sm btn-inline" type="submit">Delete</button></td></tr>';
            }
        }
    }
}

function calculateAmt(event) {
    var qt = document.getElementById('q');
    console.log(qt.value);
}
