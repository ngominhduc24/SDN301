import { Avatar, List } from "antd"
import { useNavigate } from "react-router-dom"
import LstIcons from "src/components/ListIcons"
import SpinCustom from "src/components/SpinCustom"


const HotComics = ({ topComics, loading }) => {

  const navigate = useNavigate()

  return (
    <SpinCustom spinning={loading}>
      <List
        itemLayout="horizontal"
        dataSource={topComics}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  className="cursor-pointer"
                  src={item?.AvatarPath}
                  onClick={() => navigate(`/comic/${item?._id}`)}
                />
              }
              title={
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(`/comic/${item?._id}`)}
                >
                  {item?.Title}
                </div>
              }
              description={
                <div className="d-flex-sb">
                  <div
                    className="cursor-pointer"
                    onClick={() => navigate(`/comic/${item?._id}/chapter/${item?.Chapters?.length}`)}
                  >
                    <span className="mr-4">Chapter</span>
                    <span>{item?.Chapters?.length}</span>
                  </div>
                  <div className="d-flex-sb">
                    <span className="mt-5">{LstIcons.ICON_PREVIEW}</span>
                    <span className="ml-4">{item?.Reads}</span>
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </SpinCustom>
  )
}

export default HotComics
