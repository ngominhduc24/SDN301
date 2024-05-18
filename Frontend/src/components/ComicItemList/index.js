import { formatNumber } from "src/lib/stringUtils"
import LstIcons from "../ListIcons"

const ComicItemList = ({ comic }) => {
  return (
    <div className="cursor-pointer">
      <div style={{ position: 'relative' }}>
        <img style={{ width: '100%' }} src={comic?.AvatarPath} alt="" />
        <div
          className="infor-comic"
          style={{
            display: 'flex',
            padding: '4px 8px',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#000',
            opacity: '0.65',
            position: 'absolute',
            bottom: 2,
            left: 0,
            right: 0,
          }}
        >
          <p className="text-white d-flex-sb">
            {LstIcons.ICON_EYE}
            {formatNumber(comic?.Reads)}
          </p>
          <p className="text-white d-flex-sb">
            {LstIcons.ICON_LIKE}
            {formatNumber(comic?.Likes)}
          </p>
        </div>
      </div>
      <div className="fw-600">{comic?.Title}</div>
    </div >
  )
}

export default ComicItemList