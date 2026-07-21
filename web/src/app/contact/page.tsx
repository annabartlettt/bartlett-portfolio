export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <p className="mono text-xs tracking-widest opacity-70">CONTACT</p>
      <h1 className="display mt-4 text-4xl md:text-5xl">Get in touch.</h1>
      <p className="serif mt-6 text-xl italic opacity-85">
        For work, research, or collaboration.
      </p>
      <div className="mono mt-8 flex flex-col gap-2 text-sm">
        <a className="underline" href="mailto:anna.bartlettt@gmail.com">
          anna.bartlettt@gmail.com
        </a>
      </div>
    </main>
  );
}
