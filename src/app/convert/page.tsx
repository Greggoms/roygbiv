import ColorLinkCard from "@/components/convert/ColorLinkCard";
import convertLinks from "@/lib/convert-links";

const ConvertPage = () => {
  return (
    <main className="container mt-5 mb-10">
      <h1>Convert Colors</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {convertLinks.map((link) => (
          <ColorLinkCard key={link.label} link={link} />
        ))}
      </section>
    </main>
  );
};

export default ConvertPage;
