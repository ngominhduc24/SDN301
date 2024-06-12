import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { ContentState, convertToRaw, EditorState } from "draft-js"
import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"
import { Editor } from "react-draft-wysiwyg"
import { WrapEditor } from "./styled"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const DraftEditor = ({ getText, getHtml, value = "" }) => {
  const [editorState, setEditorState] = useState(EditorState?.createEmpty())
  const [htmlContent, setHtmlContent] = useState("")
  const [textContent, setTextContent] = useState("")

  const wrapperStyle = {}
  const toolbarStyle = {
    border: "1px solid #dfe1e5",
    borderBottom: "none",
    backgroundColor: "#fff",
    borderRadius: "3px 3px 0 0",
    margin: "0px",
  }
  const editorStyle = {
    backgroundColor: "#fff",
    minHeight: "120px",
    maxHeight: "120px",
    border: "1px #dfe1e5 solid",
    padding: "5px 15px",
    outline: "none",
    overflow: "auto",
  }

  useEffect(() => {
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    setHtmlContent(html)
    const text = html
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\n+$/, "")
      .replaceAll("&nbsp;", "")

    setTextContent(text)
  }, [editorState])

  useEffect(() => {
    if (value) {
      const blocksFromHTML = htmlToDraft(`<html> ${value} </html>`.trim())
      const state = ContentState.createFromBlockArray(
        blocksFromHTML?.contentBlocks,
        blocksFromHTML?.entityMap,
      )
      setEditorState(EditorState.createWithContent(state))
    }
  }, [value])

  useEffect(() => {
    getText(textContent)
    getHtml(htmlContent)
  }, [htmlContent, textContent])

  return (
    <WrapEditor>
      <Editor
        editorState={editorState}
        toolbarStyle={toolbarStyle}
        wrapperStyle={wrapperStyle}
        editorStyle={editorStyle}
        // toolbarClassName="toolbarClassName"
        // wrapperClassName="wrapperClassName"
        // editorClassName="editorClassName"
        onEditorStateChange={newState => {
          setEditorState(newState)
        }}
        toolbar={{
          options: [
            // "blockType",
            // "fontSize",
            "inline",
            // "emoji",
            // "colorPicker",
            "textAlign",
            "list",
            // "link",
            // "image",
            "history",
          ],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["bold", "italic", "underline", "strikethrough"],
          },
          list: {
            options: ["unordered", "ordered"],
          },
          link: {
            options: ["link"],
          },
        }}
      />
    </WrapEditor>
  )
}

DraftEditor.propTypes = {
  getText: PropTypes.func,
  getHtml: PropTypes.func.isRequired,
}

export default DraftEditor
