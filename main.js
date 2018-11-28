
//variables
var results = data.results;
var membersObj;
 var checkboxParty = document.getElementById('checkboxPty');
 var tableBody = document.getElementById("senate-house-data");
//fetch memberList 
results.forEach(function(item){membersObj = item.members;});


//main
tableByParty();
checkboxParty.addEventListener('change', function(){onCheckboxPartyChange()});




//Parse members by party
function tableByParty(party) { 
    membersObj.forEach(function(item){
      if(!party){
        buildMemberTableRow(item);      }
      else if (item.party.indexOf(party)!= -1) 
      {buildMemberTableRow(item);
      }            
  });
    }  

    //Build HTML table
  function buildMemberTableRow(membersItem) {

    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
      var td = document.createElement('TD');
      td.href = membersItem.url;
      td.innerHTML = '<a href="'+membersItem.url+'">'+ membersItem.first_name + ' , ' + membersItem.last_name+'</a>';

      var td2 = document.createElement('TD');
      td2.textContent =membersItem.party;

      var td3 = document.createElement('TD');
      td3.textContent = membersItem.seniority;

      var td4 = document.createElement('TD');
      td4.textContent = membersItem.votes_with_party_pct + '%';

      tr.appendChild(td);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tableBody.appendChild(tr);

  }  

//event listener checkboxes  
  function onCheckboxPartyChange(){
var tickedBoxes = Array.from(document.querySelectorAll('input[name=checkboxParty]:checked')).map(elt => elt.value) ;
tableBody.innerHTML = "";
console.log(tickedBoxes);
if(tickedBoxes.length != 0){ for ( i=0; i< tickedBoxes.length; i++) {tableByParty(tickedBoxes[i]);}}
else{tableByParty();}   
  }
