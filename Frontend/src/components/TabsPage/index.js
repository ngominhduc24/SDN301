import TabPageIcon from "src/assets/images/common-icon/tabPageIcon.png"
import { TabsPageStyle } from "./styeld"
import { useState } from "react"
import { useEffect } from "react"
import { Tabs } from "antd"

const TabsPage = ({ items, ...props }) => {
  const [listTab, setListTab] = useState(items)
  useEffect(() => {
    setListTab(
      items.map(i => ({
        ...i,
        label: (
          <div key={i?.key} className={`tabs-item`}>
            <img width={40} src={TabPageIcon} alt="" />
            <div>{i?.label}</div>
          </div>
        ),
      })),
    )
  }, [items])
  return (
    <TabsPageStyle>
      <Tabs defaultActiveKey={items[0].key} {...props} items={listTab} />
    </TabsPageStyle>
  )
}

export default TabsPage
