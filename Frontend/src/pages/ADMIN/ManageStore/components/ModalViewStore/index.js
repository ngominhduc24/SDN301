import { Col, Modal, Row, Tooltip } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CB1 from "src/components/Modal/CB1"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import { SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey } from "src/lib/utils"
import InsertUpdateProgram from "../InsertUpdateProgram"
import TableCustom from "src/components/TableCustom"
import SearchAndFilter from "../SearchAndFilter"
import SpinCustom from "src/components/Spin"
import AdminServices from "src/services/AdminService"

const ModalViewStore = ({ open, onCancel, onOk, store }) => {
  const [storeProducts, setStoreProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [openViewProducts, setOpenViewProducts] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [openInsertUpdateProducts, setOpenInsertUpdateProducts] = useState(false)
  const [openUpdateProducts, setOpenUpdateProducts] = useState(false)
  const [pagination, setPagination] = useState({
    PageSize: 10,
    CurrentPage: 1,
    TextSearch: "",
    ApproveStatus: 0,
    Status: 0,
  })

  useEffect(() => {
    getProductInShop()
  }, [pagination])

  const getProductInShop = async () => {
    try {
      setLoading(true);
      const res = await AdminServices.getProductInStore(store._id)
      console.log("product in store: ", res);
      setStoreProducts(res)
      setTotal(res.length)
    } catch (error) {
      console.log("error");
    }finally{
      setLoading(false)
    }
  }
  const renderFooter = () => (
    <div className="lstBtn-right d-flex-end">
        <Button btntype="primary" onClick={() => handleInsertUpdateProducts()}>
          Chỉnh sửa
        </Button>
        <Button
          btntype="primary"
          onClick={() => {
            showDeleteConfirmation(open)
          }}
        >
          Xóa
        </Button>
    </div>
  )

  const column = [
    {
      title: "STT",
      key: ["productId", "_id"],
      width: 60,
      render: (text, row, index) => (
        <div className="text-center">
{index + 1 + pagination.PageSize * (pagination.CurrentPage - 1)}
        </div>
      )
    }, 
    {
      title: "Tên sản phẩm",
      dataIndex: ["productId", "name"],
      width: 200,
      key: "name"
    },
    {
      title: "Mô tả",
      dataIndex: ["productId", "description"],
      width: 200,
      key: "description",
      render: text => (
        <Tooltip title={text}>
          <span>
            {text.length > 100 ? `${text.substring(0,100)}...`: text}
          </span>
        </Tooltip>
      )
    }, {
      title: "Phân loại",
      dataIndex: ["productId", "categoryId"],
      width: 120,
      key: "categoryId"
    }, {
      title: "Ảnh",
      dataIndex: ["productId", "image"],
      width: 120,
      key: "image",
      render: text => (
        <img src={text} alt="product" width={50} height={50} style={{ cursor: "pointer" }} onClick={() => {
          setSelectedImage(text);
          setImageModalVisible(true);
        }}
        />
      )
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: ["productId", "status"],
      align: "center",
      width: 100,
      key: "status",
      render: (_, record) => (
        <span className={[
          "no-color", record?.productId?.status === "active" ? "blue-text" : "red-text",
        ].join(" ")}>
          {record?.productId?.status === "active" ? "Đang hoạt động" : "Dừng Hoạt Động"}
        </span> 
      )
    }
  ]

  const showDeleteConfirmation = record => {
    CB1({
      record,
      title: `Phòng họp đang có chương trình họp sắp hoặc đang diễn ra, bạn chắc chắn muốn xóa?`,
      icon: "warning-usb",
      okText: "Có",
      cancelText: "Không",
      onOk: async close => {
        // await handleDeleteBooking(record)
        close()
      },
    })
  }
  const handleInsertUpdateProducts = async () => {
    setOpenInsertUpdateProducts(true)
  }
  return (
    <Modal
    visible={open}
    onCancel={onCancel}
    title="Chi tiết cửa hàng"
    width="70vw"
    footer={
      <div className="lstBtn d-flex-sb">
        <div className="lstBtn-right d-flex-end">
          <Button
            btntype="third"
            className="ml-8 mt-12 mb-12"
            onClick={onCancel}
          >
            Đóng
          </Button>
        </div>
      </div>
    }
  >
    <Row gutter={[16, 16]} justify="center" className="mr-12 ml-12">
      <Col span={12}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <strong>Tên cửa hàng:</strong> {store?.name}
          </Col>
          <Col span={24}>
            <strong>Địa chỉ:</strong> {store?.location}
          </Col>
          <Col span={24}>
            <strong>Trạng Thái:</strong>{" "}
            <span
              className={store?.status === "open" ? "blue-text" : "red-text"}
            >
              {store?.status === "open" ? "Đang hoạt động" : "Dừng hoạt động"}
            </span>
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <strong>Số điện thoại:</strong> {store?.phone}
          </Col>
          <Col span={24}>
            <strong>Email:</strong> {store?.email}
          </Col>
        </Row>
      </Col>
    </Row>
    <Row gutter={[16,16]} justify={"center"}>
      <Col span={24}>
      <SpinCustom spinning={loading}>
        <div className="title-type-1 d-flex justify-content-space-between align-items-center">
          <div>Sản phẩm trong cửa hàng</div>
        </div>
        <SearchAndFilter pagination={pagination} setPagination={setPagination}></SearchAndFilter>
        <Row>
          <Col span={24}>
          <TableCustom isPrimary rowKey="ProductId" columns={column} textEmpty="Chưa có sản phẩm nào trong cửa hàng" dataSource={storeProducts} sccroll={{x: "800px"}} pagination={{
            hideOnSinglePage: total <= 10,
            current: pagination?.CurrentPage,
            pageSize: pagination?.PageSize,
            responsive: true,
            total: total,
            locale: {items_per_page: ""},
            showSizeChanger: total > 10,
            onchange: (CurrentPage, PageSize) => setPagination({
              ...pagination,
              CurrentPage,
              PageSize
            })
          }}></TableCustom>
          </Col>
        </Row>
        <Modal visible={imageModalVisible} footer={null} onCancel={() => setImageModalVisible(false)}>
          <img src={selectedImage} alt="product" style={{width: "100%"}} />
        </Modal>
        </SpinCustom></Col>
    </Row>
    
      <InsertUpdateProgram
        visible={openInsertUpdateProducts}
        // onOk={() => onOk()}
        onCancel={() => setOpenInsertUpdateProducts(false)}
      />
  </Modal>
  )
}

export default ModalViewStore

