import { useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { Dropdown } from "antd"
import { useNavigate } from "react-router-dom"
import LstIcons from "src/components/ListIcons"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"

const PopoverMain = () => {

  const navigate = useNavigate()
  const global = useSelector(globalSelector)


  const items = [
    {
      key: '1',
      label: (
        <div style={{ width: '600px', padding: '12px' }} className="d-flex justify-content-space-between">
          <div>
            <p className="fs-25 fw-700">Thể loại</p>
            <div className="d-flex-sb">
              <div className="mr-30">
                {
                  global?.genres?.slice(0, global?.genres.length * 1 / 3)?.map(i =>
                    <p
                      className="fs-18 cursor-pointer"
                      onClick={() => {
                        navigate(`/genre/${i?._id}`)
                      }}
                    >
                      {i?.Title}
                    </p>
                  )
                }
              </div>
              <div>
                {
                  global?.genres?.slice(global?.genres.length * 2 / 3)?.map(i =>
                    <p
                      className="fs-18 cursor-pointer"
                      onClick={() => {
                        navigate(`/genre/${i?._id}`)
                      }}
                    >
                      {i?.Title}
                    </p>
                  )
                }
              </div>
            </div>
          </div>

          <div>
            <p className="fs-25 fw-700">Tài nguyên</p>
            <div>
              <p
                className="fs-18 cursor-pointer"
                onClick={() => {
                  navigate('/authors')
                }}
              >
                Tác giả
              </p>
              <p className="fs-18 cursor-pointer">
                Ngôn ngũ
              </p>
              <p
                className="fs-18 cursor-pointer"
                onClick={() => {
                  navigate('/genres')
                }}
              >
                Thể loại
              </p>
              <p className="fs-18 cursor-pointer">
                Bài viết
              </p>
              <p className="fs-18 cursor-pointer">
                Phỏng vấn tác giả
              </p>
              <p className="fs-18 cursor-pointer">
                Bàn luận
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <Dropdown
      className="mr-8"
      trigger={['click']}
      menu={{
        items
      }}
    >
      <ButtonCustom
        className="noBackground-textwhite fw-600"
        icon={LstIcons.ICON_CARET_DOWN}
      >
        Khám phá
      </ButtonCustom>
    </Dropdown>
  )
}

export default PopoverMain