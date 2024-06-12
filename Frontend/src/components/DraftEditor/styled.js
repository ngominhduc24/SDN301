import styled from 'styled-components'

export const WrapEditor = styled.div`
  .rdw-option-active {
    border: 1px solid #595959;
    background-color: #d9d9d9;
  }
  .rdw-colorpicker-modal {
    width: 210px;
    .rdw-colorpicker-modal-options {
      overflow-x: hidden;
    }
  }
  .rdw-link-modal {
    height: 220px;
  }
  .rdw-emoji-modal {
    width: 212px;
  }
  .rdw-fontsize-dropdown {
    min-width: 50px;
  }
  .DraftEditor-root {
    top: -12px;
  }
  .rdw-editor-main {
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
      background: #c5ced9;
      border-radius: 30px;
    }
  }
`
