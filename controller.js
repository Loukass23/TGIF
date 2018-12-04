//to be moved to controller
buildTable1('statR', statistics.number[0].republicans, statistics.partyForVote[0].republicans);
buildTable1('statD', statistics.number[0].democrats, statistics.partyForVote[0].democrats);
buildTable1('statI', statistics.number[0].independants, statistics.partyForVote[0].independants);

buildTable2('leastAtt', statistics.attendanceVote[0].missedMost[0].name , statistics.attendanceVote[0].missedMost[0].numberMissedVote, statistics.attendanceVote[0].missedMost[0].prcMissedVote);
buildTable2('mostAtt', statistics.attendanceVote[0].missedLeast[0].name , statistics.attendanceVote[0].missedLeast[0].numberMissedVote, statistics.attendanceVote[0].missedLeast[0].prcMissedVote);
