import {
  AiFillEdit,
  AiFillHeart,
  AiOutlineBarChart,
  AiFillBell,
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillEye,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiOutlineInstagram,
  AiFillWarning,
  AiFillDatabase,
} from "react-icons/ai"

import {
  BsFillTrash3Fill,
  BsFillTagsFill,
  BsFillInfoCircleFill,
  BsMenuButtonWide,
} from "react-icons/bs"

import {
  TbLock,
  TbLockOpen,
  TbCategoryFilled
} from "react-icons/tb"

import {
  FaUsers,
  FaBookReader,
  FaUser,
  FaHome,
  FaMoneyCheckAlt
} from "react-icons/fa"

import {
  BiLogIn,
  BiMessageRoundedDetail
} from "react-icons/bi"

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  CloseOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons"

import { CgSandClock } from "react-icons/cg"

const LstIcons = {
  ICON_EDIt: <AiFillEdit className="text-green fs-18" />,
  ICON_DELETE: <BsFillTrash3Fill className="text-red fs-18" />,
  ICON_BELL: <AiFillBell className="fs-20" style={{ color: "white" }} />,
  ICON_SEARCH: <SearchOutlined className="text" />,
  ICON_CLOSE: <CloseOutlined className="text" />,
  ICON_CARET_UP: <CaretUpOutlined />,
  ICON_CARET_DOWN: <CaretDownOutlined />,
  ICON_BLOCK: <TbLock className="fs-18" />,
  ICON_UNBLOCK: <TbLockOpen className="fs-18" />,
  ICON_STATISTIC: <AiOutlineBarChart className="fs-18" />,
  ICON_USER_MANAGEMENT: <FaUsers className="fs-18" />,
  ICON_GENRES: <TbCategoryFilled className="fs-18" />,
  ICON_COMIC: <FaBookReader className="fs-18" />,
  ICON_CONFIRM: <AiFillCheckCircle className="fs-18 active-green" />,
  ICON_CLOSE_RED: <AiFillCloseCircle className="fs-18 text-red" />,
  ICON_LOGOUT: <BiLogIn className="fs-20" />,
  ICON_MENUFOLD: <MenuFoldOutlined />,
  ICON_MENUUNFOLD: <MenuUnfoldOutlined />,
  ICON_PREVIEW: <AiFillEye className="fs-20" />,
  ICON_PENDING_CONFIRM: <CgSandClock style={{ color: "#01638D", fontSize: "20px" }} />,
  ICON_EYE: <AiFillEye className="fs-15 mr-4" />,
  ICON_LIKE: <AiFillHeart className="fs-15 mr-4 text-white mt-4" />,
  ICON_USER: <FaUser />,
  ICON_TAGS: <BsFillTagsFill />,
  ICON_INFOR: <BsFillInfoCircleFill className="fs-20 mr-4" />,
  ICON_MENU: <BsMenuButtonWide className="fs-18 mr-4" />,
  ICON_HOME: <FaHome className="fs-28" />,
  ICON_FACEBOOK: <AiFillFacebook style={{ fontSize: "25px", color: "#1773EA" }} />,
  ICON_TWITTER: <AiFillTwitterCircle style={{ fontSize: "25px", color: "#4DA6E9" }} />,
  ICON_INSTARGRAM: <AiOutlineInstagram style={{ fontSize: "25px", color: "#E4176A" }} />,
  ICON_WARNING: <AiFillWarning style={{ fontSize: "15px", color: "#F0AD4E" }} />,
  ICON_MESSAGE: <BiMessageRoundedDetail className="fs-25 mt-6" />,
  ICON_PREMIUM: <AiFillDatabase />,
  ICON_CHECK: <AiFillCheckCircle />,
  ICON_PAYMENT: <FaMoneyCheckAlt />
}

export default LstIcons
