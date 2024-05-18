import React, { useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

// ANONYMOUS
const AnonymousRoutes = React.lazy(() =>
  import("./pages/ANONYMOUS/AnonymousRoutes")
);

const HomePage = React.lazy(() => import("./pages/ANONYMOUS/HomePage"));

function LazyLoadingComponent({ children }) {
  return (
    <React.Suspense
      fallback={
        <div
          className="loading-center"
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
          }}
        >
          Loading...
        </div>
      }
    >
      {children}
    </React.Suspense>
  );
}

const routes = [
  // ANONYMOUS
  {
    element: (
      <LazyLoadingComponent>
        <AnonymousRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: "/",
        element: (
          <LazyLoadingComponent>
            <HomePage />
          </LazyLoadingComponent>
        ),
      },
    ],
  },
];

const App = () => {
  const appRoutes = useRoutes(routes);

  return (
    <>
      <div>{appRoutes}</div>
    </>
  );
};

export default App;
