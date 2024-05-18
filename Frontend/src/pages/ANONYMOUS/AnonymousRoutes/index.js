import { Navigate, Outlet, useLocation } from "react-router-dom";
import MainLayout from "../../../components/Layout/MainLayout";
const AnonymousRoutes = () => {
  return (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
};

export default AnonymousRoutes;
