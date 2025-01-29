type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <main className="max-w-sm w-full mx-auto mt-56">{children}</main>
);

export default Layout;
