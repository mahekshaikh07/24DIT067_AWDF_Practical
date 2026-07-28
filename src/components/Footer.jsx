function Footer({ email = 'yourname@example.com' }) {
  return (
    <footer className="footer">
      <p>Contact Us: {email}</p>
    </footer>
  );
}

export default Footer;