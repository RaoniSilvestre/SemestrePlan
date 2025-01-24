HORARIO = "horario";
SALVO = "saved";
TOTAL_HORAS = "totalHoras";
NOME_DA_MATERIA = "nome_da_materia";
DEFAULT_BACKGROUND_COLOR = "rgb(180,180,180)";
LEGENDA = "legenda";
CONECTIVOS = [
  "A",
  "EM",
  "PARA",
  "DE",
  "COM",
  "DA",
  "DO",
  "O",
  "ÀS",
  "AOS",
  "DAS",
  "DOS",
  "AS",
  "OS",
  "E",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "AO",
  "À",
];

NUMERAIS = [
  "I",
  "II",
  "III",
  "IV",
  "V",
];

function adicionarMateria(e) {
  e.preventDefault();

  const horario = getHorario();
  let totalHoras = getTotalHorasSalvas();

  if (!isMateriaValida(horario)) return;

  const horarioPeriodos = horario.substring(horario.length - 3);
  const horarioDias = horario.substring(0, horario.length - 3).split("");

  const {
    materiaHasConflitos,
    materiaConflitante,
  } = verificarConflitosDeMaterias(horarioPeriodos, horarioDias);

  if (materiaHasConflitos) {
    return alert(
      "Existe conflito de horário com a matéria que você está tentando adicionar e " +
        materiaConflitante,
    );
  }

  const nomeDaMateria = getNomeDaMateria();
  const abreviacao = getAbreviacao(nomeDaMateria);

  colorirItens(horarioDias, horarioPeriodos, abreviacao);

  const disciplinaInfo = {
    horario,
    totalHoras,
    abreviacao,
    nomeDaMateria,
  };

  adicionarMateriaNaListagem(disciplinaInfo);
  salvarMateriasEmCookies();
}

function verificarConflitosDeMaterias(horarioPeriodos, horarioDias) {
  for (i in horarioDias) {
    const horarioItemId = horarioDias[i] + horarioPeriodos;
    const htmlHorarioItem = document.getElementById(horarioItemId);

    if (htmlHorarioItem.innerHTML != htmlHorarioItem.id) {
      return {
        materiaHasConflitos: true,
        materiaConflitante: htmlHorarioItem.innerHTML,
      };
    }
  }
  return { materiaHasConflitos: false };
}

function getHorario() {
  return document.getElementById(HORARIO).value.toUpperCase();
}

function getTotalHorasSalvas() {
  const totalHoras = Number(localStorage.getItem(TOTAL_HORAS));
  return isNaN(totalHoras) ? 0 : totalHoras;
}

function abreviacaoReducer(abreviacao, palavra) {
  if (!CONECTIVOS.includes(palavra)) abreviacao += palavra[0];
  if (NUMERAIS.includes(palavra)) abreviacao += palavra;
  return abreviacao;
}

function getAbreviacao(nomeDaMateria) {
  return nomeDaMateria.split(" ").reduce(abreviacaoReducer);
}

function getNomeDaMateria() {
  const regexNomeDaMateria = /[^A-Za-z0-9 çÇÁÀÂÃÉÈÊÍÏÓÔÕÖÚÜ\s]/g;

  const nomeDaMateria = document
    .getElementById(NOME_DA_MATERIA)
    .value.toUpperCase()
    .replace(regexNomeDaMateria, "") ?? "Matéria";

  return nomeDaMateria;
}

function isValidHorarioDiurno(horario) {
  const horarioRegex = /^[2-7]{1,4}[MTN](?:12|34|56)$/;
  const isInvalidHorario = horario.length >= 4 && !horarioRegex.test(horario);

  if (!horario.length || isInvalidHorario) return false;

  return true;
}

function isMateriaValida(horario) {
  if (!horario.length) {
    alert("Insira uma matéria");
    return false;
  }

  if (!isValidHorarioDiurno(horario)) {
    alert("O horário que você digitou não está no formato correto");
    return false;
  }
  if (/^.*N56.*$/.test(horario)) {
    alert("O horário que você digitou não está no formato correto");
    return false;
  }

  return true;
}

function colorirItens(dias, periodos, abreviacao) {
  for (dia of dias) {
    const horarioItemId = dia + periodos;

    document.getElementById(horarioItemId).style.backgroundColor =
      DEFAULT_BACKGROUND_COLOR;
    document.getElementById(horarioItemId).innerHTML = abreviacao;
  }
}

function adicionarMateriaNaListagem(disciplinaInfo) {
  let {
    horario,
    totalHoras,
    abreviacao,
    nomeDaMateria,
  } = disciplinaInfo;

  const node = document.createElement("div");

  totalHoras = atualizarTotalHoras(horario.length, totalHoras);
  localStorage.setItem(TOTAL_HORAS, totalHoras);

  const nomeDescricaoDisciplina = getHorasDescricao(horario.length);

  document.querySelector("#totalHoras").innerHTML = "Total de Horas: " +
    totalHoras + "h";

  const textoExibicao =
    `${abreviacao} - ${nomeDaMateria} ${nomeDescricaoDisciplina} (${horario})`;
  node.innerHTML = textoExibicao;

  node.classList.add("materia");
  node.setAttribute("onclick", "removerMateria(event)");
  document.getElementById(LEGENDA).appendChild(node);
  document.getElementById(NOME_DA_MATERIA).value = "";
  document.getElementById(HORARIO).value = "";
}

function salvarMateriasEmCookies() {
  const saved = [];
  const legenda = document.getElementById(LEGENDA);

  for (item of legenda.children) {
    saved.push(item.innerHTML);
  }

  localStorage.setItem(SALVO, saved);
}

function atualizarTotalHoras(tamanho, horas) {
  switch (tamanho) {
    case 7:
      return horas += 120;
    case 6:
      return horas += 90;
    case 5:
      return horas += 60;
    case 4:
      return horas += 30;
    default:
      return horas;
  }
}

function getHorasDescricao(tamanho) {
  switch (tamanho) {
    case 7:
      return "(120h)";
    case 6:
      return "(90h)";
    case 5:
      return "(60h)";
    case 4:
      return "(30h)";
    default:
      return "";
  }
}
