const dropDownStates = document.getElementById('dropDownStates');
const checkboxParty = document.getElementById('checkboxPty');
const loader = document.getElementById("loader");


new Vue({
  el: '#app',
  data: {
    retrieved: false,
    senators: null,
    checkedNames: [],
    selected: 'All',
    states: []

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
      let stateArray = this.senators.map(a => a.state);
     this.states = stateArray.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
    }
  },
  created() {
    this.fetchJson();
  },
  computed: {

    filteredList: function () {
      if(this.retrieved){
        console.log(this.selected);
      return this.senators.filter(a => {
        var stateFilterValue = this.selected == "All" || this.selected == a.state;
        var partyFilterValue = this.checkedNames.length == 0 || this.checkedNames.includes(a.party)
        return stateFilterValue && partyFilterValue
      })
    }}
  }
});