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

function selectHours(tamanho) {
  switch (tamanho) {
    case 7:
      return '(120h)'
      break
    case 6:
      return '(90h)'
      break
    case 5:
      return '(60h)'
      break
    case 4:
      return '(30h)'
      break
    default:
      return ''
  }
}
