import { Col, Modal, Row, Space } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import { SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey } from "src/lib/utils"
import SearchAndFilter from "./components/SearchAndFilter"
import InsertUpdateProduct from "./components/InsertUpdateProduct"
import ModalViewProgram from "./components/ModalViewProduct"
import moment from "moment"
import SpinCustom from "src/components/Spin"
import AdminServices from "src/services/AdminService"
import ModalViewProduct from "./components/ModalViewProduct"
import UpdateProduct from './components/UpdateProduct'
const ManageProduct = () => {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [buttonShow, setButtonShow] = useState()
  const [openInsertUpdateProduct, setOpenInsertUpdateProduct] = useState(false)
  const [openViewProduct, setOpenViewProduct] = useState(false)
  const [openUpdateProducts, setOpenUpdateProducts] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productId, setProductId] = useState("")
  const [pagination, setPagination] = useState({
    PageSize: 10,
    CurrentPage: 1,
    TextSearch: "",
    ApproveStatus: 0,
    Status: 0,
  })

  useEffect(() => {
    getAllProducts()
  }, [pagination])

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const res = await AdminServices.getAllProducts();
      console.log("product res: ", res);
      setProducts(res);
      setTotal(res.length);

      const productId = res._id;
      setProductId(productId)
    } catch (error) {
      console.log("error");
    }finally{
      setLoading(false)
    }
   
  }

  // const handleDeleteProducts = (record) => {
  // }
  const listBtn = record => [
    {
      isEnable: true,
      name: "Duyệt chương trình",
      icon: "eye",
      onClick: () => {setSelectedProduct(record)
        setOpenViewProduct(true)
      },
    },
    {
      isEnable: true,
      name: "Chỉnh sửa",
      icon: "edit-green",
      onClick: () => {setOpenUpdateProducts(true)
        setSelectedProduct(record)
      },
    },
    {
      isEnable: true,
      name: "Xóa",
      icon: "delete-red-row",
      onClick: () =>
        CB1({
          record,
          title: `bạn chắc chắn muốn xóa?`,
          icon: "warning-usb",
          okText: "Có",
          cancelText: "Không",
          onOk: async close => {
            // handleDeleteBooking(record)
            close()
          },
        }),
    },
  ]

  const column = [
    {
      title: "STT",
      key: "_id",
      width: 60,
      render: (_, record, index) => (
        <div className="text-center">{index + 1}</div>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      width: 200,
      key: "name",
    },
    {
      title: "Giá cả",
      dataIndex: "price",
      width: 200,
      key: "price",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: 200,
      key: "description",
      render: (_, record) => (
        <span>{record?.description}</span>
      ),
    },
    {
      title: "Phân loại",
      dataIndex: "categoryId",
      width: 120,
      key: "category",
      render: (_, record) => <span>{record?.categoryId}</span>,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      width: 120,
      align: "center",
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
      dataIndex: "status",
      align: "center",
      width: 100,
      key: "status",
      render: (_, record) => (
        <span
          className={[
            "no-color",
            record?.status === "active" ? "blue-text" : "red-text",
          ].join(" ")}
        >
          {record?.status === "active" ? "Đang hoạt động" : "Dừng Hoạt Động"}
        </span>
      ),
    },
    {
      title: "Chức năng",
      align: "center",
      key: "Action",
      width: 100,
      render: (_, record) => (
        <Space>
          {listBtn(record).map(
            (i, idx) =>
              !!i?.isEnable && (
                <ButtonCircle
                  key={idx}
                  title={i.name}
                  iconName={i.icon}
                  onClick={i.onClick}
                />
              ),
          )}
        </Space>
      ),
    },
  ]
  // const fakeData = [
  //   {
  //     StoreID: 1,
  //     StoreName: "user1",
  //     Address: "User One",
  //     Email: "user1@example.com",
  //     PhoneNumber: "1234567890",
  //     OperatingHours: "",
  //     Status: 1,
  //   },
  //   {
  //     StoreID: 2,
  //     StoreName: "user2",
  //     Address: "User One",
  //     Email: "user1@example.com",
  //     PhoneNumber: "1234567890",
  //     OperatingHours: "",
  //     Status: 1,
  //   },
  // ]

  return (
    <SpinCustom spinning={loading}>
      <div className="title-type-1 d-flex justify-content-space-between align-items-center mt-12 mb-30">
        <div>Quản lý tổng sản phẩm</div>
        <div>
          <Button
            btntype="third"
            onClick={() => {setOpenInsertUpdateProduct(true)
            }}
          >
            Thêm mới
          </Button>
        </div>
      </div>
      <SearchAndFilter pagination={pagination} setPagination={setPagination} />
      <Row>
        <Col span={24} className="mt-30 mb-20">
          <TableCustom
            isPrimary
            rowKey="_id"
            columns={column}
            textEmpty="Chưa có cửa hàng nào"
            dataSource={products}
            scroll={{ x: "800px" }}
            // onRow={record => {
            //   return {
            //     onClick: () => {
            //       setOpenViewProduct(record)
            //     },
            //   }
            // }}
            pagination={{
              hideOnSinglePage: total <= 10,
              current: pagination?.CurrentPage,
              pageSize: pagination?.PageSize,
              responsive: true,
              total: total,
              locale: { items_per_page: "" },
              showSizeChanger: total > 10,
              onChange: (CurrentPage, PageSize) =>
                setPagination({
                  ...pagination,
                  CurrentPage,
                  PageSize,
                }),
            }}
          />
        </Col>
      </Row>
      <Modal visible={imageModalVisible} footer={null}></Modal>
      {!!openInsertUpdateProduct && (
        <InsertUpdateProduct
          open={openInsertUpdateProduct}
          
          // onOk={() => getListBookings()}
          onOk={() => getAllProducts()}
          onCancel={() => setOpenInsertUpdateProduct(false)}
        />
      )}
      {!!openViewProduct  && selectedProduct && (
        <ModalViewProduct
          open={openViewProduct}
          // onOk={() => getAllProducts()}
          // handleDeleteBooking={handleDeleteBooking}
          onCancel={() => setOpenViewProduct(false)}
          data={selectedProduct}
        />
       )}
       {!!openUpdateProducts && selectedProduct && (
        <UpdateProduct id={productId} data={selectedProduct} open={openUpdateProducts} onCancel={() => setOpenUpdateProducts(false)} onOk={() => getAllProducts()}/>
       )}
    </SpinCustom>
  )
}

export default ManageProduct

