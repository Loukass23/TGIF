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

function buildTable3(el, obj) {
    console.log(obj);

    element = document.getElementById(el);
    if (element) {

        for (var i in obj) {
            var newRow = document.createElement('tr')
             for (var j in obj[i]){
                 newRow.insertCell().innerHTML = obj[i][j];
             }            
            element.append(newRow);
        }
    }
}
