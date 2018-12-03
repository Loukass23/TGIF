
    var listR=[], listD=[], listI = [];
    var voteforR = 0, voteforI =0, voteforD =0;
    var statR = document.getElementById("statR");
    var statD = document.getElementById("statD");
    var statI = document.getElementById("statI");
data.results[0].members.forEach(function(item){
    switch(item.party){
        case 'R':
        listR.push(item);
        voteforR += item.votes_with_party_pct;
        break;
        case 'D' :
        listD.push(item);
        voteforD += item.votes_with_party_pct;
        break;
        case 'I' :
        listI.push(item);
        voteforI += item.votes_with_party_pct;
    }
});


buildTable1(statR, listR.length, voteforR /= listR.length);
buildTable1(statD, listD.length, voteforD /= listD.length);
buildTable1(statI, listI.length, voteforI /= listI.length);

function leastMostvotes(partyList) {
    var leastEngaged=[],  mostEngaged=[];
for (var i in partyList) {
if
}

}

function buildTable1(element, count, vote) {
    var td1 = document.createElement('TD');
    td1.textContent = count;
    element.appendChild(td1);
    var td2 = document.createElement('TD');
    td2.textContent = vote.toFixed(2);  
    element.appendChild(td2);
}

var statistics = {"number": [   
                    { "democrats" : countD,  
                      "republicans"  : countR,
                      "independants"   : countI },        
                  ]   ,
                  "partyForVote" : [
                      {
                        "democrats" : voteforD.toFixed(2),  
                        "republicans"  : voteforR.toFixed(2),
                        "independants"   : voteforI.toFixed(2) },   
                      
                  ]    ,         
                  
                  "attendanceVote" : [
                      {
                          "missedMost" : "",
                          "missedLeast" : "",

                      }
                  ]                              

    } 

    console.log(JSON.stringify(statistics));
