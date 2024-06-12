export const openChildWindow = () => {
  // Tạo một cửa sổ con từ cửa sổ gốc
  const childWindow = window.open("", "childWindow", "width=400,height=300")
  if (childWindow) {
    // Mở một trang con bên trong cửa sổ con
    childWindow.document.open()
    childWindow.document.write(
      "<html><head><title>Cửa sổ con</title></head><body><p>Đây là cửa sổ con.</p></body></html>",
    )
    childWindow.document.close()
  } else {
    alert("Trình chặn popup đã ngăn cản việc mở cửa sổ con.")
  }
}
export const openCenteredChildWindow = () => {
  // Kích thước của cửa sổ con
  const childWidth = 400
  const childHeight = 300
  // Tính toán vị trí của cửa sổ con để nó nằm ở giữa màn hình
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  const left = (screenWidth - childWidth) / 2
  const top = (screenHeight - childHeight) / 2

  // Tạo một cửa sổ con ở vị trí đã tính toán
  const childWindow = window.open(
    "",
    "childWindow",
    `width=${childWidth},height=${childHeight},left=${left},top=${top}`,
  )

  if (childWindow) {
    // Mở một trang con bên trong cửa sổ con
    childWindow.document.open()
    childWindow.document.write(
      "<html><head><title>Cửa sổ con</title></head><body><p>Đây là cửa sổ con ở giữa màn hình.</p></body></html>",
    )
    childWindow.document.close()
  } else {
    alert("Trình chặn popup đã ngăn cản việc mở cửa sổ con.")
  }
}
