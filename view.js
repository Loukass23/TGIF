
  


//console.log(JSON.stringify(statistics));

function buildTable1(el, count, vote) {
    element = document.getElementById(el);
    var td1 = document.createElement('TD');
    td1.textContent = count;
    element.appendChild(td1);
    var td2 = document.createElement('TD');
    td2.textContent = vote;  
    element.appendChild(td2);
}

function buildTable2 (el, col1, col2, col3){
    element = document.getElementById(el);
    for (var i in col1){
        var newRow = document.createElement('tr')
        newRow.insertCell().innerHTML = col1[i];
        newRow.insertCell().innerHTML = col2[i];
        newRow.insertCell().innerHTML = col3[i];
        element.append(newRow)
}}