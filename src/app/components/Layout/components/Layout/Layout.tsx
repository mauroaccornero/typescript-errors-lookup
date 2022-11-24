import { ReactNode } from "react";
import { Header, Footer } from "../index";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <main className="flex flex min-h-screen flex-col bg-slate-100">
      <Header />
      <section className="container mx-auto px-4">{children}</section>
      <Footer />
    </main>
  );
};

export default Layout;
