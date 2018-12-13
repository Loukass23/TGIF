const loader = document.getElementById("loader");

new Vue({
  el: '#app',
  data: {
    retrieved: false,
    senators: null,
    checkedNames: [],
    selected: 'All',
    states: [],
    stats: []

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
          if (loader) {
            loader.innerHTML = "";
          }

          this.senators = json.results[0].members;
          this.retrieved = true;
          this.buildDropdownStates();
          this.buildStatJson();
          this.stats = statistics
          console.log(this.stats.partyLoyalty[0]);

        })
        .catch(function (error) {
          console.log(error)
        })
    },
    buildDropdownStates() {
      let stateArray = this.senators.map(a => a.state);
      this.states = stateArray.filter(function (item, i, ar) {
        return ar.indexOf(item) === i;
      });

    },
    buildStatJson() {
      let rep = this.senators.filter(a => a.party == 'R');
      let dem = this.senators.filter(a => a.party == 'D');
      let ind = this.senators.filter(a => a.party == 'I');
      statistics.atAglance[0].republicans = [rep.length, ((rep.map(a => a.votes_with_party_pct).reduce((x, y) => x + y, 0)) / rep.length).toFixed(2)];
      statistics.atAglance[0].democrats = [dem.length, ((dem.map(a => a.votes_with_party_pct).reduce((x, y) => x + y, 0)) / dem.length).toFixed(2)];
      statistics.atAglance[0].independants = [ind.length, ((ind.map(a => a.votes_with_party_pct).reduce((x, y) => x + y, 0)) / ind.length).toFixed(2)];

      statistics.attendanceVote[0].missedLeast = this.getAttendanceList('least');
      statistics.attendanceVote[0].missedMost = this.getAttendanceList('most');
      statistics.partyLoyalty[0].leastLoyal = this.getLoyaltyList('least');
      statistics.partyLoyalty[0].mostLoyal = this.getLoyaltyList('most');



    },
    getLoyaltyList(leastMost) {

      var percentage = Math.round(10 * this.senators.length / 100);
      var list = this.senators.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct
      });
      var limitLeast = list[percentage - 1];
      var limitMost = list[list.length - percentage];
      //get least and most
      if (leastMost == 'least') {
        var res = list.filter(a => a.votes_with_party_pct <= limitLeast.votes_with_party_pct);
      } else {
        var list2 = list.filter(a => a.votes_with_party_pct >= limitMost.votes_with_party_pct);
        res = list2.sort(function (a, b) {
          return b.votes_with_party_pct - a.votes_with_party_pct
        });
      }


      //strip values to needed
      return res.map(a => {
        return [a.first_name + ' , ' + a.last_name, (a.total_votes * a.votes_with_party_pct / 100).toFixed(2), a.votes_with_party_pct];
      })
    },
    getAttendanceList(leastMost) {

      var percentage = Math.round(10 * this.senators.length / 100);
      var list = this.senators.sort((a, b) => {
        return a.missed_votes_pct - b.missed_votes_pct
      });
      var limitLeast = list[percentage - 1];
      var limitMost = list[list.length - percentage];
      //get least and most
      if (leastMost == 'least') {
        var res = list.filter(a => a.missed_votes_pct <= limitLeast.missed_votes_pct);
      } else {
        var list2 = list.filter(a => a.missed_votes_pct >= limitMost.missed_votes_pct);
        res = list2.sort((a, b) => {
          return b.missed_votes_pct - a.missed_votes_pct
        });
      }

      //strip values to needed
      return res.map(a => {
        return [a.first_name + ' , ' + a.last_name, a.missed_votes, a.missed_votes_pct];
      })
    }

  },
  created() {
    this.fetchJson();
  },
  computed: {

    filteredList: function () {
      if (this.retrieved) {
        console.log(this.selected);
        return this.senators.filter(a => {
          var stateFilterValue = this.selected == "All" || this.selected == a.state;
          var partyFilterValue = this.checkedNames.length == 0 || this.checkedNames.includes(a.party)
          return stateFilterValue && partyFilterValue
        })
      }
    }
  }
});

