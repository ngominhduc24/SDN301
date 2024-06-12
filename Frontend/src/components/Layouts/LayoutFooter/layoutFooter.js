import { Layout } from "antd"
import React from "react"
import LayoutAdmin from "../component/LayoutAdmin"
import Footer from "src/components/Footer"

const LayoutFooter = ({ children, menuAdmin, selectedKey, isAdmin }) => {
  const { Content } = Layout

  return (
    <Layout>
      <Content className="site-layout-background">
        {isAdmin ? (
          <>
            <LayoutAdmin
              children={children}
              menuAdmin={menuAdmin}
              selectedKey={selectedKey}
            />
          </>
        ) : (
          <>
            <div className="w-100 body-cl">{children}</div>
          </>
        )}
        {!isAdmin && <Footer />}
      </Content>
    </Layout>
  )
}

export default LayoutFooter
