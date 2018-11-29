
//variables
var results = data.results;
var membersObj;
 var checkboxParty = document.getElementById('checkboxPty');
 //var dropdownpState = document.getElementById('dropdownState');
 var tableBody = document.getElementById("senate-house-data");
 var dropdownStates =[];
//fetch memberList
results.forEach(function(item){membersObj = item.members;});


//main
tableByParty();

//event listeners
checkboxParty.addEventListener('change', function(){onCheckboxPartyChange()});
//dropdownpState.addEventListener('change', function(){onDropdownpStateChange()});
$("#dropDownStates").on("change", onDropdownpStateChange);


$(document).ready(function(){
  $(".dropdown").on("show.bs.dropdown", function(event){
      var x = $(event.relatedTarget).text(); // Get the button text
      alert("You clicked on: " + x);
  });
});


function buildDropdownStates(state) {
  var exists =false;
  var stateID = document.getElementById("dropDownStates");
  if (state)
    {for(var i in dropdownStates) {if(dropdownStates[i] === state){exists = true;}}
  if(!exists){
  dropdownStates.push(state);
  var el = document.createElement("State");
  var option = document.createElement("option");
  //el.innerHTML = '<option value='+state+'>'+state+'</option>';

  // el.textContent = state;
  el.id = 'stateItem';
  el.value = state;
  el.textContent =state;
  option.appendChild(el)
  stateID.appendChild(option);
    }
}
}

function jQueryTable(){
  $("#senate-house-data tr").each(function () {
  $(this).toggle(stateSelected);
});
}
//Parse members by party
function tableByParty(party ) {
    membersObj.forEach(function(item){
      
      buildDropdownStates(item.state);
      if(!party ){
        buildMemberTableRow(item);      }
      else if (item.party.indexOf(party)!= -1)
      {buildMemberTableRow(item);
      }
  });
    }

    //Build HTML row
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

      var td5 = document.createElement('TD');
      td5.innerHTML = '<a class="state">'+membersItem.state+'</a>'
      //td5.textContent = membersItem.state;
     // td5.value = membersItem.state;
      //td5.class = 'state'

      tr.appendChild(td);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tableBody.appendChild(tr);

  }

//event listener functions
  function onCheckboxPartyChange(){
var tickedBoxes = Array.from(document.querySelectorAll('input[name=checkboxParty]:checked')).map(elt => elt.value) ;
tableBody.innerHTML = "";
if(tickedBoxes.length != 0){ for ( i=0; i< tickedBoxes.length; i++) {tableByParty(tickedBoxes[i]);}}
else{tableByParty();}
  }

 
  function onDropdownpStateChange() {

    var state = $('#dropDownStates').find(":selected").text();
    //var state = $("#stateItem").val();
    var states = state ? [ state ] : [];

    $("#senate-house-data tr").each(function () {
      var state = $(this).find(".state").text();
      var stateSelected = isIncluded(state, states);
      console.log(state + states + stateSelected);
      $(this).toggle(stateSelected);
    });
  }
   function isIncluded(x, lst) {
     return lst.length === 0 || lst.indexOf(x) != -1;
  }
