import { Divider } from "antd"
import { FooterStyled } from "./styled"
const Footer = () => {
  return (
    <FooterStyled>
      <Divider className="m-0" />
      {/* <div className="bg-footer p-30">
        <Row>
          <Col xl={3}></Col>
          <Col xl={9}>
            <div className="white mb-10">
              <span className="fw-600">Cơ quan chủ quản:</span> Cục sở hữu trí
              tuệ
            </div>
            <div className="white">
              <span className="fw-600 mb-10">Địa chỉ:</span> 384-386, đường
              Nguyễn Trãi, quận Thanh Xuân, Thành phố Hà Nội.
            </div>
            <div className="white mb-10 mt-10">
              <span className="fw-600">Tổng đài:</span> (024) 3858 3069
            </div>
          </Col>
          <Col xl={9}>
            <div className="fw-500 white mb-10">
              <span>
                Giấy phép thiết lập Website số 55/GP-BC do Cục Báo chí - Bộ Văn
                hoá Thông tin cấp ngày 04/05/2005
              </span>
            </div>
            <div className="white mb-10">
              <span className="fw-600">Email:</span> vietnamipo@ipvietnam.gov.vn
            </div>
            <div className="fw-500 white mb-10">
              Ghi rõ nguồn từ "IP VIETNAM" khi phát hành lại thông tin từ Cổng
              thông tin điện tử này
            </div>
          </Col>
          <Col xl={3}></Col>
        </Row>
      </div> */}
      {/* <div className="footer-last p-10 d-flex-center">
        <div className="text-center white">© HỆ THÔNG HỌP THÔNG MINH</div>
      </div> */}
    </FooterStyled>
  )
}

export default Footer
