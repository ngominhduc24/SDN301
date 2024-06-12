import {
  LocalizationContext,
  ThemeContext,
  Viewer,
  Worker,
} from "@react-pdf-viewer/core"
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
import { toolbarPlugin } from "@react-pdf-viewer/toolbar"
import { useEffect, useState } from "react"
import { ModalViewPDFStyle } from "./styled"
import vi_VN from "./vi_VN.json"

import Button from "src/components/MyButton/Button"
import { Col, Empty, Image, Row, Space } from "antd"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import { saveAs } from "file-saver"

const ModalViewPDF = ({
  open,
  onCancel,
  fileUrl,
  attachmentName,
  listFiles,
  title = "Xem tài liệu",
}) => {
  const toolbarPluginInstance = toolbarPlugin()
  const { Toolbar } = toolbarPluginInstance
  const [currentTheme, setCurrentTheme] = useState("light")
  const [l10n, setL10n] = useState(vi_VN)
  const localizationContext = { l10n, setL10n }
  const themeContext = { currentTheme, setCurrentTheme }
  const [fileView, setFileView] = useState(undefined)
  const [indexFile, setIndexFile] = useState(0)
  useEffect(() => {
    if (listFiles) {
      setFileView(listFiles[indexFile])
    } else if (fileUrl) {
      setFileView({
        FileUrl: fileUrl,
      })
    }
  }, [open, indexFile])

  return (
    <ModalViewPDFStyle
      open={open}
      onCancel={onCancel}
      title={title}
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button btntype="primary" onClick={onCancel}>
            Đóng
          </Button>
        </div>
      }
      closable={false}
      width={1024}
    >
      <Row gutter={16}>
        <Col flex={"auto"} style={{ width: 0 }}>
          <div
            style={{
              color: "#01638D",
            }}
            className="fw-700 fs-16 mb-10, ml-20"
          >
            {attachmentName || fileView?.FileName}
          </div>
        </Col>
        {listFiles?.length > 1 && (
          <Col style={{ width: 160 }}>
            <Space size={16}>
              <ButtonCircle
                title="File trước"
                iconName="arrow-left-circle"
                enable={indexFile !== 0}
                onClick={() => {
                  setIndexFile(indexFile - 1)
                }}
              />
              <Space size={8}>
                {indexFile + 1}/{listFiles?.length}
              </Space>
              <ButtonCircle
                title="File sau"
                iconName="arrow-right-circle"
                enable={indexFile !== listFiles.length - 1}
                onClick={() => {
                  setIndexFile(indexFile + 1)
                }}
              />
            </Space>
          </Col>
        )}
      </Row>
      {fileView ? (
        <>
          {listFiles ? (
            <>
              {fileView?.FileType === 1 ? (
                <div
                  className="pdf-container"
                  style={{ padding: "0 20px 0 20px" }}
                >
                  <ThemeContext.Provider value={themeContext}>
                    <LocalizationContext.Provider value={localizationContext}>
                      <div
                        className={`rpv-core__viewer rpv-core__viewer--${currentTheme}`}
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.3)",
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            alignItems: "center",
                            backgroundColor:
                              currentTheme === "dark" ? "#292929" : "#eeeeee",
                            borderBottom:
                              currentTheme === "dark"
                                ? "1px solid #000"
                                : "1px solid rgba(0, 0, 0, 0.1)",
                            display: "flex",
                            padding: ".25rem",
                          }}
                        >
                          <Toolbar />
                        </div>
                        <div
                          style={{
                            flex: 1,
                            overflow: "hidden",
                          }}
                        >
                          <Worker
                            workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"
                            className="custom"
                          >
                            <Viewer
                              fileUrl={fileView?.FileUrl}
                              plugins={[toolbarPluginInstance]}
                            />
                          </Worker>
                        </div>
                      </div>
                    </LocalizationContext.Provider>
                  </ThemeContext.Provider>
                </div>
              ) : fileView?.FileType === 2 ? (
                <Image
                  src={fileView?.FileUrl}
                  style={{
                    height: "80vh",
                    width: "auto",
                    margin: "auto",
                    display: "flex",
                  }}
                />
              ) : (
                <div
                  onClick={() => window.open(fileView?.FileUrl)}
                  style={{
                    color: "#1677ff",
                    textDecoration: "underline",
                    padding: "12px 20px",
                  }}
                >
                  File thuộc dạng file tài liệu .docx, .xlsx,... vui lòng tải
                  xuống để xem
                </div>
              )}
            </>
          ) : (
            <div className="pdf-container" style={{ padding: "0 20px 0 20px" }}>
              <ThemeContext.Provider value={themeContext}>
                <LocalizationContext.Provider value={localizationContext}>
                  <div
                    className={`rpv-core__viewer rpv-core__viewer--${currentTheme}`}
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.3)",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                        backgroundColor:
                          currentTheme === "dark" ? "#292929" : "#eeeeee",
                        borderBottom:
                          currentTheme === "dark"
                            ? "1px solid #000"
                            : "1px solid rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        padding: ".25rem",
                      }}
                    >
                      <Toolbar />
                    </div>
                    <div
                      style={{
                        flex: 1,
                        overflow: "hidden",
                      }}
                    >
                      <Worker
                        workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"
                        className="custom"
                      >
                        <Viewer
                          fileUrl={fileView?.FileUrl}
                          plugins={[toolbarPluginInstance]}
                        />
                      </Worker>
                    </div>
                  </div>
                </LocalizationContext.Provider>
              </ThemeContext.Provider>
            </div>
          )}
        </>
      ) : (
        <Empty description="Không có file" className="mt-50" />
      )}
    </ModalViewPDFStyle>
  )
}

export default ModalViewPDF
