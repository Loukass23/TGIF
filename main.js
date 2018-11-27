

var results = data.results;
var membersObj;
var name;

//fetch memberList 
results.forEach(function(item){membersObj = item.members;});
var tableBody = document.getElementById("senate-data");

membersObj.forEach(function(item){

    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
      var td = document.createElement('TD');
      td.href = item.url;
      td.innerHTML = '<a href="'+item.url+'">'+ item.first_name + ' , ' + item.last_name+'</a>';

      var td2 = document.createElement('TD');
      td2.textContent =item.party;

      var td3 = document.createElement('TD');
      td3.textContent = item.seniority;

      var td4 = document.createElement('TD');
      td4.textContent = item.votes_with_party_pct + '%';

      tr.appendChild(td);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tableBody.appendChild(tr);
    
  }
);
 

        //  for ( var i indata.results)
        // document.getElementById("senate-data").innerHTML = myArr[0];
        
        
    //     var dataArray = JSON.stringify(data,null,2);   
    //  var results = dataArray.split('results');
    //  results = (results[1]+results[2]);
    //  console.log(results);
   
   