var miembros;
if (window.location.pathname.includes('senate')) {
    getdata('senate');
} else {
    getdata('house');
}


function getdata(chamber) {
    var miInit = {
        method: 'GET',
        headers: { "X-API-Key": "kOK4gLtWTIjshvuJ5NRzbYG3l20oONuPsEtuKGUP" },
        mode: 'cors',
        cache: 'default'
    };
    let url = `https://api.propublica.org/congress/v1/113/${chamber}/members.json`;

    fetch(url, miInit).then(function (response) {

        if (response.ok) {
            response.json().then(function (mijson) {
                miembros = mijson.results[0].members;
                app.cargar(miembros);


            });
        } else {
            console.log('Respuesta de red OK.');
        }

    })
        .catch(function (error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
        });

}

