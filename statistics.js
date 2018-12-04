
    var listR=[], listD=[], listI = [];
    var voteforR = 0, voteforI =0, voteforD =0;
    var sortedListByVote = data.results[0].members.sort(function(a, b){return a.votes_with_party_pct - b.votes_with_party_pct});
    var sortedListByAttendance = data.results[0].members.sort(function(a, b){return a.missed_votes - b.missed_votes});
    var  percentage = document.getElementById('comment').value;
   //document.getElementById('comment').addEventListener('change',buildJSON);
    var listRepublicans = data.results[0].members.filter(elt => elt.party == 'R');

    
      
        console.log(percentage);
    
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

voteforR /= listR.length;
voteforD /= listD.length;
voteforI /= listI.length;


function leastPrc(list,parameter, prc) {   
    var least10 = [];
    console.log('l  '+  Math.round(list.length*prc/100));
     for (i=0 ; i < Math.round(list.length*prc/100); i++) { 
         switch (parameter){           
             case'name' : least10.push(list[i].last_name);
             break;
             case'numberVote' : least10.push(list[i].total_votes);
             break;
             case'prcPartyVote' : least10.push(list[i].votes_with_party_pct);
             break;
             case'prcMissedVote' : least10.push(list[i].missed_votes_pct);
             break;
             case'numberMissedVote' : least10.push(list[i].missed_votes);
             break;
         }
         
     }return least10;
   }
function mostPrc(list,parameter, prc) {
    
    var most10 = [];
    console.log('m  '+ Math.round(list.length*prc/100));
     for (i=list.length -1 ; i > list.length - Math.round(list.length*prc/100) -1; i--) {
        switch (parameter){
            case'name' : most10.push(list[i].last_name);
            break;
            case'numberVote' : most10.push(list[i].total_votes);
            break;
            case'prcPartyVote' : most10.push(list[i].votes_with_party_pct);
            break;
            case'prcMissedVote' : most10.push(list[i].missed_votes_pct);
            break;
            case'numberMissedVote' : most10.push(list[i].missed_votes);
            break;
        }
         
        } 
         
      return most10;
     
          
}

var statistics = {"number": [   
                    { "republicans" : listR.length,  
                      "democrats"  : listD.length,
                      "independants"   : listI.length },        
                  ]   ,
                  "partyForVote" : [
                      {
                        "republicans" : voteforR.toFixed(2),  
                        "democrats"  : voteforD.toFixed(2),
                        "independants"   : voteforI.toFixed(2) },   
                      
                  ]    ,         
                  
                  "attendanceVote" : [
                      {
                          "missedLeast" : [
                            {
                                "name" : leastPrc(sortedListByAttendance,"name", percentage),
                                "numberMissedVote" : leastPrc(sortedListByAttendance,"numberMissedVote", percentage),
                                "prcMissedVote" : leastPrc(sortedListByAttendance,"prcMissedVote", percentage),
                            }
                          ],
                              
                          "missedMost" : [
                            {
                                "name" : mostPrc(sortedListByAttendance,"name", percentage),
                                "numberMissedVote" : mostPrc(sortedListByAttendance,"numberMissedVote", percentage),
                                "prcMissedVote" : mostPrc(sortedListByAttendance,"prcMissedVote", percentage),
                            }
                          ]

                      }
                  ]  , 
                  "partyLoyalty" : [
                    {
                        "leastLoyal" : [
                            {
                                "name" : leastPrc(sortedListByAttendance,"name", percentage),
                                "numberVote" : leastPrc(sortedListByAttendance,"numberVote", percentage),
                                "prcPartyVote" : leastPrc(sortedListByAttendance,"prcPartyVote", percentage),
                            }
                          ],
                        "mostLoyal" : [
                            {
                                "name" : mostPrc(sortedListByAttendance,"name", percentage),
                                "numberVote" : mostPrc(sortedListByAttendance,"numberVote", percentage),
                                "prcPartyVote" : mostPrc(sortedListByAttendance,"prcPartyVote", percentage),
                            }
                          ],

                    }
                ]                             

    } 

   
    
