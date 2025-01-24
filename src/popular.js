function carregarTabelaDeHorarios() {
  const tabelaDeHorarios = document.getElementById('tabela_de_horarios');
  preencherTabela(tabelaDeHorarios);

  if (!localStorage.getItem('saved')) {
    return;
  }

  carregarTotalDeHoras();
  carregarHorariosSalvos();
}

function preencherTabela(tabelaDeHorarios) {
  for (const linha of tabelaDeHorarios.children[0].children) {
    for (const celula of linha.children) {
      celula.innerHTML = celula.id;
    }
  }
}

function carregarTotalDeHoras() {
  const horasTotais = localStorage.getItem('totalHoras');
  if (horasTotais) {
    document.querySelector('#totalHoras').innerHTML =
      'Total de horas: ' + horasTotais + 'h';
  }
}

function carregarHorariosSalvos() {
  const horariosSalvos = localStorage.getItem('saved').split(',');

  for (const item of horariosSalvos) {
    const abreviacao = item.split(' ')[0];
    const horario = item.split('(')[2].slice(0, -1);

    const periodosDoHorario = horario.slice(-3);
    const diasDoHorario = horario.slice(0, -3).split('');

    adicionarAbreviacao(diasDoHorario, periodosDoHorario, abreviacao);
    adicionarLegenda(item);
  }
}

function adicionarAbreviacao(diasDoHorario, periodosDoHorario, abreviacao) {
  for (const dia of diasDoHorario) {
    const celula = document.getElementById(dia + periodosDoHorario);
    if (celula) {
      celula.style.backgroundColor = 'rgb(180,180,180)';
      celula.innerHTML = abreviacao;
    }
  }
}

function adicionarLegenda(item) {
  const node = document.createElement('div');
  node.innerHTML = item;
  node.classList.add('materia');
  node.setAttribute('onclick', 'removerMaterias(event)');
  document.getElementById('legenda').appendChild(node);
}


