import { saveAs } from "file-saver"
import FilerobotImageEditor, { TABS, TOOLS } from "react-filerobot-image-editor"
import { Empty } from "antd"
import styled from "styled-components"

const Styles = styled.div`
  .konvajs-content {
    height: 330px !important;
  }
  .FIE_filters-item-preview {
    .konvajs-content {
      height: 45px !important;
    }
  }
`

const ImageEditor = ({ file }) => {
  // const handleImageCompression = async url => {
  //   try {
  //     // Step 1: Download the image from the URL
  //     const options = {
  //       url: url,
  //       dest: "C:\\Users\\ADMIN\\Downloads", // Temporary directory to store the downloaded image
  //     }
  //     const { filename } = await imageDownloader.image(options)
  //     // Step 2: Compress the downloaded image
  //     const compressedImage = await imageCompression.getFilefromURL(filename, {
  //       maxWidthOrHeight: 800, // Adjust this value as per your requirement
  //       maxSizeMB: 1, // Maximum size in MB after compression
  //     })
  //     // You can now use the compressedImage in your application (e.g., upload to a server, display in the UI, etc.)
  //   } catch (error) {
  //     console.error("Error:", error)
  //   }
  // }
  return (
    <Styles>
      {file?.FileUrl ? (
        <>
          <FilerobotImageEditor
            source={file?.FileUrl}
            onSave={(editedImageObject, designState) => {
              saveAs(
                editedImageObject?.imageBase64,
                editedImageObject?.fullName,
              )
            }}
            // onClose={closeImgEditor}
            annotationsCommon={{
              fill: "#ff0000",
            }}
            Text={{ text: "Nhập..." }}
            Rotate={{ angle: 90, componentType: "slider" }}
            tabsIds={[
              TABS.ADJUST,
              TABS.ANNOTATE,
              TABS.WATERMARK,
              TABS.FINETUNE,
              TABS.FILTERS,
              TABS.RESIZE,
            ]} // or {['Adjust', 'Annotate', 'Watermark']}
            defaultTabId={TABS.ANNOTATE} // or 'Annotate'
            defaultToolId={TOOLS.TEXT} // or 'Text'
          />
          {/* <Button onClick={() => handleImageCompression(file?.FileUrl)}>
            Nén ảnh
          </Button> */}
        </>
      ) : (
        <Empty description="Không có ảnh!" />
      )}
    </Styles>
  )
}
export default ImageEditor
