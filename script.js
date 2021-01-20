function mascara(elemento, mask) {
    let pos = elemento.value.length

    let charBase = mask[0]
    let texto = mask[0, pos]
    if (texto == undefined) {
        return
    }
    if (charBase != texto) {
        elemento.value += texto
    }
}

function limitaCampo(id, campo, lengthLimit) {

    document.querySelector(`#${id}`).addEventListener("keypress", (event) => {
        event.preventDefault()
        const nome = document.querySelector(`#${id}`)
        if (nome.value.length >= lengthLimit) {
            return
        }
        if (campo == "numero" || campo == "nao-limitar") {
            if(String(event.code).substring(0, 3) == "Key" || String(event.code) == "Semicolon" || String(event.code) == "Space") {
                nome.value += event.key
            } else if (event.code == "Backspace") {
                nome.value = nome.value.substring(0, nome.value.length - 1)
            }
        }
        if (campo == "letra" || campo == "nao-limitar") {
            if(String(event.code).substring(0, 6) == "Numpad" && event.keyCode >= 48 && event.keyCode <= 57) {
                nome.value += event.key
            }
        }
        if (campo == "nao-limitar") {
            if (event.code == "Comma" || event.code == "Period" || event.charCode == 186 || event.charCode == 170) {
                nome.value += event.key
            }
        }
    }) 
}

document.body.onload = () => {
    limitaCampo("nome", "numero", 64)
    limitaCampo("sobrenome", "numero", 64)
    limitaCampo("cpf", "letra", 14)
    limitaCampo("rg", "letra", 12)
    limitaCampo("dt-nascimento", "letra", 10)
    limitaCampo("cep", "letra", 9)
    limitaCampo("rua", "nao-limitar", 64)
    limitaCampo("bairro", "nao-limitar", 64)
    limitaCampo("cidade", "nao-limitar", 64)
    limitaCampo("estado", "nao-limitar", 64)
    limitaCampo("numero", "letra", 10)
    limitaCampo("complemento", "nao-limitar", 64)
}

function validaCPF() {
    const cpf = document.querySelector("#cpf")
    let valorCPF = cpf.value
    let CPFValido = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
    
    if (CPFValido.test(valorCPF) == true) {
        cpf.setAttribute("class", "campo-valido")
        return true
    } else {
        cpf.setAttribute("class", "campo-invalido")
        return false
    }
}

function validaRG() {
    const rg = document.querySelector("#rg")
    let valorRG = rg.value
    let RGValido = /(^(\d{2}\x2E\d{3}\x2E\d{3}[-]\d{1})$|^(\d{2}\x2E\d{3}\x2E\d{3})$)/

    if(RGValido.test(valorRG)) {
        rg.setAttribute("class", "campo-valido")
        return true
    } else {
        rg.setAttribute("class", "campo-invalido")
        return false
    }
}

function veririficaReadOnly(elemento) {
    if (elemento.readOnly == true) {
        elemento.readOnly = false
        elemento.value = ""
    }
}

function validaCEP() {
    const cep = document.querySelector("#cep")
    let valorCEP = cep.value
    let CEPValido = /^[0-9]{2}[0-9]{3}-[0-9]{3}$/

    if (CEPValido.test(valorCEP)) {
        cep.setAttribute("class", "campo-valido")
        getDadosEnderecoCEP(valorCEP)
        return true
    } else {
        const rua = document.querySelector("#rua")
        const bairro = document.querySelector("#bairro")
        const cidade = document.querySelector("#cidade")
        const estado = document.querySelector("#estado")
        const numero = document.querySelector("#numero")
        const complemento = document.querySelector("#complemento")

        veririficaReadOnly(rua)
        veririficaReadOnly(bairro)
        veririficaReadOnly(cidade)
        veririficaReadOnly(estado)
        veririficaReadOnly(numero)
        veririficaReadOnly(complemento)

        
        cep.setAttribute("class", "campo-invalido")
        return false
    }
}

function validaDtNascimento() {
    const data = document.querySelector("#dt-nascimento")
    let valorData = data.value
    let dataValida = /(((0[1-9]|[12][0-9]|3[01])([/])(0[13578]|10|12)([/])(\d{4}))|(([0][1-9]|[12][0-9]|30)([/])(0[469]|11)([/])(\d{4}))|((0[1-9]|1[0-9]|2[0-8])([/])(02)([/])(\d{4}))|((29)(\/)(02)([/])([02468][048]00))|((29)([/])(02)([/])([13579][26]00))|((29)([/])(02)([/])([0-9][0-9][0][48]))|((29)([/])(02)([/])([0-9][0-9][2468][048]))|((29)([/])(02)([/])([0-9][0-9][13579][26])))/

    if (dataValida.test(valorData)) {
        data.setAttribute("class", "campo-valido")
        return true
    } else {
        data.setAttribute("class", "campo-invalido")
        return false
    }
}

function validaCamposRestantes(elemento) {
        if (elemento.id == "cnh" || elemento.id == "estado-civil") {
            elemento.addEventListener("change", () => {
                if(elemento.value == "") {
                    elemento.setAttribute("class", "campo-invalido")
                    return false
                } else {
                    elemento.setAttribute("class", "campo-valido")
                    return true
                }
            })
        } else {
            elemento.addEventListener("keyup", () => {
                if(elemento.value == "") {
                    elemento.setAttribute("class", "campo-invalido")
                    return false
                } else {
                    elemento.setAttribute("class", "campo-valido")
                    return true
                }
            })
        }
        
        
}

function testaCamposValidos() {
    const campos = {
        nome: "nome",
        sobrenome: "sobrenome",
        cpf: "cpf",
        rf: "rg",
        dtNascimento: "dt-nascimento",
        cnh: "cnh",
        estadoCivil: "estado-civil",
        cep: "cep",
        rua: "rua",
        bairro: "bairro",
        cidade: "cidade",
        estado: "estado",
        numero: "numero",
        complemento: "complemento"
    }

    let camposInvalidos = []

    for (campo in campos) {
        let id = campos[campo]
        const elemento = document.querySelector(`#${id}`)
        
        if(elemento.value == "" && id != "cpf" && id !== "rg" && id !== "dt-nascimento" && id !== "cep") {
            camposInvalidos.push(id)
            elemento.setAttribute("class", "campo-invalido")
        } else {
            elemento.setAttribute("class", "campo-valido")
        }
        
        if (id == "cpf") {
            if(!validaCPF()) {
                camposInvalidos.push(id)
                elemento.setAttribute("class", "campo-invalido")
            } else {
                elemento.setAttribute("class", "campo-valido")
            }
        }

        if (id == "rg") {
            if(!validaRG()) {
                camposInvalidos.push(id)
                elemento.setAttribute("class", "campo-invalido")
            } else {
                elemento.setAttribute("class", "campo-valido")
            }
        }

        if (id == "dt-nascimento") {
            if(!validaDtNascimento()) {
                camposInvalidos.push(id)
                elemento.setAttribute("class", "campo-invalido")
            } else {
                elemento.setAttribute("class", "campo-valido")
            }
        }

        if (id == "cep") {
            if(!validaCEP()) {
                camposInvalidos.push(id)
                elemento.setAttribute("class", "campo-invalido")
            } else {
                elemento.setAttribute("class", "campo-valido")
            }
        }
    }

    let textoAlerta = ""

    if (camposInvalidos.length != 0) {
        textoAlerta += "Os seguintes campos estão faltando, por favor, os insira corretamente e tente novamente.\n\n"

        camposInvalidos.forEach(campo => {
            if (campo == "dt-nascimento") {
                campo = "Data de Nascimento"
            } else if (campo == "cnh") {
                campo = "Tipo de CNH"
            } else if (campo == "estado") {
                campo = "Estado Civil"
            }
            textoAlerta += "* " + campo + "\n"
        })
    }

    if (textoAlerta != "") {
        alert(textoAlerta)
        return false
    } else {
        return true
    }
}

document.querySelector("input[type='submit']").addEventListener("click", (event) => {
    event.preventDefault()
    let valido = testaCamposValidos()

    if (valido) {
        document.querySelector("form").submit()
    }
})

function selectChangeAndBlock(id, value) {
    const elemento = document.querySelector(`#${id}`)
    elemento.value = value
    elemento.readOnly = true
}

function getDadosEnderecoCEP(cep) {
    let req = new XMLHttpRequest()

    req.open("GET", `https://viacep.com.br/ws/${cep}/json/`)

    req.onreadystatechange = () => {
        if (req.readyState == 4 && req.status == 200) {
            const obj = JSON.parse(req.responseText)

            let rua = obj["logradouro"]
            let complemento = obj["complemento"]
            let bairro = obj["bairro"]
            let cidade = obj["localidade"]
            let estado = obj["uf"]

            if (rua != "") {
                selectChangeAndBlock("rua", rua)
            }
            if (complemento != "") {
                selectChangeAndBlock("complemento", complemento)
            }
            if(bairro != "") {
                selectChangeAndBlock("bairro", bairro)
            }
            if (cidade != "") [
                selectChangeAndBlock("cidade", cidade)
            ]
            if (estado != "") {
                selectChangeAndBlock("estado", estado)
            }
        }
    }

    req.send()
    
}