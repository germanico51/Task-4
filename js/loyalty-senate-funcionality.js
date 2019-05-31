var dataR = data.results[0].members;

function toDrawTable(memberToDraw, idTable) {                     //To Draw table
	var tBody = document.querySelector("[id=" + CSS.escape(idTable) + "]" + " > tbody") //To call TBODY
	//TBODY
	memberToDraw.forEach((member) => {         //To create tr for each member
		var tr = document.createElement("tr");
		tBody.appendChild(tr);

		member.forEach((dataMember) => {       		//To create td for each data'member
			var td = document.createElement("td");
			td.innerHTML = dataMember
			tr.appendChild(td)
		})
	})
}

function getMembersByParty(PartyMembers) {
    var members = dataR.filter(member => member.party == PartyMembers)
    return members;
}

function getAverage(PartyArraymMembers) {
    return (PartyArraymMembers.reduce((accumulator, member) => accumulator + member.votes_with_party_pct, 0) / PartyArraymMembers.length).toFixed(2);
}

var republicans = getMembersByParty("R");
var democrats = getMembersByParty("D");
var independents = getMembersByParty("I");

statistics.numbers_of_republicans = republicans.length;
statistics.numbers_of_democrats = democrats.length;
statistics.numbers_of_independents = independents.length;
statistics.numbers_of_total = dataR.length;

statistics.average_votes_party_democrats = getAverage(democrats);
statistics.average_votes_party_republicans = getAverage(republicans);
statistics.average_votes_party_independents = getAverage(independents);
statistics.average_votes_party_total = getAverage(dataR)

statistics.least_loyal = filterByPercent(dataR, 10, ">", "votes_with_party_pct");

statistics.most_loyal = filterByPercent(dataR, 90, "", "votes_with_party_pct").reverse()





function filterByPercent(data, percent, type, key) {
    let dataOrd = data.sort((a, b) => (a[key] - b[key])); //ordena el array por votos
    let posPercent = Math.ceil((percent * dataOrd.length) / 100) - 1; // entero superior del 10%
    let valuePositionPersent = dataOrd[posPercent][key]; // valor de la posicion del porcentaje
    let dataFilterByPercent = dataOrd.filter((member) => (type == ">" ? member[key] <= valuePositionPersent : member[key] >= valuePositionPersent)); //filtra segun el valor de la pos en la cola del array
                                                          
    return dataFilterByPercent;                                                         
}
var senateAtAGlance = [
	["<b>Democrats</b>", statistics.numbers_of_democrats, statistics.average_votes_party_democrats],
	["<b>Republicans</b>", statistics.numbers_of_republicans, statistics.average_votes_party_republicans],
	["<b>Independents</b>", statistics.numbers_of_independents, statistics.average_votes_party_independents],
	["<b>Total</b>", statistics.numbers_of_total, statistics.average_votes_party_total]]
toDrawTable(senateAtAGlance, "senateAtAGlance")



var tableLeastLoyal = statistics.least_loyal.map((member) => [
	'<a href="' + member.url + '">' + member.last_name + ' ' + member.first_name +' '+(member.middle_name || '') + '</a>',
	member.party,
	parseInt((member.total_votes * member.votes_with_party_pct) / 100),
	member.votes_with_party_pct + "%",
])
toDrawTable(tableLeastLoyal, "leastLoyal")

var tableMostLoyal = statistics.most_loyal.map((member) => [
	'<a href="' + member.url + '">' + member.last_name + ' ' + member.first_name + ' '+(member.middle_name || '') + '</a>',
	member.party,
	parseInt((member.total_votes * member.votes_with_party_pct) / 100),
	member.votes_with_party_pct + "%",
])
toDrawTable(tableMostLoyal, "mostLoyal")

console.log(statistics)
