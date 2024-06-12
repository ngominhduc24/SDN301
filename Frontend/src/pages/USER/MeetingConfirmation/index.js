import { useState } from "react"
import LayoutCommon from "src/components/Common/Layout"
import MeetConfirmation from "./components/MeetConfirmation"
import { MeetingConfirmationStyle } from "./styles"
import NotifyDetail from "./components/NotifyDetail"
import { useLocation } from "react-router-dom"
const MeetingConfirmation = () => {
  const [loading, setLoading] = useState(false)
  const { state } = useLocation()
  return (
    <LayoutCommon>
      <MeetingConfirmationStyle>
        <div
          className="d-flex-center fw-600 fs-18 mt-8 "
          style={{
            color: "#3F51B5",
          }}
        >
          Thông báo
        </div>
        {state?.Type === 3 && <MeetConfirmation setLoading={setLoading} />}
        {state?.Type === 4 && <NotifyDetail data={state?.data} />}
      </MeetingConfirmationStyle>
    </LayoutCommon>
  )
}

export default MeetingConfirmation
