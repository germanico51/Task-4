let miembros = null;

var statistics = {
    "numbers_of_republicans": 0,
    "numbers_of_democrats": 0,
    "numbers_of_independents": 0,
    "numbers_of_total": 0,

    "average_votes_party_republicants": 0,
    "average_votes_party_democrats": 0,
    "average_votes_party_independents": 0,
    "average_votes_party_total": 0,

    "least_loyal": [],
    "most_loyal": [],
    "least_engaged": [],
    "most_engaged": [],
}
function getMembersByParty(PartyMembers) {
    var members = miembros.filter(member => member.party == PartyMembers)
    return members;
}

function getAverage(PartyArraymMembers) {
    return (PartyArraymMembers.reduce((accumulator, member) => accumulator + member.votes_with_party_pct, 0) / PartyArraymMembers.length).toFixed(2);
}
function filterByPercent(data, percent, type, key) {
    let dataOrd = data.sort((a, b) => (a[key] - b[key])); //ordena el array por votos
    let posPercent = Math.ceil((percent * dataOrd.length) / 100) - 1; // entero superior del 10%
    let valuePositionPersent = dataOrd[posPercent][key]; // valor de la posicion del porcentaje
    let dataFilterByPercent = dataOrd.filter((member) => (type == ">" ? member[key] <= valuePositionPersent : member[key] >= valuePositionPersent)); //filtra segun el valor de la pos en la cola del array
                                                          
    return dataFilterByPercent;                                                         
}

var republicans = getMembersByParty("R");
var democrats = getMembersByParty("D");
var independents = getMembersByParty("I");


function llenarEstadisticas(){


statistics.numbers_of_republicans = republicans.length;
statistics.numbers_of_democrats = democrats.length;
statistics.numbers_of_independents = independents.length;
statistics.numbers_of_total = miembros.length;

statistics.average_votes_party_democrats = getAverage(democrats);
statistics.average_votes_party_republicans = getAverage(republicans);
statistics.average_votes_party_independents = getAverage(independents);
statistics.average_votes_party_total = getAverage(miembros)

statistics.least_loyal = filterByPercent(miembros, 10, ">", "votes_with_party_pct");

statistics.most_loyal = filterByPercent(miembros, 90, "", "votes_with_party_pct").reverse()

statistics.most_engaged = filterByPercent(miembros, 10, ">", "missed_votes_pct")
statistics.least_engaged = filterByPercent(miembros, 90, "", "missed_votes_pct").reverse()


}

