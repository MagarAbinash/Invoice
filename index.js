var item = [];
function getValue() {
    var checks = document.getElementById("blankCheckbox");
    var str = "";
    for (let index = 0; index < checks.length; index++) {
        if(checks[i].checked == true){
            // item.push(checks[i]).value;
            str += checks[i].value + " ";
        }
    }
    // console.log(item);
    console.log(str);
}