function removerMateria(e) {
  const elementoSelecionado = e.target

  const quantidadeDeHoras = target.innerHTML.split('(')[1].split('h')[0]

  const horarioDeAulas = elementoSelecionado.innerHTML
    .split('(')[2]
    .substring(0, elementoSelecionado.innerHTML.split('(')[2].length - 1)

  const periodosDoHorario = horarioDeAulas.substring(horarioDeAulas.length - 3)

  const diasDoHorario = horarioDeAulas.substring(0, horarioDeAulas.length - 3).split('')

  diminuirTotalDeHoras(quantidadeDeHorasRemovidas)

  for (i in diasDoHorario) {
    const elemento = document.getElementById(diasDoHorario[i] + periodosDoHorario)
    elemento.style.backgroundColor = 'initial'
    elemento.innerHTML = elemento.id
  }

  target.remove()

  const saved = []

  const legenda = document.getElementById('legenda')

  for (item of legenda.children) {
    saved.push(item.innerHTML)
  }

  
  localStorage.setItem('saved', saved)
}

function diminuirTotalDeHoras(quantidadeDeHorasRemovidas) {
  let totalDeHoras = localStorage.getItem('totalHoras')
  totalDeHoras = totalDeHoras - quantidadeDeHorasRemovidas
  if (totalDeHoras <= 0) {
    document.querySelector('#totalHoras').innerHTML = 'Total de horas: 0h'
    localStorage.setItem('totalHoras', 0)
  } else {
    document.querySelector('#totalHoras').innerHTML ='Total de horas: ' + totalDeHoras + 'h'
    localStorage.setItem('totalHoras', totalDeHoras)
  }
}
