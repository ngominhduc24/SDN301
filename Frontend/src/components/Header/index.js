// import { useLocation, useNavigate } from "react-router-dom";
// import DropdownProfile from "../../DropdownProfile";
// import PopoverMain from "../../PopoverMain";
// import {
//   HeaderContainerStyled,
//   HeaderStyled,
//   InputHeaderStyled,
// } from "./styled";
// import LstIcons from "src/components/ListIcons";
// import { useSelector } from "react-redux";
// import { globalSelector } from "src/redux/selector";
// import ButtonCustom from "../ButtonCustom/MyButton";
// import { useState } from "react";

// const MainHeader = () => {
//   const navigate = useNavigate();
//   const global = useSelector(globalSelector);
//   const [textSearch, setTextSearch] = useState("");

//   return (
//     <HeaderContainerStyled>
//       <HeaderStyled>
//         <div className="d-flex-sb">
//           <div className="d-flex-sb">
//             <img
//               style={{ width: "70px", height: "70px" }}
//               src="Lire Le Logo Du Livre _ Vecteur Premium (1).png"
//               alt=""
//               onClick={() => {
//                 setTextSearch("");
//                 navigate("/");
//               }}
//             />
//             {global?.user?.RoleID !== 1 && (
//               <>
//                 <PopoverMain />
//                 <InputHeaderStyled
//                   showSearch
//                   allowClear={{ clearIcon: LstIcons.ICON_CLOSE }}
//                   value={textSearch}
//                   onChange={(e) => setTextSearch(e.target.value)}
//                   suffix={
//                     <ButtonCustom
//                       icon={LstIcons.ICON_SEARCH}
//                       onClick={() => navigate(`/search?query=${textSearch}`)}
//                     />
//                   }
//                   placeholder="Search by title, author, or keyword"
//                   size="large"
//                 />
//               </>
//             )}
//           </div>
//           <div>
//             <DropdownProfile />
//           </div>
//         </div>
//       </HeaderStyled>
//     </HeaderContainerStyled>
//   );
// };

// export default MainHeader;
