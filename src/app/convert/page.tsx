import ColorLinkCard from "@/components/convert/ColorLinkCard";
import convertLinks from "@/lib/convert-links";

const ConvertPage = () => {
  return (
    <main className="container mt-5 mb-10">
      <h1>Convert Colors</h1>

      <section className="grid gap-5 items-start grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {convertLinks.map((link) => (
          <ColorLinkCard key={link.label} link={link} />
        ))}
      </section>
    </main>
  );
};

export default ConvertPage;
