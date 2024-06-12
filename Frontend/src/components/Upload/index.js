import { Upload } from "antd"
import React, { useState, useEffect } from "react"
import axios from "axios"
import { changeImportLoading } from "src/redux/common"
import STORAGE, { getStorage } from "src/lib/storage"
import Notice from "../Notice"
import { useDispatch } from "react-redux"

const { Dragger } = Upload

const UploadCustom = ({
  params,
  api,
  beforeUpload,
  onOk,
  isDragger = false,
  nameFileUpload = "file",
  ...props
}) => {
  const [listFile, setListFile] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (listFile?.length) onUpload()
  }, [listFile])

  const dragProps = {
    name: "file",
    multiple: false,
    itemRender: () => <div />,
    headers: {
      Authorization: getStorage(STORAGE.TOKEN),
    },
    fileList: [],

    onDrop(e) {},
    ...props,
    beforeUpload: (file, filelist) => {
      beforeUpload && beforeUpload(filelist)
      dispatch(changeImportLoading(true))
      setListFile(filelist)
      return false
    },
  }

  const onUpload = () => {
    const formData = new FormData()
    listFile.forEach(file => {
      formData.append(nameFileUpload, file)
    })
    if (!!params) {
      const listValue = Object.entries(params)
      listValue?.forEach(i => formData.append(i[0], i[1]))
    }

    axios({
      method: "POST",
      url: `${window.env?.API_ROOT || process.env.REACT_APP_API_ROOT}/${api}`,
      headers: {
        Authorization: getStorage(STORAGE.TOKEN),
      },
      data: formData,
    })
      .then(resp => resp?.data)
      .then(res => {
        if (res?.isError)
          return Notice({
            isSuccess: false,
            msg: res?.Object,
          })
        onOk && onOk(res)
      })
      .finally(() => {
        setListFile([])
        dispatch(changeImportLoading(false))
      })
  }

  return React.createElement(isDragger ? Dragger : Upload, { ...dragProps })
}

export default UploadCustom
