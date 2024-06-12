import {
  LocalizationContext,
  ThemeContext,
  Viewer,
  Worker,
} from "@react-pdf-viewer/core"
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
import { toolbarPlugin } from "@react-pdf-viewer/toolbar"
import { useState } from "react"
import vi_VN from "./vi_VN.json"
import styled from "styled-components"

const Styles = styled.div`
  .pdf-container {
    height: calc(100vh - 20px);
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .rpv-default-layout__toolbar {
      position: sticky;
      top: 0;
    }
  }
`

const ContentViewPDF = ({ fileUrl, theme = "dark" }) => {
  const toolbarPluginInstance = toolbarPlugin()
  const { Toolbar } = toolbarPluginInstance
  const [currentTheme, setCurrentTheme] = useState(theme)
  const [l10n, setL10n] = useState(vi_VN)
  const localizationContext = { l10n, setL10n }
  const themeContext = { currentTheme, setCurrentTheme }

  return (
    // <Styles>
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
                <Viewer fileUrl={fileUrl} plugins={[toolbarPluginInstance]} />
              </Worker>
            </div>
          </div>
        </LocalizationContext.Provider>
      </ThemeContext.Provider>
    </div>
    // </Styles>
  )
}

export default ContentViewPDF
