function initialize(){
    if (document.getElementById('senate-data')) {
        createSenateTable();
    } else if (document.getElementById('house-data')) {
        createHouseTable();
    }
}



function createSenateTable() {

    var formatedTable = addTableToHTML(filterMembers(data.results[0].members).sort());

    var senateTable = document.getElementById('senate-data');

    senateTable.innerHTML = formatedTable;
}

function createHouseTable() {

    var formatedTable = addTableToHTML(filterMembers(data.results[0].members).sort());

    var houseTable = document.getElementById('house-data');

    houseTable.innerHTML = formatedTable;
}



function addTableToHTML(membersArray) {
    var tabla = '<thead class="thead-dark"><tr><th>Full Name</th><th>Party</th><th>State </th><th>Seniority</th><th>Percentage of votes with party</th></tr></thead>';

    tabla += '<tbody>';

    membersArray.forEach(function (member) {
        tabla += '<tr>';


        var middle = member.middle_name || "";

        tabla += '<td><a href="' + member.url + '">' + member.first_name + ' ' + middle + ' ' + member.last_name + '</a></td>';

        tabla += '<td class="party">' + member.party + '</td>';

        tabla += '<td class="state">' + member.state + '</td>';


        tabla += '<td>' + member.seniority + '</td>';

        tabla += '<td> % ' + member.votes_with_party_pct + '</td>';

        tabla += '</tr>';
    });

    tabla += '</tbody>';

    return tabla;

}
// tomo los valores de los checkboxes
function getCheckBoxes() {
    return Array.from(document.querySelectorAll('input[name=party-filter]:checked')).map(check => check.value);
}

function getStateFilterValue() {
    return document.querySelector('select').value;
}

// paso el array con los miembros y los filtro
function filterMembers(membersArray) {
    let checkValues, stateFilterValue;

    checkValues = this.getCheckBoxes();
    stateFilterValue = this.getStateFilterValue();

    return membersArray.filter(members => checkValues.includes(members.party)).filter(members => (!stateFilterValue || members.state === stateFilterValue));

}
