

function removerMateria(e) {
  const target = e.target

  const qtdHoras = target.innerHTML.split('(')[1].split('h')[0]

  const horario = target.innerHTML
    .split('(')[2]
    .substring(0, target.innerHTML.split('(')[2].length - 1)

  const horario_periodos = horario.substring(horario.length - 3)

  const horario_dias = horario.substring(0, horario.length - 3).split('')

  subtractTotalHours(qtdHoras)

  for (i in horario_dias) {
    const elemento = document.getElementById(horario_dias[i] + horario_periodos)
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

function subtractTotalHours(hour) {
  let totalHoras = localStorage.getItem('totalHoras')
  totalHoras = totalHoras - hour
  if (totalHoras <= 0) {
    document.querySelector('#totalHoras').innerHTML = 'Total de horas: 0h'
    localStorage.setItem('totalHoras', 0)
  } else {
    document.querySelector('#totalHoras').innerHTML ='Total de horas: ' + totalHoras + 'h'
    localStorage.setItem('totalHoras', totalHoras)
  }
}
