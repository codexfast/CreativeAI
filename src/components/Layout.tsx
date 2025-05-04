import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container justify-center mx-auto py-5 px-2">
          <Outlet />
        </main>
        <Footer />
      </div>
  );
}