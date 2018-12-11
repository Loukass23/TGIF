const dropDownStates = document.getElementById('dropDownStates');
const checkboxParty = document.getElementById('checkboxPty');
const loader = document.getElementById("loader");


new Vue({
  el: '#app',
  data: {
    retrieved: false,
    senators: null,
    checkedNames: [],
    selected: 'All'

  },
  methods: {
    fetchJson() {
      fetch(url, {
          method: "GET",
          headers: new Headers({
            "X-API-Key": 'yM7WFa1TO8Y2eJQxD31fGVolfpMVNmqu9XOjBvfq'
          })
        }).then(function (response) {
          if (response.ok) {
            return response.json();
          }
        }).then((json) => {
          loader.innerHTML = "";
          this.senators = json.results[0].members;
          this.retrieved = true;
          console.log(this.senators);
          this.buildDropdownStates();

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
      console.log(this.dropDown);
      this.senators = this.senators.filter(a => {
        var stateFilterValue = this.dropDown == "All" || this.dropDown == a.state;
        var partyFilterValue = this.checkedBox.length == 0 || this.checkedBox.includes(a.party)
        return stateFilterValue && partyFilterValue
      })


    }
  },
  created() {
    this.fetchJson();
  },
  computed: {

    filteredList: function () {
      if(this.retrieved){
      return this.senators.filter(a => {
        var stateFilterValue = this.selected == "All" || this.selected == a.state;
        var partyFilterValue = this.checkedNames.length == 0 || this.checkedNames.includes(a.party)
        return stateFilterValue && partyFilterValue
      })
    }}
  }
});