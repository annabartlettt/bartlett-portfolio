import PageHead from "@/components/PageHead";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main>
      <PageHead
        eyebrow="Contact"
        title="Get in touch."
        lede="For work, research, or collaboration."
      />
      <div className="rc-wrap rc-pagebody">
        <a
          className="rc-btn pink"
          href="mailto:anna.bartlettt@gmail.com"
        >
          Say hello →
        </a>
        <p className="mono mt-5 text-[12px] tracking-widest opacity-70">
          anna.bartlettt@gmail.com
        </p>
      </div>
    </main>
  );
}
