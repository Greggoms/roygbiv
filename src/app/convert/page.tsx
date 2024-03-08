import Link from "next/link";

import convertLinks from "@/lib/convert-links.json";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ConvertPage = () => {
  return (
    <main className="container mt-5 mb-10">
      <h1>Convert Colors</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {convertLinks.map((link) => (
          <Card key={link.label}>
            <Link
              href={link.url}
              className="block h-full hover:bg-accent/80 transition-colors"
            >
              <CardHeader>
                <CardTitle>{link.label}</CardTitle>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{link.example}</p>
              </CardContent>
              <CardFooter>
                {link.conversions.map((c, index) => (
                  <p key={index}>{c}</p>
                ))}
              </CardFooter>
            </Link>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default ConvertPage;
