const WHATSAPP_LINK =
  "https://wa.me/917978738674?text=Hello,%20I%20would%20like%20to%20know%20more%20about%20MYRA'S%20INNOVATION%20CHALLENGE%202026";

export default function WhatsAppButton() {
  return (
    <div className="whatsapp-float">
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="whatsapp-float__link"
      >
        <span className="whatsapp-float__tooltip">Chat with Us on WhatsApp</span>
        <img
          src="/b7612340c7bc49978a2d21bffeecd2f1.png"
          alt="WhatsApp Contact"
          className="whatsapp-float__icon"
        />
      </a>
    </div>
  );
}
