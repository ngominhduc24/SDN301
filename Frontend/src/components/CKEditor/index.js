import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch } from 'react-redux';
import { changeModalLoading } from 'src/redux/common';
import FileService from 'src/services/FileService';

const CustomCKEditor = ({ setLoading, height, onWordCount, isSimple }) => {
  useEffect(() => {
    // Thực hiện các cài đặt tùy chỉnh nếu cần
  }, []);

  const handlePaste = async (event, editor) => {
    // Xử lý sự kiện dán tại đây
    // Ví dụ: Tìm và xử lý hình ảnh trong clipboard
  };
  const dispatch = useDispatch()
  var useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
  return (
    <CKEditor
      editor={ClassicEditor}
      data="" // Đưa dữ liệu mặc định nếu cần
      API_KEY="otvxof254pydtmrs1sdv26j4nfuj5qus0qkqf1yzdo1tf1zi"
      onReady={(editor) => {
        // Xử lý sự kiện khi CKEditor đã sẵn sàng
        setLoading && setLoading(false);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onWordCount && onWordCount(data.split(/\s+/).filter((word) => word !== '').length);
      }}
      config={{
        // Các cài đặt tùy chỉnh khác của CKEditor
        // Xem tài liệu CKEditor để biết thêm chi tiết: https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/configuration.html
        height: height,
        // Cài đặt toolbar tùy chỉnh
        toolbar: [
          'undo',
          'redo',
          'format',
          'bold',
          'italic',
          'underline',
          'alignLeft',
          'alignCenter',
          'alignRight',
          'bulletedList',
          'numberedList',
          'outdent',
          'indent',
          'link',
          'fullscreen',
        ],
        setup: function (ed) {
          ed.on("init", function (args) {
            setLoading && setLoading(false)
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
        selector: "textarea#open-source-plugins",
        // font_formats:
        //   "Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n",
        fontsize_formats:
          "8px 10px 12px 14px 16px 18px 20px 24px 28px 32px 36px 40px 48px 56px 64px",
        plugins:
          "media fullpage print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars",
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
        save_onsavecallback: function () { },
        language: "vi",
        language_url: "/vi.js",
        paste_data_images: true,
        images_upload_handler: async function (blobInfo, progress) {
          try {
            const formData = new FormData()
            formData.append("file", blobInfo?.blob())
            dispatch(changeModalLoading(true))
            const res = await FileService.uploadFile(formData)
            if (res?.isError) return
            return res?.Object
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
                  const res = await FileService.uploadFile(formData)
                  return cb(res?.Object)
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
  );
};

export default CustomCKEditor;
