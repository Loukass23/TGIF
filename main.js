
var checkboxParty = document.getElementById('checkboxPty');
var dropdownpState = document.getElementById('dropDownStates');
var tableBody = document.getElementById("senate-house-data");
var loader = document.getElementById("loader");
var dropdownStates =[];
var state ="";
let fullList = [];


fetchJson(url , {
          method: "GET",
          headers: new Headers({"X-API-Key": 'yM7WFa1TO8Y2eJQxD31fGVolfpMVNmqu9XOjBvfq'})
});


function fetchJson(url, init) {
  
  return fetch(url, init).then(function(response) {
    if (response.ok) {
      return response.json();    
    }
  }).then(function(json) {
  
    fullList = json.results[0].members;
        startMain(fullList);
   
    })
    .catch(console.error("Server Error"));
    
  }
//variables

function startMain(membersObj){
loader.innerHTML ="";
buildDropdownStates(membersObj);
addListeners();
filterBuildTable(membersObj);
}
//event listeners
function addListeners(){
checkboxParty.addEventListener('change', filterBuildTable);
// checkboxParty.addEventListener('change', function(){tableBody.innerHTML = "",filterBuildTable()});
dropdownpState.addEventListener('change', filterBuildTable);
}
//event listener in JQuery
//$("#checkboxPty").on("change", onCheckboxPartyChangeJquery);
//$("#dropDownStates").on("change", onDropdownpStateChangeJquery);


// Build Table in JQuery
// function jQueryTable(){
//   $("#senate-house-data tr").each(function () {
//   $(this).toggle(stateSelected);
// });
// }




//Parse members by party
function filterBuildTable() {
  tableBody.innerHTML = "";
  //new filter
  
  var filteredMemberArray = fullList.filter(member => {
    
    var stateFilterValue = getDropdownValue() == "All" || getDropdownValue() == member.state;
    var partyFilterValue = getCheckboxValue().length == 0 || getCheckboxValue().includes(member.party)
    return stateFilterValue && partyFilterValue
  
     });

 filteredMemberArray.forEach(member => {
  buildMemberTableRow(member);
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
      td2.innerHTML = '<a class="party">'+membersItem.party+'</a>'
     
      

      var td3 = document.createElement('TD');
      td3.textContent = membersItem.seniority;

      var td4 = document.createElement('TD');
      td4.textContent = membersItem.votes_with_party_pct + '%';

      var td5 = document.createElement('TD');
      td5.innerHTML = '<div class="state">'+membersItem.state+'</div>'

      tr.appendChild(td);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tableBody.appendChild(tr);

  }

  




//getters & setters


function buildDropdownStates(membersObj) {
  
  membersObj.forEach(function(item){
  var state = item.state;  
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
});
}
function getCheckboxValue(){
 return Array.from(document.querySelectorAll('input[name=checkboxParty]:checked')).map(elt => elt.value) ;
   }

function getDropdownValue(){
    return dropdownpState.options[dropdownpState.selectedIndex].text;}

function isIncluded(x, lst) {
     return lst.length === 0 || lst.indexOf(x) != -1;
  }



    //JQuery
  function onCheckboxPartyChangeJquery(){
    var tickedBox = Array.from(document.querySelectorAll('input[name=checkboxParty]:checked')).map(elt => elt.value) ;
    var tickedBoxes = tickedBox ? [ tickedBox ] : [];

    $("#senate-house-data tr").each(function () {
      var tickedBox = $(this).find(".party").text();

      for (var i in tickedBoxes){

      var boxSelected = isIncluded(tickedBox, tickedBoxes[i]);
      console.log(tickedBox+tickedBoxes+boxSelected)
      $(this).toggle(boxSelected);}
    });
  }
  function onDropdownpStateChangeJquery() {

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
