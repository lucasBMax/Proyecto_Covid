const uri = 'api/Report';
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const fechaReporte = document.getElementById('fechaRegistro');
    const idCaso = document.getElementById('idCaso');
    const fechaNotificacion = document.getElementById('fechaNotificacion');
    const codDiviPolaDepto = document.getElementById('codDiviPolaDepto');
    const nombreDepto = document.getElementById('nombreDepto');
    const codDiviPolaMun = document.getElementById('codDiviPolaMun');
    const nombreMun = document.getElementById('nombreMun');
    const edad = document.getElementById('edad');
    const unidadMedida = document.getElementById('unidadMedida');
    const sexo = document.getElementById('sexo');
    const tipoContagio = document.getElementById('tipoContagio');
    const ubicacionCaso = document.getElementById('ubicacionCaso');
    const estado = document.getElementById('estado');
    const codigoPais = document.getElementById('codigoPais');
    const nombrePais = document.getElementById('nombrePais');
    const recuperado = document.getElementById('recuperado');
    const iniSintomas = document.getElementById('iniSintomas');
    const fechaMuerte = document.getElementById('fechaMuerte');
    const fechaDiagnostico = document.getElementById('fechaDiagnostico');
    const fechaRecupera = document.getElementById('fechaRecupera');
    const tipoRecupera = document.getElementById('tipoRecupera');
    const pertEtnica = document.getElementById('pertEtnica');
    const nombreGrupoEtni = document.getElementById('nombreGrupoEtni');

    const report = {
        FechaReporteWeb: fechaReporte.value + "T00:00:00",
        IdCaso: parseInt(idCaso.value),
        FechaNotificacion: fechaNotificacion.value + "T00:00:00",
        CodigoDivipolaDepto: parseInt(codDiviPolaDepto.value),
        NombreDepto: nombreDepto.value.trim(),
        CodigoDiviPolaMun: parseInt(codDiviPolaMun.value),
        NombreMun: nombreMun.value.trim(),
        Edad: parseInt(edad.value),
        UnidadMedida: parseInt(unidadMedida.value),
        Sexo: sexo.value,
        TipoContagio: tipoContagio.value,
        UbicacionCaso: ubicacionCaso.value.trim(),
        Estado: estado.value.trim(),
        CodigoIsoPais: parseInt(codigoPais.value),
        NombrePais: nombrePais.value.trim(),
        Recuperado: recuperado.value.trim(),
        FechaIniSintomas: iniSintomas.value + "T00:00:00",
        FechaMuerte: fechaMuerte.value + "T00:00:00",
        FechaDiagnostico: fechaDiagnostico.value + "T00:00:00",
        FechaRecuperacion: fechaRecupera.value + "T00:00:00",
        TipoRecuperacion: tipoRecupera.value.trim(),
        PertenenciaEtnica: pertEtnica.value,
        NombreGrupoEtnico: nombreGrupoEtni.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            //addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-fechaRegistro').value = item.fechaReporteWeb.slice(0, 10);
    document.getElementById('edit-idCaso').value = item.idCaso;
    document.getElementById('edit-fechaNotificacion').value = item.fechaNotificacion.slice(0, 10);
    document.getElementById('edit-codDiviPolaDepto').value = item.codigoDivipolaDepto;
    document.getElementById('edit-nombreDepto').value = item.nombreDepto;
    document.getElementById('edit-codDiviPolaMun').value = item.codigoDiviPolaMun;
    document.getElementById('edit-nombreMun').value = item.nombreMun;
    document.getElementById('edit-edad').value = item.edad;
    document.getElementById('edit-unidadMedida').value = item.unidadMedida;
    document.getElementById('edit-sexo').value = item.sexo;
    document.getElementById('edit-tipoContagio').value = item.tipoContagio;
    document.getElementById('edit-ubicacionCaso').value = item.ubicacionCaso;
    document.getElementById('edit-estado').value = item.estado;
    document.getElementById('edit-codigoPais').value = item.codigoIsoPais;
    document.getElementById('edit-nombrePais').value = item.nombrePais;
    document.getElementById('edit-recuperado').value = item.recuperado;
    document.getElementById('edit-iniSintomas').value = item.fechaIniSintomas.slice(0, 10);
    document.getElementById('edit-fechaMuerte').value = item.fechaMuerte.slice(0, 10);
    document.getElementById('edit-fechaDiagnostico').value = item.fechaDiagnostico.slice(0, 10);
    document.getElementById('edit-fechaRecupera').value = item.fechaRecuperacion.slice(0, 10);
    document.getElementById('edit-tipoRecupera').value = item.tipoRecuperacion;
    document.getElementById('edit-pertEtnica').value = item.pertenenciaEtnica;
    document.getElementById('edit-nombreGrupoEtni').value = item.nombreGrupoEtnico;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';
    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Editar';
        editButton.setAttribute('onclick', `displayEditForm("${item.id}")`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Borrar';
        deleteButton.setAttribute('onclick', `deleteItem("${item.id}")`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let fechaReporteWeb = document.createTextNode(item.fechaReporteWeb);
        td1.appendChild(fechaReporteWeb);

        let td2 = tr.insertCell(1);
        let idCaso = document.createTextNode(item.idCaso);
        td2.appendChild(idCaso);

        let td3 = tr.insertCell(2);
        let fechaNotificacion = document.createTextNode(item.fechaNotificacion);
        td3.appendChild(fechaNotificacion);

        let td4 = tr.insertCell(3);
        let diviPolDepto = document.createTextNode(item.codigoDivipolaDepto);
        td4.appendChild(diviPolDepto);

        let td5 = tr.insertCell(4);
        let nombreDepto = document.createTextNode(item.nombreDepto);
        td5.appendChild(nombreDepto);

        let td6 = tr.insertCell(5);
        let diviPolMun = document.createTextNode(item.codigoDiviPolaMun);
        td6.appendChild(diviPolMun);

        let td7 = tr.insertCell(6);
        let nombreMun = document.createTextNode(item.nombreMun);
        td7.appendChild(nombreMun);

        let td8 = tr.insertCell(7);
        let edad = document.createTextNode(item.edad);
        td8.appendChild(edad);

        let td9 = tr.insertCell(8);
        let unidadMedida = document.createTextNode(item.unidadMedida);
        td9.appendChild(unidadMedida);

        let td10 = tr.insertCell(9);
        let sexo = document.createTextNode(item.sexo);
        td10.appendChild(sexo);

        let td11 = tr.insertCell(10);
        let tipoContagio = document.createTextNode(item.tipoContagio);
        td11.appendChild(tipoContagio);

        let td12 = tr.insertCell(11);
        let ubicacionCaso = document.createTextNode(item.ubicacionCaso);
        td12.appendChild(ubicacionCaso);

        let td13 = tr.insertCell(12);
        let estado = document.createTextNode(item.estado);
        td13.appendChild(estado);

        let td14 = tr.insertCell(13);
        let codigoPais = document.createTextNode(item.codigoIsoPais);
        td14.appendChild(codigoPais);

        let td15 = tr.insertCell(14);
        let nombrePais = document.createTextNode(item.nombrePais);
        td15.appendChild(nombrePais);

        let td16 = tr.insertCell(15);
        let recuperado = document.createTextNode(item.recuperado);
        td16.appendChild(recuperado);

        let td17 = tr.insertCell(16);
        let iniSintomas = document.createTextNode(item.fechaIniSintomas);
        td17.appendChild(iniSintomas);

        let td18 = tr.insertCell(17);
        let fechaMuerte = document.createTextNode(item.fechaMuerte);
        td18.appendChild(fechaMuerte);

        let td19 = tr.insertCell(18);
        let fechaDiagnostico = document.createTextNode(item.fechaDiagnostico);
        td19.appendChild(fechaDiagnostico);

        let td20 = tr.insertCell(19);
        let fechaRecupera = document.createTextNode(item.fechaRecuperacion);
        td20.appendChild(fechaRecupera);

        let td21 = tr.insertCell(20);
        let tipoRecupera = document.createTextNode(item.tipoRecuperacion);
        td21.appendChild(tipoRecupera);

        let td22 = tr.insertCell(21);
        let pertEtnica = document.createTextNode(item.pertenenciaEtnica);
        td22.appendChild(pertEtnica);

        let td23 = tr.insertCell(22);
        let nombreGEtnico = document.createTextNode(item.nombreGrupoEtnico);
        td23.appendChild(nombreGEtnico);

        let td24 = tr.insertCell(23);
        td24.appendChild(editButton);

        let td25 = tr.insertCell(24);
        td25.appendChild(deleteButton);
    });

    todos = data;
}