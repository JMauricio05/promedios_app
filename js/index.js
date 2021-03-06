
let materias = [
    { nombre: 'Prueba 1', nota: 4.2 },
    { nombre: 'Prueba 2', nota: 4 },
    { nombre: 'Prueba 3', nota: 3 },
];
actualizarHtmlTbody();


let operacion = '';
let indexElementoSeleccionado = null;

function closeModal(idModal) {
    document.getElementById(idModal).classList.add('modalClosed');
}

function getTemplateElementTr(consecutivo, materia) {
    let elementHTML = '';
    elementHTML += '<tr>';
    elementHTML += '    <td>' + consecutivo + '</td>';
    elementHTML += '    <td>' + materia.nombre + '</td>';
    elementHTML += '    <td>' + materia.nota + '</td>';
    elementHTML += '    <td>';
    elementHTML += '        <button type="button" class="btn btn-primary" onclick="onClickEditar(' + consecutivo + ')">';
    elementHTML += '            <img src="resources/icons/edit.svg" alt="Editar" title="Editar">';
    elementHTML += '        </button>';
    elementHTML += '        <button type="button" class="btn btn-danger" onclick="onClickEliminar(' + consecutivo + ')">';
    elementHTML += '            <img src="resources/icons/delete.svg" alt="Eliminar" title="Eliminar">';
    elementHTML += '        </button>';
    elementHTML += '    </td>';
    elementHTML += '</tr>';
    return elementHTML;
}

function addMateria() {
    indexElementoSeleccionado = null;
    let nombre = document.getElementById('materiaInput').value;
    let nota = document.getElementById('notaInput').value;
    let materia = { 'nombre': nombre, 'nota': nota };
    materias.push(materia);

    let tbodyMaterias = document.getElementById('tablaMaterias').getElementsByTagName('tbody')[0];
    if (materias.length == 1) {
        tbodyMaterias.innerHTML = '';
    }
    let elementHTML = getTemplateElementTr(materias.length, materia);
    tbodyMaterias.innerHTML += elementHTML;

}

function actualizarHtmlTbody() {
    let tbodyMaterias = document.getElementById('tablaMaterias').getElementsByTagName('tbody')[0];
    tbodyMaterias.innerHTML = '';
    materias.forEach((value, index) => {
        let elementHTML = getTemplateElementTr(index + 1, value);
        tbodyMaterias.innerHTML += elementHTML;
    });
    if (materias.length == 0) {
        tbodyMaterias.innerHTML = '<tr><td colspan="4" class="text-center">No hay materias registradas</td></tr>';
    }
}

function editMateria() {
    let nombre = document.getElementById('materiaInput').value;
    let nota = document.getElementById('notaInput').value;
    let materia = { 'nombre': nombre, 'nota': nota };
    materias[indexElementoSeleccionado] = materia;
    actualizarHtmlTbody();
}

function onClickEditar(index) {
    indexElementoSeleccionado = index - 1;
    let materia = materias[indexElementoSeleccionado];

    document.getElementById('modalFormulario').classList.remove('modalClosed');
    document.getElementById('tituloModalFormulario').innerText = 'Modificar Materia';
    document.getElementById('materiaInput').value = materia.nombre;
    document.getElementById('notaInput').value = materia.nota;
    operacion = 'editar';
}

function onClickEliminar(index) {
    indexElementoSeleccionado = null;
    materias.splice(index - 1, 1);
    actualizarHtmlTbody();
}


document.getElementById('btnRegistrar').addEventListener('click', function () {
    document.getElementById('modalFormulario').classList.remove('modalClosed');

    document.getElementById('tituloModalFormulario').innerText = 'Registrar Materia';

    document.getElementById('materiaInput').value = '';
    document.getElementById('notaInput').value = '';
    operacion = 'registrar';
});

document.getElementById('btnCalcular').addEventListener('click', function () {
    document.getElementById('modalPromedio').classList.remove('modalClosed');
});

document.getElementById('formMateria').addEventListener('submit', function (event) {
    event.preventDefault();
    if (operacion == 'registrar') {
        addMateria();
    } else {
        editMateria();
    }

    closeModal('modalFormulario');
});