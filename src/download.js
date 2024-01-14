function downloadCanvas() {
  if (window.confirm('Fazer download?') == false) {
    return
  }

  const divElement = document.getElementsByClassName('caixa_de_tabela')[0]

  html2canvas(divElement, {
    windowWidth: 1366,
    windowHeight: 661,
    scale: 3,
    backgroundColor: 'rgb(220, 255, 220)',
  }).then(function (canvas) {
    const aspectRatio =
      parseInt(canvas.style.width) / parseInt(canvas.style.height)
    const maxWidth = 1000
    const maxHeight = 1000

    let canvasWidth, canvasHeight

    if (aspectRatio > 1) {
      // Se a imagem for mais larga do que alta
      canvasWidth = maxWidth
      canvasHeight = maxWidth / aspectRatio
    } else {
      // Se a imagem for mais alta do que larga
      canvasHeight = maxHeight
      canvasWidth = maxHeight * aspectRatio
    }

    const resizedCanvas = document.createElement('canvas')
    resizedCanvas.width = canvasWidth
    resizedCanvas.height = canvasHeight

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
