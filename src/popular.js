function popular_tabela() {
  
  // Populando tabela 
  const tabela = document.getElementById('tabela_de_horarios')

  for (tr of tabela.children[0].children) {
    for (td of tr.children) {
      td.innerHTML = td.id
    }
  }

  // Verificação de horários salvos
  if (!localStorage.getItem('saved')) {
    return
  }

  // Inserir horas salvas
  if(localStorage.getItem('totalHoras')) {
    totalHoras = localStorage.getItem('totalHoras')
    document.querySelector('#totalHoras').innerHTML = totalHoras+'h'
  }

  // Adicionar abreviações aos devidos horários
  const saved = localStorage.getItem('saved').split(',')

  for (item of saved) {
    const abreviacao = item.split(' ')[0]

    const horario = item
      .split('(')[2]
      .substring(0, item.split('(')[2].length - 1)
    
    const horario_periodos = horario.substring(horario.length - 3)

    const horario_dias = horario.substring(0, horario.length - 3).split('')

    for (i in horario_dias) {
      document.getElementById(
        horario_dias[i] + horario_periodos
      ).style.backgroundColor = 'rgb(180,180,180)'
      document.getElementById(horario_dias[i] + horario_periodos).innerHTML =
        abreviacao
    }

    const node = document.createElement('div')
    node.innerHTML = item
    node.classList.add('materia')
    node.setAttribute('onclick', 'removerMateria(event)')
    document.getElementById('legenda').appendChild(node)
  }
}
