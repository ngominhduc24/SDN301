import { DatePicker } from "antd"
import { useDispatch } from "react-redux"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import SvgIcon, { ListIcon } from "src/components/SvgIcon"
// import { decrement, increment } from "src/redux/counterSlice"
import styled from "styled-components"

const IconWrapper = styled.span`
  z-index: 2;

  svg {
    width: auto;
    height: auto;
  }
`
const SvgViewer = () => {
  // const count = useSelector(state => state?.counter?.value)
  const dispatch = useDispatch()
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        paddingBottom: 50,
        // overflow: "auto",
        // height: "100vh",
      }}
    >
      {ListIcon.map(ele => (
        <IconWrapper>
          <SvgIcon name={ele} />
          <span>{ele}</span>
        </IconWrapper>
      ))}
      {/* <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/HSOtku1j600"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <ReactPlayer
        url="https://media.dthtayninh.xyz/1,321bdd23323f2230"
        width="500px"
        height="315px"
        controls={true}
      />
      <ReactPlayer
        url="https://media.dthtayninh.xyz/1,321bdd23323f2230"
        width="500px"
        height="315px"
        controls={true}
      />
      <ReactPlayer
        url="https://media.dthtayninh.xyz/1,321bdd23323f2230"
        width="500px"
        height="315px"
        controls={true}
      /> */}
      <div>
        <div>
          <button
            aria-label="Increment value"
            // onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          {/* <span>{count}</span> */}
          <button
            aria-label="Decrement value"
            // onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
      <DatePicker picker="month" label="Chọn tháng" />
      <FlDatePicker ranger />
    </div>
  )
}

export default SvgViewer
