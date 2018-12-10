const dropDownStates = document.getElementById('dropDownStates');

new Vue({
    el: '#app',
    data: {
        senators: null,
        filteredList: null,
        stateFilter: ""
    },
    methods: {
        fetchJson() {
            var _this = this;
            fetch(url, {
                    method: "GET",
                    headers: new Headers({
                        "X-API-Key": 'yM7WFa1TO8Y2eJQxD31fGVolfpMVNmqu9XOjBvfq'
                    })
                }).then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }
                }).then(function (json) {

                    _this.senators = json.results[0].members;
                    _this.filteredList = json.results[0].members;
                    _this.buildDropdownStates();
                    _this.addListeners();


                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        buildDropdownStates() {
            var dropdownStates = [];
            this.senators.forEach(function (item) {
              var state = item.state;
              var exists = false;
              var stateID = document.getElementById("dropDownStates");
              if (state) {
                for (var i in dropdownStates) {
                  if (dropdownStates[i] === state) {
                    exists = true;
                  }
                }
                if (!exists) {
                  dropdownStates.push(state);
                  var el = document.createElement("State");
                  var option = document.createElement("option");
                  //el.innerHTML = '<option value='+state+'>'+state+'</option>';
          
                  // el.textContent = state;
                  el.id = 'stateItem';
                  el.value = state;
                  el.textContent = state;
                  option.appendChild(el)
                  stateID.appendChild(option);
                }
              }
            });
          },
        filters() {
            console.log('filter');
            this.filteredList = this.senators.filter(a => {
                var stateFilterValue = this.stateFilter == "All" || this.stateFilter == a.state;
                //var partyFilterValue = getCheckboxValue().length == 0 || getCheckboxValue().includes(a.party)
                return stateFilterValue 
                //&& partyFilterValue
              })

            
        },
        addListeners() {
            //partyFilter.addEventListener('change', this.filters());
            var dropDownStates = document.getElementById('dropDownStates');
            dropDownStates.addEventListener('change', this.setFilters() );
        },
        setFilters(){
            this.stateFilter = document.getElementById('dropDownStates').options[document.getElementById('dropDownStates').selectedIndex].text
           
        }
    },
    created() {

        this.fetchJson();
        
        



    },
    destroyed() {
        
    },
    computed: {

    }
});

/* 
  new Vue({
    el: '#app',
    data: {
    partyFilter : document.getElementById('checkboxPty'),
    stateFilter : document.getElementById('dropDownStates'),
    stateFilterValue: true,
    senators: membersObj,
    filteredMemberArray: membersObj,

    },
    method: {
      filters() {
         return senators.filter(member => {
          var stateFilterValue = getDropdownValue() == "All" || getDropdownValue() == member.state;
          var partyFilterValue = getCheckboxValue().length == 0 || getCheckboxValue().includes(member.party)
          return stateFilterValue && partyFilterValue
        })
      },
      
      addListeners() {
        partyFilter.addEventListener('change', this.filters);
        stateFilter.addEventListener('change', this.filters);
      }},
      created() {
        console.log(this.filters());
        this.filteredMemberArray = this.methods.filters();
        console.log(this.filteredMemberArray);

        // this.filters();
        //this.methods.addListeners();
       },
    computed: {
     

    }
  })
}




var checkboxParty = document.getElementById('checkboxPty');
var dropdownpState = document.getElementById('dropDownStates');
var tableBody = document.getElementById("senate-house-data");
var loader = document.getElementById("loader");
var dropdownStates = [];
var state = "";





function fetchJson(url, init) {

  return fetch(url, init).then(function (response) {
      if (response.ok) {
        return response.json();
      }
    }).then(function (json) {

      startMain(json.results[0].members);

    })
    .catch(function (error) {
      console.log(error)
    })
}
//variables

function startMain(membersObj) {

  loader.innerHTML = "";
  buildDropdownStates(membersObj);
  //addListeners();
  // filterBuildTable(membersObj);




//event listeners
function addListeners() {
  checkboxParty.addEventListener('change', filterBuildTable);
  // checkboxParty.addEventListener('change', function(){tableBody.innerHTML = "",filterBuildTable()});
  dropdownpState.addEventListener('change', filterBuildTable);
}





// //Parse members by party
// function filterBuildTable(membersObj) {
//   tableBody.innerHTML = "";
//   //new filter
//   var filteredMemberArray = membersObj.filter(member => {

//     var stateFilterValue = getDropdownValue() == "All" || getDropdownValue() == member.state;
//     var partyFilterValue = getCheckboxValue().length == 0 || getCheckboxValue().includes(member.party)
//     return stateFilterValue && partyFilterValue

//      });

//  filteredMemberArray.forEach(member => {
//   buildMemberTableRow(member);
//   });
//     }




//Build HTML row
// function buildMemberTableRow(membersItem) {

//   var tr = document.createElement('TR');
//   tableBody.appendChild(tr);
//     var td = document.createElement('TD');
//     td.href = membersItem.url;
//     td.innerHTML = '<a href="'+membersItem.url+'">'+ membersItem.first_name + ' , ' + membersItem.last_name+'</a>';

//     var td2 = document.createElement('TD');
//     td2.innerHTML = '<a class="party">'+membersItem.party+'</a>'



//     var td3 = document.createElement('TD');
//     td3.textContent = membersItem.seniority;

//     var td4 = document.createElement('TD');
//     td4.textContent = membersItem.votes_with_party_pct + '%';

//     var td5 = document.createElement('TD');
//     td5.innerHTML = '<div class="state">'+membersItem.state+'</div>'

//     tr.appendChild(td);
//     tr.appendChild(td2);
//     tr.appendChild(td3);
//     tr.appendChild(td4);
//     tr.appendChild(td5);
//     tableBody.appendChild(tr);

// }






//getters & setters


function buildDropdownStates(membersObj) {

  membersObj.forEach(function (item) {
    var state = item.state;
    var exists = false;
    var stateID = document.getElementById("dropDownStates");
    if (state) {
      for (var i in dropdownStates) {
        if (dropdownStates[i] === state) {
          exists = true;
        }
      }
      if (!exists) {
        dropdownStates.push(state);
        var el = document.createElement("State");
        var option = document.createElement("option");
        //el.innerHTML = '<option value='+state+'>'+state+'</option>';

        // el.textContent = state;
        el.id = 'stateItem';
        el.value = state;
        el.textContent = state;
        option.appendChild(el)
        stateID.appendChild(option);
      }
    }
  });
}

function getCheckboxValue() {
  return Array.from(document.querySelectorAll('input[name=checkboxParty]:checked')).map(elt => elt.value);
}

function getDropdownValue() {
  return dropdownpState.options[dropdownpState.selectedIndex].text;
}

function isIncluded(x, lst) {
  return lst.length === 0 || lst.indexOf(x) != -1;
}



//JQuery
function onCheckboxPartyChangeJquery() {
  var tickedBox = Array.from(document.querySelectorAll('input[name=checkboxParty]:checked')).map(elt => elt.value);
  var tickedBoxes = tickedBox ? [tickedBox] : [];

  $("#senate-house-data tr").each(function () {
    var tickedBox = $(this).find(".party").text();

    for (var i in tickedBoxes) {

      var boxSelected = isIncluded(tickedBox, tickedBoxes[i]);
      console.log(tickedBox + tickedBoxes + boxSelected)
      $(this).toggle(boxSelected);
    }
  });
}*/