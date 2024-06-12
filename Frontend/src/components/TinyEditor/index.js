import React, { useEffect, useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import styled from "styled-components"
import { changeModalLoading } from "src/redux/common"
import { useDispatch } from "react-redux"
// import FileService from "src/services/FileService"

const TinyWrapper = styled.div`
  position: relative;
  .tox-statusbar__branding {
    display: none;
  }
  .tox .tox-menubar {
    display: ${({ isSimple }) => (isSimple ? "none" : "flex")};
  }
`
function retrieveImageFromClipboardAsBlob(pasteEvent) {
  if (pasteEvent.clipboardData === false) {
    return false
  }

  var items = pasteEvent.clipboardData.items

  if (items === undefined) {
    return false
  }

  for (var i = 0; i < items.length; i++) {
    // Only paste if image is only choice
    if (items[i].type.indexOf("image") === -1) {
      return false
    }
    // Retrieve image on clipboard as blob
    var blob = items[i].getAsFile()

    // load image if there is a pasted image
    if (blob !== null) {
      const reader = new FileReader()
      reader.onload = function (e) {}
      reader.readAsDataURL(blob)
      return blob
    }
  }
  return false
}
export default function TinyEditor(props) {
  const {
    setLoading,
    height = props?.defaultheight ? props?.defaultheight : "70vh",
    onWordCount,
    isSimple,
    selector,
  } = props
  const [isFullScreen, setIsFullScreen] = useState(false)
  const dispatch = useDispatch()

  const toolbar = isSimple
    ? "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | link fullscreen"
    : "undo redo | bold italic underline strikethrough | fontfamily | fontsize | alignleft aligncenter alignright alignjustify lineheight | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak  charmap | fullscreen preview print | insertfile image media template link anchor codesample | ltr rtl"
  const plugins =
    "media fullpage print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars"
  const API_KEY = "k364ryo6l7yndoijk4jqa6gag4dtx0fd92z8kmi6nle6avms"
  var useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
  useEffect(() => {}, [selector])

  return (
    <TinyWrapper isFullScreen={isFullScreen} isSimple={isSimple}>
      <Editor
        {...props}
        apiKey={API_KEY}
        init={{
          plugins: plugins,
          toolbar: toolbar,
          // font_formats:
          //   'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Be Vietnam Pro=be vietnam pro; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
          height,
          // content_style: "@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro'); ",
          setup: function (ed) {
            ed.on("init", function (args) {
              setLoading && setLoading(false)
            })
            ed.on("FullscreenStateChanged", function (e) {
              setIsFullScreen(e?.state)
            })
            ed.on("WordCountUpdate", function (e) {
              onWordCount && onWordCount(e?.wordCount)
            })
            ed.on("paste", async function (e) {
              // var imageBlob = retrieveImageFromClipboardAsBlob(e)
              // if (!imageBlob) {
              //   return
              // }
              // e.preventDefault()
              // try {
              //   const formData = new FormData()
              //   formData.append("file", imageBlob)
              //   dispatch(changeModalLoading(true))
              //   const res = await FileService.uploadFile(formData)
              //   if (res?.isError) return
              //   ed.insertContent('<img src="' + res.Object + '" />')
              // } finally {
              //   dispatch(changeModalLoading(false))
              // }
            })
          },
          images_file_types: "svg,jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp",
          // min_height: 300,
          file_picker_types: "image media",
          deprecation_warnings: false,
          selector: !!selector ? selector : "textarea#open-source-plugins",
          // font_formats:
          //   "Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n",
          fontsize_formats:
            "8px 10px 12px 14px 16px 18px 20px 24px 28px 32px 36px 40px 48px 56px 64px",
          imagetools_cors_hosts: ["picsum.photos"],
          menubar: "file edit view insert format tools table help",

          toolbar_sticky: true,
          autosave_ask_before_unload: true,
          autosave_interval: "30s",
          autosave_prefix: "{path}{query}-{id}-",
          autosave_restore_when_empty: false,
          autosave_retention: "2m",
          image_advtab: true,
          // link_list: [
          //   { title: 'My page 1', value: 'https://www.tiny.cloud' },
          //   { title: 'My page 2', value: 'http://www.moxiecode.com' }
          // ],
          // image_list: [
          //   { title: 'My page 1', value: 'https://www.tiny.cloud' },
          //   { title: 'My page 2', value: 'http://www.moxiecode.com' }
          // ],
          image_class_list: [
            { title: "None", value: "" },
            { title: "Some class", value: "class-name" },
          ],
          importcss_append: true,
          save_onsavecallback: function () {},
          language: "vi",
          language_url: "/vi.js",
          paste_data_images: true,
          images_upload_handler: async function (blobInfo, progress) {
            try {
              const formData = new FormData()
              formData.append("file", blobInfo?.blob())
              dispatch(changeModalLoading(true))
              // const res = await FileService.uploadFile(formData)
              // if (res?.isError) return
              // return res?.Object
            } finally {
              dispatch(changeModalLoading(false))
            }
          },
          templates: [
            {
              title: "New Table",
              description: "creates a new table",
              content:
                '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
            },
            {
              title: "Starting my story",
              description: "A cure for writers block",
              content: "Once upon a time...",
            },
            {
              title: "New list with dates",
              description: "New List with dates",
              content:
                '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
            },
          ],
          template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
          template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
          image_caption: true,
          quickbars_selection_toolbar:
            "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
          noneditable_noneditable_class: "mceNonEditable",
          toolbar_mode: "sliding",
          contextmenu: "link image imagetools table",
          skin: useDarkMode ? "oxide-dark" : "oxide",
          content_css: useDarkMode ? "dark" : "default",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          media_poster: false,
          media_alt_source: false,
          block_unsupported_drop: false,
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement("input")
            input.setAttribute("type", "file")
            input.setAttribute("accept", "image/*, video/*")

            input.onchange = async function () {
              var file = this.files[0]
              var reader = new FileReader()
              reader.onload = async function (e) {
                if (meta.filetype === "media" || meta.filetype === "image") {
                  try {
                    const formData = new FormData()
                    formData.append("file", file)
                    dispatch(changeModalLoading(true))
                    // const res = await FileService.uploadFile(formData)
                    // return cb(res?.Object)
                  } finally {
                    dispatch(changeModalLoading(false))
                  }
                }

                var id = "blobid" + new Date().getTime()
                var blobCache =
                  window.tinymce.activeEditor.editorUpload.blobCache
                var base64 = reader.result.split(",")[1]
                var blobInfo = blobCache.create(id, file, base64)
                blobCache.add(blobInfo)
                cb(blobInfo.blobUri(), { title: file.name })
              }
              reader.readAsDataURL(file)
            }

            input.click()
          },
        }}
      />
    </TinyWrapper>
  )
}

export const RenderTiny = props => (
  <TinyEditor
    {...props}
    onEditorChange={props?.onChange}
    // onBlur={onBlur}
    onChange={undefined}
    setLoading={props?.setLoading}
    placeholder="Nhập nội dung"
  />
)

