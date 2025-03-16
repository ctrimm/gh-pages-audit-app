interface HeaderProps {
  companyName: string;
  logo: string;
}

const Header = ({ companyName, logo }: HeaderProps) => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{logo}</span>
          <h1 className="text-xl font-semibold">{companyName}</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
