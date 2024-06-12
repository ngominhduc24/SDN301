import React, { useState } from "react"

export const StoreContext = React.createContext(null)

export default function StoreProvider({ children }) {
  const [user, setUser] = useState({})
  const [spvObj, setSpvObj] = useState({})
  const [ucObj, setUcObj] = useState({})
  const [collapsed, setCollapsed] = useState(false)
  const [listTab, setListTab] = useState(null)
  const [tabSelect, setTabSelect] = useState(null)
  const [routerBeforeLogin, setRouterBeforeLogin] = useState()
  const [isModelNotification, setIsModelNotification] = useState(false)

  const store = {
    tabStore: [tabSelect, setTabSelect],
    userStore: [user, setUser],
    spvStore: [spvObj, setSpvObj],
    ucStore: [ucObj, setUcObj],
    collapsedStore: [collapsed, setCollapsed],
    listTabStore: [listTab, setListTab],
    routerStore: [routerBeforeLogin, setRouterBeforeLogin],
  }
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
