
var fullList = data.results[0].members;
var percentage = Math.round(10 * fullList.length / 100);

    
function getListsLenght(party)
        {
            return fullList.filter(a => a.party == party).length;     
        }
function getAvVoteforParty(party)
        {
           var list = fullList.filter(a => a.party == party);
           var list2 = list.map(a => a.votes_with_party_pct);
           var sum = list2.reduce(function(a, b) { return a + b; });
           return (sum/list.length).toFixed(2);
        }
         

function getLoyaltyList(leastMost){
    var res;
    var list = fullList.sort(function(a, b){return a.votes_with_party_pct - b.votes_with_party_pct});
    var limitLeast = list[percentage-1];
    var limitMost = list[list.length-percentage];
    console.log(list.length-percentage);
    //get least and most
    if(leastMost == 'least')
        {   var res = list.filter(a =>  a.votes_with_party_pct <= limitLeast.votes_with_party_pct);
            }
   else
        {var list2 = list.filter(a =>  a.votes_with_party_pct >= limitMost.votes_with_party_pct);
       res = list2.sort(function(a, b){return b.votes_with_party_pct - a.votes_with_party_pct});}


       //strip values to needed
return res.map(a => {
                return [a.first_name+' , ' + a.last_name, (a.total_votes*a.votes_with_party_pct/100).toFixed(2), a.votes_with_party_pct]; })

}

function getAttendanceList(leastMost){
    var res;
    var list = fullList.sort(function(a, b){return a.missed_votes_pct - b.missed_votes_pct});
    var limitLeast = list[percentage-1];
    var limitMost = list[list.length-percentage];

    //get least and most
    if(leastMost == 'least')
        {   var res = list.filter(a =>  a.missed_votes_pct <= limitLeast.missed_votes_pct);
            }
   else
        {var list2 = list.filter(a =>  a.missed_votes_pct >= limitMost.missed_votes_pct);
       res = list2.sort(function(a, b){return b.missed_votes_pct - a.missed_votes_pct});}


       //strip values to needed
return res.map(a => {
                return [a.first_name+' , ' + a.last_name, a.missed_votes, a.missed_votes_pct]; })

}


var statistics = {
    "number": [   
    { "republicans" : getListsLenght('R'),  
      "democrats"  : getListsLenght('D'),
      "independants"   : getListsLenght('I') },        
  ]   ,
  "partyForVote" : [
      {
        "republicans" : getAvVoteforParty('R'),  
        "democrats"  : getAvVoteforParty('D'),
        "independants"   : getAvVoteforParty('I') },   
      
  ]    ,         
  
  "attendanceVote" : [
      {
          "missedLeast" : getAttendanceList('least'),
              
          "missedMost" : getAttendanceList('most'),
            
      }
  ]  , 
  "partyLoyalty" : [
    {
        "leastLoyal" : getLoyaltyList('least'),
        "mostLoyal" : getLoyaltyList('most'),
    }
]                             

} 
    //var listR=[], listD=[], listI = [];
    //var voteforR = 0, voteforI =0, voteforD =0;
//     var sortedListByVote = data.results[0].members.sort(function(a, b){return a.votes_with_party_pct - b.votes_with_party_pct});
//    var sortedvoteFor = sortedListByVote.map(a => a.first_name);
//     var sortedListByAttendance = data.results[0].members.sort(function(a, b){return a.missed_votes - b.missed_votes});
    //var  percentage = document.getElementById('comment').value;
   //document.getElementById('comment').addEventListener('change',buildJSON);
   
    //var listRepublicans = data.results[0].members.filter(elt => elt.party == 'R');


       
    //var sortedvotesWithParty = votesWithParty.sort(function(a, b){return a - b});
    //var list = fullList.map(a => a.party);
    
// function getleastPrc(list, ){
//         var limit = list[percentage];
//         var l10 = list.filter(a =>  a[2] <= limit[2]);
//         console.log(l10);
//}
//    data.results[0].members.forEach(function(item){
//     switch(item.party){
//         case 'R':
//         listR.push(item);
//         voteforR += item.votes_with_party_pct;
//         break;
//         case 'D' :
//         listD.push(item);
//         voteforD += item.votes_with_party_pct;
//         break;
//         case 'I' :
//         listI.push(item);
//         voteforI += item.votes_with_party_pct;
//     }
// }); 

// voteforR /= listR.length;
// voteforD /= listD.length;
// voteforI /= listI.length;


// function leastPrc(list,parameter, prc) {   
//     var least10 = [];
//      for (i=0 ; i < Math.round(list.length*prc/100); i++) { 
//          switch (parameter){           
//              case'name' : least10.push(list[i].last_name);
//              break;
//              case'partyVote' : least10.push(Math.round((list[i].total_votes*list[i].votes_with_party_pct)/100));
//              break;
//              case'prcPartyVote' : least10.push(list[i].votes_with_party_pct);
//              break;
//              case'prcMissedVote' : least10.push(list[i].missed_votes_pct);
//              break;
//              case'numberMissedVote' : least10.push(list[i].missed_votes);
//              break;
//          }
         
//      }return least10;
//    }
// function mostPrc(list,parameter, prc) {
    
//     var most10 = [];
//      for (i=list.length -1 ; i > list.length - Math.round(list.length*prc/100) -1; i--) {
//         switch (parameter){
//             case'name' : most10.push(list[i].last_name);
//             break;
//             case'partyVote' : most10.push(Math.round((list[i].total_votes*list[i].votes_with_party_pct)/100));
//             break;
//             case'prcPartyVote' : most10.push(list[i].votes_with_party_pct);
//             break;
//             case'prcMissedVote' : most10.push(list[i].missed_votes_pct);
//             break;
//             case'numberMissedVote' : most10.push(list[i].missed_votes);
//             break;
//         }
         
//         } 
         
//       return most10;
     
          
// }



// var statistics2 = {"number": [   
//                     { "republicans" : getListsLenght('R'),  
//                       "democrats"  : getListsLenght('D'),
//                       "independants"   : getListsLenght('I') },        
//                   ]   ,
//                   "partyForVote" : [
//                       {
//                         "republicans" : getAvVoteforParty('R'),  
//                         "democrats"  : getAvVoteforParty('D'),
//                         "independants"   : getAvVoteforParty('I') },   
                      
//                   ]    ,         
                  
//                   "attendanceVote" : [
//                       {
//                           "missedLeast" : [
//                             {
//                                 "name" : leastPrc(sortedListByAttendance,"name", percentage),
//                                 "numberMissedVote" : leastPrc(sortedListByAttendance,"numberMissedVote", percentage),
//                                 "prcMissedVote" : leastPrc(sortedListByAttendance,"prcMissedVote", percentage),
//                             }
//                           ],
                              
//                           "missedMost" : [
//                             {
//                                 "name" : mostPrc(sortedListByAttendance,"name", percentage),
//                                 "numberMissedVote" : mostPrc(sortedListByAttendance,"numberMissedVote", percentage),
//                                 "prcMissedVote" : mostPrc(sortedListByAttendance,"prcMissedVote", percentage),
//                             }
//                           ]

//                       }
//                   ]  , 
//                   "partyLoyalty" : [
//                     {
//                         "leastLoyal" : [
//                             {
//                                 "name" : leastPrc(sortedListByAttendance,"name", percentage),
//                                 "partyVote" : leastPrc(sortedListByAttendance,"partyVote", percentage),
//                                 "prcPartyVote" : leastPrc(sortedListByAttendance,"prcPartyVote", percentage),
//                             }
//                           ],
//                         "mostLoyal" : [
//                             {
//                                 "name" : mostPrc(sortedListByAttendance,"name", percentage),
//                                 "partyVote" : mostPrc(sortedListByAttendance,"partyVote", percentage),
//                                 "prcPartyVote" : mostPrc(sortedListByAttendance,"prcPartyVote", percentage),
//                             }
//                           ],

//                     }
//                 ]                             

//     } 

   
    
