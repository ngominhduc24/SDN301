import { Input } from "antd"
import { useState } from "react"
import { StyleMeetingInvitation } from "./styled"
import SpinCustom from "src/components/Spin"
const { TextArea } = Input
const ManagerMeetingInvitationNotice = () => {
  const [loading, setLoading] = useState(false)

  return (
    <SpinCustom spinning={loading}>
      {/* <div className="d-flex-center">
        <div style={{ maxWidth: "1000px" }}>
          <Row gutter={[16, 16]}>
            <Col span={24} className=" mt-12" style={{ margin: "0 1rem" }}>
              <span className="fs-24">Giấy mời họp</span>
            </Col>

            <Col
              span={24}
              className="d-flex-sb  mt-12"
              style={{ margin: "0 1rem", justifyContent: "center" }}
            >
              <Form>
                <Row
                  style={{ fontWeight: "bold" }}
                  className="mb-20"
                  gutter={16}
                  justify="center"
                >
                  <Col xs={20} sm={20} md={12} lg={10} xl={12}>
                    <Typography>co_quan_cap_tren_truc_tiep</Typography>
                    <Typography style={{ marginLeft: 10, marginRight: 10 }}>
                      co_quan_chu_tri_hop
                    </Typography>
                  </Col>
                  <Col
                    xs={20}
                    sm={20}
                    md={12}
                    lg={10}
                    xl={12}
                    style={{ textAlign: "center" }}
                  >
                    <Typography>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Typography>
                    <Typography style={{ textDecoration: "underline" }}>
                      Độc lập - Tự do - Hạnh phúc
                    </Typography>
                  </Col>
                </Row>
                <Row
                  style={{ fontWeight: "bold ", textDecoration: "underline" }}
                  className="mb-20"
                  gutter={16}
                >
                  <Col span={24}>
                    <Typography>Số:</Typography>
                  </Col>
                </Row>
                <Row className="mb-20" gutter={16}>
                  <Col span={16} offset={8} style={{ textAlign: "right" }}>
                    <Typography>Hà Nội, ngày 17 tháng 12 năm 2021</Typography>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col
                    span={8}
                    offset={8}
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                  >
                    <Typography className="fs-24">Giấy mời họp</Typography>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={24}>
                    <Typography>
                      Xin ý kiến về thời gian thử nghiệm hệ thống biểu quyết
                      điện tử sử dụng trong các cuộc họp trực tuyến
                    </Typography>
                  </Col>
                </Row>
                <Row className="mb-20" gutter={16}>
                  <Col span={24}>
                    <Typography>
                      chu_tri_hop tổ chức cuộc họp tieu_de_cuoc_hop
                    </Typography>
                    <Typography>
                      Trân trọng kính mời: danh_sach_don_vi_du_hop
                    </Typography>
                    <Typography>
                      Thời gian: Bắt đầu lúc bat_dau_luc ngày bat_dau
                      (thoi_gian_chi_tiet)
                    </Typography>
                    <Typography>Địa điểm: dia_diem_to_chuc_hop</Typography>
                    <Typography>
                      Đơn vị chuẩn bị tài liệu thảo luận trong cuộc họp:
                      danh_sach_don_vi_chuan_bi_tai_lieu
                    </Typography>
                  </Col>
                </Row>

                <Row className="mb-20" gutter={16} justify="center">
                  <Col xs={20} sm={20} md={12} lg={10} xl={12}>
                    <Typography
                      style={{
                        marginLeft: 10,
                        marginRight: 10,
                        fontWeight: "bold",
                      }}
                    >
                      Nơi nhận:
                    </Typography>
                  </Col>
                  <Col
                    xs={20}
                    sm={20}
                    md={12}
                    lg={10}
                    xl={12}
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    <Typography>TL...</Typography>
                    <Typography>KT...</Typography>
                    <Typography>(Đã ký)</Typography>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div> */}
      <StyleMeetingInvitation>
        <div>
          <div class="d-flex-center">
            <div class="max-width-container">
              <div class="d-flex-sb mt-12">
                <form>
                  <div class="row mb-20">
                    <div class="col-6">
                      <div class="text-center">
                        <span>co_quan_cap_tren_truc_tiep</span>
                      </div>
                      <div class="text-center">
                        <span class="borderbottomoutlined">
                          co_quan_chu_tri_hop
                        </span>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="text-center">
                        <span>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</span>
                      </div>
                      <div class="text-center">
                        <span class="borderbottomoutlined">
                          Độc lập - Tự do - Hạnh phúc
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="row mb-20">
                    <div class="col-12">
                      <span>Số:</span>
                    </div>
                  </div>
                  <div class="row mb-20">
                    <div class="font-style-italic col-8 text-right">
                      <span>Hà Nội, ngày 17 tháng 12 năm 2021</span>
                    </div>
                  </div>
                  <div class="row mb-20">
                    <div class="col-8 offset-8 text-center">
                      <span class="fs-24 borderbottomoutlined">
                        Giấy mời họp
                      </span>
                    </div>
                  </div>

                  <div class="row mb-20">
                    <div class="col-12">
                      <div>
                        <span class="font-weight-bold">chu_tri_hop: </span>
                        <span> tổ chức cuộc họp tieu_de_cuoc_hop</span>
                      </div>
                      <div>
                        <span class="font-weight-bold">
                          Trân trọng kính mời:
                        </span>
                        <span> danh_sach_don_vi_du_hop</span>
                      </div>
                      <div>
                        <span class="font-weight-bold">Thời gian: </span>
                        <span class="font-weight-bold">
                          Bắt đầu lúc bat_dau_luc ngày bat_dau
                          (thoi_gian_chi_tiet)
                        </span>
                      </div>
                      <div>
                        <span class="font-weight-bold">Địa điểm: </span>
                        <span> dia_diem_to_chuc_hop</span>
                      </div>
                      <div>
                        <span class="font-weight-bold">
                          Đơn vị chuẩn bị tài liệu thảo luận trong cuộc họp:{" "}
                        </span>
                        <span>danh_sach_don_vi_chuan_bi_tai_lieu</span>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-20 justify-content-center">
                    <div class="col-6">
                      <div>
                        <span class="font-weight-bold font-style-italic ">
                          Nơi nhận:
                        </span>
                      </div>
                      <div>
                        <span>- Như thành phần mời;</span>
                      </div>
                      <div>
                        <span>- Lưu: VT,...</span>
                      </div>
                    </div>
                    <div class="col-6 text-center">
                      <span>TL...</span>
                      <span>KT...</span>
                      <span class="font-style-italic">(Đã ký)</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </StyleMeetingInvitation>
    </SpinCustom>
  )
}

export default ManagerMeetingInvitationNotice
