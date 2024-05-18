import moment from "moment"

const NotificationItem = ({ data }) => {
  return (
    <div style={{ margin: '8px 0' }} className={data?.IsSeen ? "text-gray" : "text-black not-seen-notify"}>
      <p>
        {data?.Content}
      </p>
      <p>
        {moment(data.createdAt).calendar()}
      </p>
    </div>
  )
}

export default NotificationItem