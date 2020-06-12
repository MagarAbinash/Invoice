document.getElementById('itemAddForm').addEventListener('submit', addItem);
let forDate = new Date();
let year = forDate.getFullYear();
let month = forDate.getMonth();
let day = forDate.getDate();
document.querySelector("#date").innerHTML = String(year+"-"+month+'-'+day);


var items = [];

var itemId = 0;
var sub_total = [];
var final = 0;
let invoice = [];

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

    sub_total.push(for_sub_total);
    getSubTotal();

    showCart();
    event.preventDefault();
}

function showCart() {
    var cartEle = document.getElementById('cart');
    cartEle.innerHTML = "";
    for (let index = 0; index < items.length; index++) {
        cartEle.innerHTML += '<tr>' +
            '<th scope="row">' + items[index].id + '</th>' +
            '<td>' + items[index].name + '</td>' +
            '<td>' + items[index].qty + '</td>' +
            '<td>' + items[index].price + '</td>' +
            '<td>' + items[index].total() + '</td>' +
            '<td>'+
                '<div>' +
                    '<button class="btn btn-primary btn-sm btn-inline mr-2" data-toggle="modal" data-target="#myModal" onclick="editInvoice(\'' + items[index].id + '\')">Edit</button>' +
                    '<button class="btn btn-danger btn-sm btn-inline" onclick ="deleteInvoice(\'' + items[index].id + '\')">Delete</button>' +
                '</div>'+
            '</td></tr>';
    }
}

function editInvoice(id) {
    var newName = document.getElementById('editName');
    var newPrice = document.getElementById('editPrice');
    var newQuantity = document.getElementById('editQuantity');
    var newId = document.getElementById('editId');
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == id) {
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
    if (newId != 0 && newName != "" && newPrice != 0 && newQuantity !=0) {
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
}

function deleteInvoice(id) {
    if (confirm("Delete Confirmation")) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                items.splice(i, 1);
                itemId -= 1;
                sub_total.splice(i, 1);
                showCart();
                getSubTotal();
            }
        }
    }
}



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
}

function calculateVat(subTotal) {
    var shoVat = document.getElementById('vatAmt');
    let vat = Number((subTotal/100)*13);
    shoVat.innerHTML = String(vat);
    sumTotal(vat, subTotal);
}

function sumTotal(vat, subTotal) {
    var sumTotalSho = document.getElementById('totalAmt');
    let sumtoTal = Number(subTotal) + Number(vat);
    sumTotalSho.innerHTML = String(sumtoTal);
}

function reset() {
    if (items.length != 0 || itemId != 0 || sub_total.length != 0) {
        if (confirm("Do you want to reset all?")) {
            items = [];
            itemId = 0;
            sub_total = [];
            document.getElementById('customerName').value = "";
            document.getElementById('discountPer').innerText = "0";
            showCart();
            getSubTotal();
        }
    } else {
        alert("No item added in the invoice");
    }
}


function saveInvoice() {

    let invDate = document.getElementById('date').innerText;
    let cname = document.getElementById('customerName').value;
    let invItems = items;
    let invTotal = document.getElementById('totalAmt').innerText;
    let subttl = document.getElementById('subToTal').innerHTML;
    let bilDis = document.getElementById('discountAmt').innerHTML;
    let bilVat = document.getElementById('vatAmt').innerHTML;
    let notemsg = document.getElementById('noteMsg').innerText;


    if (cname != "" && items.length != 0) {
        if (confirm("Do you want to save this invoice?")) {
            let savingInvoice = {
                id: Math.random(),
                date: invDate,
                name: cname,
                item: invItems,
                subT: subttl,
                discount: bilDis,
                vat: bilVat,
                msg: notemsg,
                amounts: invTotal
            }

            invoice.push(savingInvoice);
            items = [];
            itemId = 0;
            sub_total = [];
            document.getElementById('customerName').value = "";
            document.getElementById('discountPer').innerText = "0";
            showCart();
            showInvoice();
            getSubTotal();
        }           
    } else {
        alert("You must enter customer name or item must be added!!");
    }

}

function showInvoice() {
    let shoInvoice = document.getElementById('invoices');
    shoInvoice.innerHTML = "";
    for (let i = 0; i < invoice.length; i++) {
        shoInvoice.innerHTML += 
        '<div class=\'card\'>'+
            '<strong class="card-title">'+ invoice[i].name +'</strong>'+
            '<div class="card-text">'+
                '<p>Date: '+ invoice[i].date +'</p>'+
                '<p>Grand Total: '+ invoice[i].amounts +'</p>'+
            '</div>'+
        '<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#showbills" onclick="showBills(\'' + invoice[i].id +'\')">Show</button >'+
            // '<a href="#" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#showbills" onclick="showBills(\''+ invoice[i].id +'\')">Button</a>' +
        '</div>';
    }
}

function showBills(id) {
    let shobills = document.getElementById('showbillsDetails');
    let bilnam = document.getElementById('billName');
    let bilId = document.getElementById('billId');
    let bilDate = document.getElementById('billDate');
    shobills.innerHTML = "";
    let count = 0;
    for (let i = 0; i < invoice.length; i++) {
        if (invoice[i].id == id) {
            bilnam.innerHTML = invoice[i].name;
            bilId.innerHTML = invoice[i].id;
            bilDate.innerHTML = invoice[i].date;

            for (let j = 0; j < invoice[i].item.length; j++) {
                    shobills.innerHTML += '<tr>' +
                    '<th scope="row">' + (++count) + '</th>' +
                    '<td>' + invoice[i].item[j].name + '</td>' +
                    '<td>' + invoice[i].item[j].qty + '</td>' +
                    '<td>' + invoice[i].item[j].price + '</td>' +
                    '<td>' + invoice[i].item[j].total() + '</td>' +
                    '</tr>';
            }
            document.getElementById('billsubToTal').innerText = invoice[i].subT;
            document.getElementById('billdiscountAmt').innerText = invoice[i].discount;
            document.getElementById('billvatAmt').innerText = invoice[i].vat;
            document.getElementById('billtotalAmt').innerText = invoice[i].amounts;
            document.getElementById('billsNote').innerText = invoice[i].msg;
        }
    }
}