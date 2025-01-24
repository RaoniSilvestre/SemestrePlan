function removerMateria(e) {
  const horarioSelecionado = e.target

  const dadosDoHoraio = obterDadosDoHorario(horarioSelecionado)

  const { quantidadeDeHoras, diasDoHorario, periodosDoHorario } = dadosDoHoraio
  
  diminuirTotalDeHoras(quantidadeDeHoras)

  for (const dia of diasDoHorario) {
    const elemento = document.getElementById(dia + periodosDoHorario);
    if (elemento) {
      elemento.style.backgroundColor = 'initial';
      elemento.innerHTML = elemento.id;
    }
  }

  horarioSelecionado.remove()

  const materiasSalvas = []

  const legenda = document.getElementById('legenda')

  for (item of legenda.children) {
    materiasSalvas.push(item.innerHTML)
  }

  
  localStorage.setItem('saved', materiasSalvas)
}

function obterDadosDoHorario(horarioSelecionado) {
  const quantidadeDeHoras = parseInt(
    horarioSelecionado.innerHTML.split('(')[1].split('h')[0],
    10
  );

  const horarioDeAulas = horarioSelecionado.innerHTML
    .split('(')[2]
    .substring(0, horarioSelecionado.innerHTML.split('(')[2].length - 1);

  const periodosDoHorario = horarioDeAulas.substring(horarioDeAulas.length - 3);

  const diasDoHorario = horarioDeAulas.substring(0, horarioDeAulas.length - 3).split('');

  return { quantidadeDeHoras, diasDoHorario, periodosDoHorario };
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
