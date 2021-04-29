var dados = []

function apagaRegistro(id) {
    let _confirm = confirm ("Deseja realmente excluir este registro?")

    if (_confirm) {
        for (let i=0; i < dados.length; i++) {
            if (dados[i].ID == id) {
                dados.splice(i, 1)
            }
        }
        populaTabela()
    }
}

function editaRegistro(id) {
    $("#modalRegistro").modal("show")

    dados.forEach(function(cad) {
        if (cad.ID == id) {
            $("#hdID").val(cad.ID)
            $("#txtMatricula").val(cad.Matricula)
            $("#txtNome").val(cad.Nome)
            $("#txtCelular").val(cad.Celular)
            $("#txtEquipamento").val(cad.Equipamento)
            $("#txtHora").val(cad.Hora)
            $("#txtData").val(cad.Data.substr(6,4) + "-" + cad.Data.substr(3,2) + "-" + cad.Data.substr(0,2))
        }
    })
}


function populaTabela() {
    //Array.isArray - Se a variável for um Array, retorna true
    if(Array.isArray(dados)) {

        localStorage.setItem("__dados__", JSON.stringify(dados))

        $("#tblDados tbody").html("")

        dados.forEach(function (cad) { 
            //TEMPLATE STRING           
            $("#tblDados tbody").append(`<tr>
                <td>${cad.Matricula}</td>
                <td>${cad.Nome}</td>
                <td>${cad.Celular}</td>
                <td>${cad.Equipamento}</td>
                <td>${cad.Hora}</td>
                <td>${cad.Data}</td>
                <td>
                    <button type="button" class="btn btn-secondary" onclick="javascript:editaRegistro(${cad.ID})"
                    style="padding:1px 6px 2px 8px; margin-top: 1px; margin-bottom: 1px;">
                        <i class="far fa-edit"/>
                    </button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="javascript:apagaRegistro(${cad.ID})"
                    style="padding:1px 9px 2px 9px; margin-top: 1px; margin-bottom: 1px;">
                        <i class="far fa-trash-alt"/>
                    </button>
                </td>
            </tr>`)
        })
    }
}

//EXECUTA AO CARREGAR A TELA
$(function() {
    
    //JSON.parse - Transforma a varíavel em String.
    dados = JSON.parse(localStorage.getItem("__dados__")) 

    if (dados) {
        populaTabela()    
    }

    $("#btnSalvar").click(function() {
        //EVENTO CLICK DO BOTÃO SALVAR

        let _id = $("#hdID").val()
        let Matricula = $("#txtMatricula").val()
        let Nome = $("#txtNome").val()
        let Celular = $("#txtCelular").val()
        let Equipamento = $("#txtEquipamento").val()
        let Hora = $("#txtHora").val()
        let Data = new Date ($("#txtData").val()).toLocaleDateString("pt-br", {timeZone:"UTC"})

        let registro = {}

        registro.Matricula = Matricula
        registro.Nome = Nome
        registro.Celular = Celular
        registro.Equipamento = Equipamento
        registro.Hora = Hora
        registro.Data = Data

        if (!_id || _id == "0") {
        registro.ID = dados.length + 1
        dados.push(registro)
        alert("Registro realizado com sucesso!")
        $("#modalRegistro").modal("hide")

        } else {
            dados.forEach(function(cad) {
                if (cad.ID == _id) {
                    cad.Matricula = Matricula
                    cad.Nome = Nome
                    cad.Celular = Celular
                    cad.Equipamento = Equipamento
                    cad.Hora = Hora
                    cad.Data = Data
                }
            })
            alert("Registro atualizado com sucesso!")
            $("#modalRegistro").modal("hide")
        }


        

        //LIMPEZA DOS CAMPOS
        $("#hdID").val("0")
        $("#txtMatricula").val("")
        $("#txtNome").val("")
        $("#txtCelular").val("")
        $("#txtEquipamento").val("")
        $("#txtHora").val("")
        $("#txtData").val("")

        populaTabela()
    })
})