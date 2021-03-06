
let materias = [];


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
    elementHTML += '        <button type="button" class="btn btn-primary">';
    elementHTML += '            <img src="resources/icons/edit.svg" alt="Editar" title="Editar">';
    elementHTML += '        </button>';
    elementHTML += '        <button type="button" class="btn btn-danger">';
    elementHTML += '            <img src="resources/icons/delete.svg" alt="Eliminar" title="Eliminar">';
    elementHTML += '        </button>';
    elementHTML += '    </td>';
    elementHTML += '</tr>';
    return elementHTML;
}

function addMateria() {
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


document.getElementById('btnRegistrar').addEventListener('click', function () {
    document.getElementById('modalFormulario').classList.remove('modalClosed');

    document.getElementById('tituloModalFormulario').innerText = 'Registrar Materia';

    document.getElementById('materiaInput').value = '';
    document.getElementById('notaInput').value = '';
});

document.getElementById('btnCalcular').addEventListener('click', function () {
    document.getElementById('modalPromedio').classList.remove('modalClosed');
});

document.getElementById('formMateria').addEventListener('submit', function (event) {
    event.preventDefault();
    addMateria();
    closeModal('modalFormulario');
});