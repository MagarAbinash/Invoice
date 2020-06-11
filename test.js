document.getElementById('itemAddForm').addEventListener('submit', addItem);

var items = [];

var itemId = 0;
var sub_total = [];
editItem = false;
// var total = document.getElementById('subTotal');

// onblur ma validation 
//validataion ko lagi function create gar (data , data ,dta )  itemref , 3 golbal value where valid = false ;
// if valid ==true only add update gar 
// onclick ma check d valid info ani add 

function addItem(event) {
    var itemName = document.getElementById('itemAddName').value;
    var itemPrice = document.getElementById('itemAddPrice').value;
    var itemQuantity = document.getElementById('itemAddQuantity').value;
    itemId += 1;
    var newItem = { 
        id: itemId, 
        name: itemName,
        price: Number(itemPrice),
        qty: Number(itemQuantity),
        total: function () {
            return this.qty * this.price;
        }
    };
    items.push(newItem);

    for_sub_total = {
        id: itemId,
        total: newItem.total()
    }
    // sub_total.push(newItem.total());
    // console.log(for_sub_total);
    sub_total.push(for_sub_total);
    getSubTotal();

    showCart();

    event.preventDefault();
}

// arrayName.map((array , key)=>{})
function showCart() {
    var cartEle = document.getElementById('cart');
    cartEle.innerHTML = "";
    // console.log(items)
    for (let index = 0; index < items.length; index++) {
        cartEle.innerHTML += '<tr>' +
            '<th scope="row">' + items[index].id + '</th>' +
            '<td contenteditable='+ editItem +'>' + items[index].name + '</td>' +
            '<td contenteditable=' + editItem + '>' + items[index].qty + '</td>' +
            '<td contenteditable=' + editItem + '>' + items[index].price + '</td>' +
            '<td>' + items[index].total() + '</td>' +
            '<td>'+
                '<div>' +
                    '<button class="btn btn-primary btn-sm btn-inline" data-toggle="modal" data-target="#myModal" onclick="editInvoice(\'' + items[index].id + '\')">Edit</button>' +
                    '<button class="btn btn-danger btn-sm btn-inline" onclick ="deleteInvoice(\'' + items[index].id + '\')">Delete</button>' +
                '</div>'+
            '</td></tr>';
    }
}

function editInvoice(id) {
    // editItem = true;
    var newName = document.getElementById('editName');
    var newPrice = document.getElementById('editPrice');
    var newQuantity = document.getElementById('editQuantity');
    var newId = document.getElementById('editId');
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == id) {
            // console.log("Edit me " + id + " and editable: " + editItem);
            newId.value = items[i].id;
            newName.value = items[i].name;
            newPrice.value = items[i].price;
            newQuantity.value = items[i].qty;
        }
    }
}

function saveEdit() {
    var newId = document.getElementById('editId').value;
    var newName = document.getElementById('editName').value;
    var newPrice = document.getElementById('editPrice').value;
    var newQuantity = document.getElementById('editQuantity').value;
    // console.log("Save this edited file "+ " "+ newId + newName +" "+newPrice+" "+newQuantity);
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == newId) {
            items[i].name = newName;
            items[i].price = newPrice;
            items[i].qty = newQuantity;
            sub_total[i].total = items[i].total(); 
        }
    }
    getSubTotal();
    showCart();
}

function deleteInvoice(id) {
    if (confirm("Delete Confirmation")) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                // console.log("Doing splice");
                items.splice(i, 1);
                itemId -= 1;
                sub_total.splice(i, 1);
                showCart();
                getSubTotal();
            }
        }
    }
}

var final = 0;

function getSubTotal() {
    var shoTotal = document.getElementById('subToTal');
    shoTotal.value ="";
    let total = [];
    for (let i = 0; i < sub_total.length; i++) {
        total.push(sub_total[i].total);
    }
    final = String(total.reduce((a, b) => a + b, 0));
    shoTotal.innerHTML = final;

    getDiscount();
}

function getDiscount(){
    var disPer = document.getElementById('discountPer').innerText;
    var shoDis = document.getElementById('discountAmt');
    var disAmt = Number((final / 100) * disPer);
    shoDis.innerHTML = String(disAmt);
    var ttl = Number(final) - disAmt;
    calculateVat(ttl);
    // console.log(disAmt);
}

function calculateVat(subTotal) {
    var shoVat = document.getElementById('vatAmt');
    let vat = Number((subTotal/100)*13);
    shoVat.innerHTML = String(vat);
    sumTotal(vat, subTotal);
    // console.log(vat);
}

function sumTotal(vat, subTotal) {
    var sumTotalSho = document.getElementById('totalAmt');
    let sumtoTal = Number(subTotal) + Number(vat);
    sumTotalSho.innerHTML = String(sumtoTal);
}