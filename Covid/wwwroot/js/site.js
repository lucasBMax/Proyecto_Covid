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

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-isComplete').checked = item.isComplete;
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
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);

        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.name);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    todos = data;
}