

 //controller?
 buildTable1('statR', statistics.number[0].republicans, statistics.partyForVote[0].republicans);
 buildTable1('statD', statistics.number[0].democrats, statistics.partyForVote[0].democrats);
 buildTable1('statI', statistics.number[0].independants, statistics.partyForVote[0].independants);
 
 buildTable2('leastAtt', statistics.attendanceVote[0].missedMost[0].name , statistics.attendanceVote[0].missedMost[0].numberMissedVote, statistics.attendanceVote[0].missedMost[0].prcMissedVote);
 buildTable2('mostAtt', statistics.attendanceVote[0].missedLeast[0].name , statistics.attendanceVote[0].missedLeast[0].numberMissedVote, statistics.attendanceVote[0].missedLeast[0].prcMissedVote);

 buildTable2('leastLoyal', statistics.partyLoyalty[0].leastLoyal[0].name , statistics.partyLoyalty[0].leastLoyal[0].partyVote, statistics.partyLoyalty[0].leastLoyal[0].prcPartyVote);
 buildTable2('mostLoyal', statistics.partyLoyalty[0].mostLoyal[0].name , statistics.partyLoyalty[0].mostLoyal[0].partyVote, statistics.partyLoyalty[0].mostLoyal[0].prcPartyVote);

 
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
if (element){
    for (var i in col1){
        var newRow = document.createElement('tr')
        newRow.insertCell().innerHTML = col1[i];
        newRow.insertCell().innerHTML = col2[i];
        newRow.insertCell().innerHTML = col3[i];
        element.append(newRow)}}
}