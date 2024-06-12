import styled from "styled-components"

export const ButtonUploadStyle = styled.div`
  .account-button-upload {
    border-radius: 4px;
    padding: 2px !important;
    height: unset !important;
    border: 2px dashed #e1e1e1;
    .account-text-upload {
      font-weight: 600;
      font-size: 12px;
      line-height: 120%;
      color: #154398;
    }
    .account-background-upload {
      background: #f7f7f7;
      border-radius: 4px;
      justify-content: center;
      align-items: center;

      padding: 4px 15px;
    }
    :hover {
      border: 1px solid #154398;
      background-color: #154398;

      .account-background-upload {
        background-color: transparent;
        border: 1px dashed transparent;
      }
      .account-text-upload {
        color: #fff;
      }
    }
  }
`
export const AddRoleStyled = styled.div`
  .add-role-title {
    ::before {
      content: "*";
      color: #ed1117;
      margin-right: 3px;
    }
    color: #212529;
    font-weight: 600;
  }
`
export const RoleItemStyled = styled.div`
  background: #f4f6fb;
  border-radius: 8px;
  padding: 16px;
`

export const ListUserStyled = styled.div`
  .ant-anchor-wrapper {
    max-height: unset !important;
    overflow: unset;
  }

  .ant-anchor-ink {
    position: unset;
  }
`

export const ImportStyled = styled.div`
  .ant-upload-drag {
    background: #edf6fc;
    /* main color */

    border: 1px dashed #154398;
    border-radius: 5px;
  }
  .box-note {
    background: #fffde7;
    /* cam */

    border: 1px solid #f88c00;
    border-radius: 5px;
    padding: 10px 20px;
    margin: 30px 0px;
  }
`
export const TreeAnchorStyled = styled.div`
  position: sticky;
  top: -12px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 10px;
  overflow: hidden auto;
  padding: 10px;
  height: calc(100vh - 52px);
  margin-top: 10px;
  .ant-tree-indent-unit {
    width: 15px;
  }
  .block-node {
    color: #ed1117 !important;
  }
  .div-all {
    position: relative;
    padding-top: 6px;
    :hover {
      .float-action__wrapper {
        display: flex;
      }
    }
    .float-action__wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      display: none;
    }
  }
  .list-button-tree-hover {
    display: none;
  }
  .ant-tree-treenode {
    width: 100%;
    :hover {
      .list-button-tree-hover {
        display: flex;
      }
    }
  }
  .ant-tree-node-content-wrapper {
    flex: auto;
    width: 0px;
  }
  .ant-anchor-link {
    padding: 4px 0 4px 0px !important;
    width: 100%;
  }
  .ant-tree-switcher {
    align-self: unset;
  }
  .ant-tree-node-selected,
  .ant-tree-node-content-wrapper:hover {
    background-color: transparent !important;
  }
  .ant-tree-node-selected .ant-tree-title {
    color: #333;
    font-weight: 600;
  }
  .ant-anchor-link-active > .ant-anchor-link-title {
    color: #333 !important;
    font-weight: 600;
    /* background-color: #ddd; */
  }
  .ant-anchor-link-title {
    color: #333;
  }
  .ant-tree-treenode {
    align-items: baseline;
    &:hover {
      .list-button {
        display: flex;
        background: #fff;
        .btn-add {
          color: ${({ theme }) => theme.white};
        }
        .btn-edit {
          color: ${({ theme }) => theme.white};
        }
        .btn-delete {
          color: ${({ theme }) => theme.red500Color};
        }
      }
    }
  }

  .list-button {
    display: none;
  }

  .ant-tree-treenode-selected {
    /* background-color: var(--color-primary); */
    /* color: #fff; */
  }
`

export const SearchStyled = styled.div`
  background: #fff;
  margin-bottom: 10px;
`
