import { useState } from 'react';

function Contact() {
  const [message, setMessage] = useState('');

  return (
    <section className="contact">
      <h2>Contact Me</h2>

      <div className="contact-info">
        <p>Email: yourname@example.com</p>
        <p>Phone: +91 XXXXXXXXXX</p>
      </div>

      <textarea
        className="contact-textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
        rows="4"
      />
      <p>Character count: {message.length}</p>
    </section>
  );
}

export default Contact;