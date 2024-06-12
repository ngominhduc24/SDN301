import React from "react"
import { Upload, message } from "antd"
// import ImgCrop from 'antd-img-crop'
import PropTypes from "prop-types"
import get from "lodash/get"
import defaultAsset from "src/assets/images/default_asset.svg"
import removeImage from "src/assets/images/close.svg"
import styles from "./styles.module.scss"

function getBase64(file) {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

function beforeUpload(file) {
  const isJpgOrPng = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/bmp",
  ].includes(file.type)
  if (!isJpgOrPng) {
    message.error("Bạn chỉ có thể upload JPG/PNG/JPEG/BITMAP file!")
  }
  const isLt20M = file.size / 1024 / 1024 < 20
  if (!isLt20M) {
    message.error("Ảnh phải nhỏ hơn 20MB!")
  }
  return isJpgOrPng && isLt20M
}

export default class UploadImage extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onGetImageInfo: PropTypes.func,
    isRemoveImage: PropTypes.bool,
    imagePath: PropTypes.string,
  }

  static defaultProps = {
    className: "",
    onGetImageInfo: () => {},
    isRemoveImage: false,
    imagePath: null,
  }

  state = {
    loading: false,
    fileName: null,
    fileBase64: null,
    imageUrl: this.props.imagePath,
  }

  handleChange = async info => {
    const { onGetImageInfo } = this.props

    if (info.file.status === "uploading") {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === "done") {
      const imageUrl = await getBase64(info.file.originFileObj)
      this.setState({ imageUrl: imageUrl, loading: false })
      onGetImageInfo(
        imageUrl && imageUrl.split(",")[1],
        get(info.file.originFileObj, "name"),
      )
    }
  }

  handleRemoveImage = e => {
    const { onGetImageInfo } = this.props
    const { fileBase64, fileName } = this.state

    e.stopPropagation()
    this.setState({
      imageUrl: null,
      fileName: null,
      fileBase64: null,
    })
    onGetImageInfo(fileBase64, fileName)
  }

  renderImage = () => {
    const { isRemoveImage } = this.props
    const { imageUrl } = this.state
    if (isRemoveImage) {
      return (
        <div className={`${styles.imageCnt}`}>
          <img src={defaultAsset} />
        </div>
      )
    }
    return (
      <div className={styles.imageCnt}>
        {!imageUrl && <img src={defaultAsset} />}
        <div className={styles.textUpload}> {`Upload ảnh`} </div>
        {imageUrl && (
          <>
            <img
              className={styles.removeImg}
              src={removeImage}
              onClick={this.handleRemoveImage}
            />
            <img src={imageUrl} alt="avatar" className={styles.avatar} />
          </>
        )}
      </div>
    )
  }

  render() {
    const { className } = this.props

    return (
      // <ImgCrop
      //   rotate
      //   grid
      //   aspect={1.6 / 1}
      //   modalTitle={`Sửa ảnh`}
      //   modalCancel={`Huỷ`}
      //   modalOk={`Đồng ý`}
      //   beforeCrop={beforeUpload}
      // >
      <Upload
        accept=".png, .jpeg, .jpg, .bmp"
        name="avatar"
        listType="picture-card"
        className={`avatar-uploader ${className}`}
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {this.renderImage()}
      </Upload>
      // </ImgCrop>
    )
  }
}
