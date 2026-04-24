import { AppSidebar } from './AppSidebar';

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div>
      <AppSidebar />
      <main>{children}</main>
    </div>
  );
}
