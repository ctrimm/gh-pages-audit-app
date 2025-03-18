interface FooterProps {
  variant?: 'marketing' | 'dashboard';
}

const Footer = ({ variant = 'dashboard' }: FooterProps) => {
  if (variant === 'marketing') {
    return (
      <footer className="bg-background border-t mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <img src="https://ctrimm.github.io/gh-pages-audit-app/logo.png" alt="Inspired Hospitality Audit Tool" className="h-8 w-auto" />
              <p className="text-sm text-muted-foreground">
                Elevating hospitality standards through digital excellence in auditing and service quality management.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Solutions</li>
                <li>Success Stories</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Documentation</li>
                <li>Best Practices</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Security</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Inspired Hospitality. All rights reserved.</p>
            <p className="mt-2">Empowering excellence in hospitality service.</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-background border-t mt-auto">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Inspired Hospitality
        </div>
        <div className="text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
          <span className="mx-2">•</span>
          <a href="#" className="hover:text-foreground">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
