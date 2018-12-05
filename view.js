

 //controller?
 buildTable1('statR', statistics.number[0].republicans, statistics.partyForVote[0].republicans);
 buildTable1('statD', statistics.number[0].democrats, statistics.partyForVote[0].democrats);
 buildTable1('statI', statistics.number[0].independants, statistics.partyForVote[0].independants);
 

 buildTable3('leastLoyal', statistics.partyLoyalty[0].leastLoyal);
 buildTable3('mostLoyal', statistics.partyLoyalty[0].mostLoyal);

 buildTable3('leastAtt', statistics.attendanceVote[0].missedMost);
 buildTable3('mostAtt', statistics.attendanceVote[0].missedLeast);

 
 console.log(JSON.stringify(statistics));

function buildTable1(el, count, vote) {
    element = document.getElementById(el);
    var td1 = document.createElement('TD');
    td1.textContent = count;
    element.appendChild(td1);
    var td2 = document.createElement('TD');
    td2.textContent = vote;  
    element.appendChild(td2);
}

function buildTable3(el,obj) {
    console.log(obj);
    
    element = document.getElementById(el);
    if (element){
    
    for (var i in obj){
        var newRow = document.createElement('tr')
        newRow.insertCell().innerHTML = obj[i][0];
        newRow.insertCell().innerHTML = obj[i][1];
        newRow.insertCell().innerHTML = obj[i][2];
        element.append(newRow);
    }
    } 
}


//  buildTable2('leastAtt', statistics.attendanceVote[0].missedMost[0].name , statistics.attendanceVote[0].missedMost[0].numberMissedVote, statistics.attendanceVote[0].missedMost[0].prcMissedVote);
//  buildTable2('mostAtt', statistics.attendanceVote[0].missedLeast[0].name , statistics.attendanceVote[0].missedLeast[0].numberMissedVote, statistics.attendanceVote[0].missedLeast[0].prcMissedVote);



// function buildTable2 (el, col1, col2, col3){
// element = document.getElementById(el);
// if (element){
//     for (var i in col1){
//         var newRow = document.createElement('tr')
//         newRow.insertCell().innerHTML = col1[i];
//         newRow.insertCell().innerHTML = col2[i];
//         newRow.insertCell().innerHTML = col3[i];
//         element.append(newRow)}}
// }