import styled from 'styled-components'
import { Affix } from 'antd'

export const StyledAffix = styled(Affix)`
  .ant-menu-item,
  .ant-menu-item > div {
    transition: background-color 0.2s ease !important;
  }
  .ant-menu-item:not(.ant-menu-item-only-child, .ant-menu-item-selected):hover,
  .ant-menu-item.ant-menu-item-only-child:not(.ant-menu-item-selected):hover div,
  .ant-menu-submenu-title:not(.ant-menu-submenu-selected):hover {
    color: rgba(0, 0, 0, 0.85);
    background-color: #f2f2f2;
  }
  .ant-menu-item.ant-menu-item-only-child:not(.ant-menu-item-selected):active {
    background-color: transparent;
  }
  .ant-menu-submenu-title {
    height: 44px !important;
    line-height: 44px !important;
    margin: 0;
  }
`
