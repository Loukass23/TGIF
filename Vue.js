// Vue.config.debug = true // turn on debugging mode
// import PulseLoader from './PulseLoader.vue'
// var PulseLoader = VueSpinner.PulseLoader
const loader = document.getElementById("loader");
//var PulseLoader = VueSpinner.PulseLoader;



new Vue({
  el: '#app',
  data: {
    retrieved: false,
    senators: null,
    checkedNames: [],
    selected: 'All',
    states: [],
    stats: []
    //PulseLoader

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
          if (loader){loader.innerHTML = "";}
          
          this.senators = json.results[0].members;
          this.retrieved = true;
          this.buildDropdownStates();
          this.stats = buidStatistic(this.senators);

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
