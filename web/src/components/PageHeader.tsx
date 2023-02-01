export const PageHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="flex page-header">{children}</div>;
};
