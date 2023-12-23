function popular_tabela() {
  const tabela = document.getElementById('tabela_de_horarios')

  for (tr of tabela.children[0].children) {
    for (td of tr.children) {
      td.innerHTML = td.id
    }
  }

  if (!localStorage.getItem('saved')) {
    return
  }

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

function removerMateria(e) {
  const target = e.target
  const horario = target.innerHTML
    .split('(')[2]
    .substring(0, target.innerHTML.split('(')[2].length - 1)
  const horario_periodos = horario.substring(horario.length - 3)
  const horario_dias = horario.substring(0, horario.length - 3).split('')

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

function adicionarMateria(e) {
  e.preventDefault()

  const horario = document.getElementById('horario').value.toUpperCase()

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

  //Selecionar tamanho da disciplina
  let tamanho_disciplina = selectHours(horario.length)
  
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

  localStorage.setItem('saved', saved)
}

function downloadCanvas() {
  if (window.confirm('Fazer download?') == false) {
    return
  }

  const divElement = document.getElementsByClassName('caixa_de_tabela')[0]

  html2canvas(divElement, {
    windowWidth: 1366,
    windowHeight: 661,
    scale: 2,
    backgroundColor: 'rgb(220, 255, 220)',
  }).then(function (canvas) {
    const aspectRatio =
      parseInt(canvas.style.width) / parseInt(canvas.style.height)
    const canvasWidth = 650
    const canvasHeight = 650

    const resizedCanvas = document.createElement('canvas')

    resizedCanvas.width = canvasWidth
    resizedCanvas.height = canvasHeight

    if (canvas.style.height > 650) {
      resizedCanvas.width = canvas.style.height
      resizedCanvas.height = canvas.style.height
    }

    const ctx = resizedCanvas.getContext('2d')

    let offset = 20
    let drawWidth = resizedCanvas.width - 2 * offset
    let drawHeight = resizedCanvas.height - 2 * offset
    let offsetX = offset
    let offsetY = offset

    if (aspectRatio > 1) {
      drawHeight = resizedCanvas.width / aspectRatio
      offsetY = (resizedCanvas.height - drawHeight) / 2
    } else if (aspectRatio < 1) {
      drawWidth = resizedCanvas.height * aspectRatio
      offsetX = (resizedCanvas.width - drawWidth) / 2
    }

    ctx.fillStyle = 'rgb(220, 255, 220)'
    ctx.fillRect(0, 0, resizedCanvas.width, resizedCanvas.height)

    ctx.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      offsetX,
      offsetY,
      drawWidth,
      drawHeight
    )

    const dataURL = resizedCanvas.toDataURL('image/png')

    const downloadLink = document.createElement('a')
    downloadLink.href = dataURL

    downloadLink.download = 'meu_horario.png'

    document.body.appendChild(downloadLink)
    downloadLink.click()

    document.body.removeChild(downloadLink)
  })
}
