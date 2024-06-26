import Header from "./Header";
import Footer from "./Footer";

import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto flex flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
