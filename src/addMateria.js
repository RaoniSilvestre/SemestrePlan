function adicionarMateria(e) {
  e.preventDefault()

  const horario = document.getElementById('horario').value.toUpperCase()
  let totalHoras = Number(localStorage.getItem('totalHoras'))
  if (isNaN(totalHoras)) {
    totalHoras = 0
  }

  if (!validateMateria(horario)) {
    return
  }

  const horario_periodos = horario.substring(horario.length - 3)
  const horario_dias = horario.substring(0, horario.length - 3).split('')

  for (i in horario_dias) {
    const elemento = document.getElementById(horario_dias[i] + horario_periodos)
    if (elemento.innerHTML != elemento.id) {
      alert(
        'Existe conflito de horário com a matéria que você está tentando adicionar e ' +
          elemento.innerHTML
      )
      return
    }
  }

  const nome_da_materia =
    document
      .getElementById('nome_da_materia')
      .value.toUpperCase()
      .replace(/[^A-Za-z0-9 çÇÁÀÂÃÉÈÊÍÏÓÔÕÖÚÜ\s]/g, '') || 'Matéria'
  let abreviacao = ''

  for (palavra of nome_da_materia.split(' ')) {
    if (
      palavra != 'A' &&
      palavra != 'EM' &&
      palavra != 'PARA' &&
      palavra != 'DE' &&
      palavra != 'COM' &&
      palavra != 'DA' &&
      palavra != 'DO' &&
      palavra != 'O' &&
      palavra != 'ÀS' &&
      palavra != 'AOS' &&
      palavra != 'DAS' &&
      palavra != 'DOS' &&
      palavra != 'AS' &&
      palavra != 'OS' &&
      palavra != 'E' &&
      palavra != 'I' &&
      palavra != 'II' &&
      palavra != 'III' &&
      palavra != 'IV' &&
      palavra != 'V' &&
      palavra != 'AO' &&
      palavra != 'À'
    ) {
      abreviacao = abreviacao + palavra[0]
    }
    if (
      palavra == 'I' ||
      palavra == 'II' ||
      palavra == 'III' ||
      palavra == 'IV' ||
      palavra == 'V'
    ) {
      abreviacao = abreviacao + palavra
    }
  }

  for (i in horario_dias) {
    document.getElementById(
      horario_dias[i] + horario_periodos
    ).style.backgroundColor = 'rgb(180,180,180)'
    document.getElementById(horario_dias[i] + horario_periodos).innerHTML =
      abreviacao
  }

  const node = document.createElement('div')

  // Selecionar tamanho da disciplina
  let { tamanho_disciplina, totalHours } = selectHours(
    horario.length,
    totalHoras
  )
  
  document.querySelector('#totalHoras').innerHTML = totalHours + 'h'

  //Adicionar horário na tela
  node.innerHTML = `${abreviacao} - ${nome_da_materia} ${tamanho_disciplina} (${horario})`
  node.classList.add('materia')
  node.setAttribute('onclick', 'removerMateria(event)')
  document.getElementById('legenda').appendChild(node)

  document.getElementById('nome_da_materia').value = ''
  document.getElementById('horario').value = ''

  const saved = []
  const legenda = document.getElementById('legenda')

  for (item of legenda.children) {
    saved.push(item.innerHTML)
  }

  localStorage.setItem('totalHoras', totalHours)
  localStorage.setItem('saved', saved)
}

function validateMateria(horario) {
  if (!horario.length) {
    alert('Insira uma matéria')
    return false
  }
  if (horario.length < 4) {
    alert('O horário que você digitou não está no formato correto')
    return false
  }
  if (horario.length == 7 && !/^[2-7]{4}[MTN](?:12|34|56)/.test(horario)) {
    alert('O horário que você digitou não está no formato correto')
    return false
  }
  if (horario.length == 6 && !/^[2-7]{3}[MTN](?:12|34|56)/.test(horario)) {
    alert('O horário que você digitou não está no formato correto')
    return false
  }
  if (horario.length == 5 && !/^[2-7]{2}[MTN](?:12|34|56)/.test(horario)) {
    alert('O horário que você digitou não está no formato correto')
    return false
  }
  if (horario.length == 4 && !/^[2-7]{1}[MTN](?:12|34|56)/.test(horario)) {
    alert('O horário que você digitou não está no formato correto')
    return false
  }
  if (/^.*N56.*$/.test(horario)) {
    alert('O horário que você digitou não está no formato correto')
    return false
  }

  return true
}

function selectHours(tamanho, horas) {
  switch (tamanho) {
    case 7:
      horas += 120
      return { tamanho_disciplina: '(120h)', totalHours: horas }

    case 6:
      horas += 90
      return { tamanho_disciplina: '(90h)', totalHours: horas }

    case 5:
      horas += 60
      return { tamanho_disciplina: '(60h)', totalHours: horas }

    case 4:
      horas += 30
      return { tamanho_disciplina: '(30h)', totalHours: horas }

    default:
      return ''
  }
}
