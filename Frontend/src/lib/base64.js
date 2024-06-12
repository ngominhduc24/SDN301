export const downloadFromBase64 = (filename, base64) => {
  const element = document.createElement("a")
  element.setAttribute("href", "data:text/plain;base64," + base64)
  element.setAttribute("download", filename)

  element.style.display = "none"
  document.body?.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

export async function downloadFile(imageSrc, FileName) {
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  const link = document.createElement("a")
  link.href = imageURL
  link.download = FileName
  document.body?.appendChild(link)
  link.click()
  document.body?.removeChild(link)
}

export const downloadFromUrl = (uri, name) => {
  var link = document.createElement("a")
  link.download = name
  link.href = uri
  link.target = "_blank"
  document.body?.appendChild(link)
  link.click()
  document.body?.removeChild(link)
}

export const downloadFileBlob = (data, name) => {
  const url = window.URL.createObjectURL(new Blob([data]))
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", name)
  document.body?.appendChild(link)
  link.click()
}

export const downloadPDF = (data, name) => {
  const linkSource = `data:application/pdf;base64,${data}`
  const downloadLink = document.createElement("a")
  const fileName = name
  downloadLink.href = linkSource
  downloadLink.download = fileName
  downloadLink.click()
}
