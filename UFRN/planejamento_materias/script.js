function popular_tabela(){
    const tabela = document.getElementById('tabela_de_horarios')

    for (tr of tabela.children[0].children){
        for (td of tr.children){
            td.innerHTML = td.id
        }
    }

    if (!localStorage.getItem('saved')){
        return
    }

    const saved = localStorage.getItem('saved').split(',')

    for (item of saved){
        const abreviacao = item.split(" ")[0]
        const horario = item.split("(")[2].substring(0, item.split("(")[2].length - 1)
        
        const horario_periodos = horario.substring(horario.length - 3)
        const horario_dias = horario.substring(0, horario.length - 3).split('')  

        for (i in horario_dias){
            document.getElementById(horario_dias[i] + horario_periodos).style.backgroundColor = 'rgb(180,180,180)'
            document.getElementById(horario_dias[i] + horario_periodos).innerHTML = abreviacao
        }

        const node = document.createElement('div')
        node.innerHTML = (item)
        node.classList.add('materia')
        node.setAttribute("onclick", "removerMateria(event)");
        document.getElementById('legenda').appendChild(node)
    }
    
}

function removerMateria(e){
    const target = e.target 
    const horario = target.innerHTML.split("(")[2].substring(0, target.innerHTML.split("(")[2].length - 1)
    const horario_periodos = horario.substring(horario.length - 3)
    const horario_dias = horario.substring(0, horario.length - 3).split('')

    for (i in horario_dias){
        const elemento = document.getElementById(horario_dias[i] + horario_periodos)
        elemento.style.backgroundColor = "initial"
        elemento.innerHTML = elemento.id
    }

    target.remove()

    const saved = []
    const legenda = document.getElementById('legenda')

    for (item of legenda.children){
        saved.push(item.innerHTML)
    }

    localStorage.setItem('saved', saved)
}

function adicionarMateria(e){
    e.preventDefault();

    const horario = document.getElementById('horario').value.toUpperCase()

    if  (horario.length < 4) {
        alert('O horário que você digitou não está no formato correto')
        return
    }
    if (horario.length == 7 && !/^[2-7]{4}[MTN](?:12|34|56)/.test(horario)){
        alert('O horário que você digitou não está no formato correto')
        return
    }
    if (horario.length == 6 && !/^[2-7]{3}[MTN](?:12|34|56)/.test(horario)){
        alert('O horário que você digitou não está no formato correto')
        return
    }
    if (horario.length == 5 && !/^[2-7]{2}[MTN](?:12|34|56)/.test(horario)){
        alert('O horário que você digitou não está no formato correto')
        return
    }
    if (horario.length == 4 && !/^[2-7]{1}[MTN](?:12|34|56)/.test(horario)){
        alert('O horário que você digitou não está no formato correto')
        return
    }
    if (/^.*N56.*$/.test(horario)){
        alert('O horário que você digitou não está no formato correto')
        return
    }

    const horario_periodos = horario.substring(horario.length - 3)
    const horario_dias = horario.substring(0, horario.length - 3).split('')   

    for (i in horario_dias){
        const elemento = document.getElementById(horario_dias[i] + horario_periodos)
        if (elemento.innerHTML != elemento.id){
            alert('Existe conflito de horário com a matéria que você está tentando adicionar e ' + elemento.innerHTML)
            return
        }
    }

    const nome_da_materia = document.getElementById('nome_da_materia').value.toUpperCase().replace(/[^A-Za-z0-9 çÇÁÀÂÃÉÈÊÍÏÓÔÕÖÚÜ\s]/g, '') || "Matéria"
    let abreviacao = ""
    
    for (palavra of nome_da_materia.split(' ')){
        if (
            palavra != "A" && palavra != "EM" && palavra != "PARA" && palavra != "DE" && palavra != "COM"
            && palavra != "DA" && palavra != "DO" && palavra != "O" && palavra != "ÀS" && palavra != "AOS"
            && palavra != "AO" && palavra != "À"
            && palavra != "DAS" && palavra != "DOS" && palavra != "AS" && palavra != "OS" && palavra != "E"
            && palavra != "I" && palavra != "II" && palavra != "III" && palavra != "IV" && palavra != "V"
            ){
            abreviacao = abreviacao + palavra[0]
        }
        if (palavra == "I" || palavra == "II" || palavra == "III" || palavra == "IV" || palavra == "V"){
            abreviacao = abreviacao + palavra
        }
    }

    for (i in horario_dias){
        document.getElementById(horario_dias[i] + horario_periodos).style.backgroundColor = 'rgb(180,180,180)'
        document.getElementById(horario_dias[i] + horario_periodos).innerHTML = abreviacao
    }
    
    const node = document.createElement('div')
    node.innerHTML = (`${abreviacao} - ${nome_da_materia} ${(horario.length == 7) ? '(120h)':''} ${(horario.length == 6) ? '(90h)':''} ${(horario.length == 5) ? '(60h)':''} ${(horario.length == 4) ? '(30h)':''} (${horario})`)
    node.classList.add('materia')
    node.setAttribute("onclick", "removerMateria(event)");
    document.getElementById('legenda').appendChild(node)
    
    document.getElementById('nome_da_materia').value = ""
    document.getElementById('horario').value = ""

    const saved = []
    const legenda = document.getElementById('legenda')

    for (item of legenda.children){
        saved.push(item.innerHTML)
    }

    localStorage.setItem('saved', saved)
}

function toggleHorarios(e){
    const tabela = document.getElementById('tabela_de_horarios')

    if (e.target.innerHTML == 'Mostrar horário de início'){
        e.target.innerHTML = 'Mostrar formato padrão'
        
        for (tr of tabela.children[0].children){
            for (td of tr.children){
                if (td.innerHTML.includes('M12')){
                    td.innerHTML = '7:00'
                }
                if (td.innerHTML.includes('M34')){
                    td.innerHTML = '8:55'
                }
                if (td.innerHTML.includes('M56')){
                    td.innerHTML = '10:50'
                }
                if (td.innerHTML.includes('T12')){
                    td.innerHTML = '13:00'
                }
                if (td.innerHTML.includes('T34')){
                    td.innerHTML = '14:55'
                }
                if (td.innerHTML.includes('T56')){
                    td.innerHTML = '16:50'
                }
                if (td.innerHTML.includes('N12')){
                    td.innerHTML = '18:45'
                }
                if (td.innerHTML.includes('N34')){
                    td.innerHTML = '20:35'
                }
            }
        }
        return
    }

    if (e.target.innerHTML == 'Mostrar formato padrão'){
        e.target.innerHTML = 'Mostrar horário de início'

        for (tr of tabela.children[0].children){
            for (td of tr.children){
                td.innerHTML = td.id
            }
        }
        return
    }    
}