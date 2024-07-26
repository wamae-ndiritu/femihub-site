import TopNav from "./components/TopNav";
import TopNav from "./components/Mainn";

const Layout = ({ children }) => (
  <>
    <div className="px-2 md:px-[100px] mt-2">
      <TopNav />
      <MainNavbar />
      {children}
    </div>
    <div className="fixed bottom-0">
      <Footer />
    </div>
  </>
);

export default Layout;
