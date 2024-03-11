export default function Home() {
  return (
    <main className="container mt-5 mb-10 flex flex-col gap-y-5">
      <h1 className="text-3xl">Color Converter</h1>

      <p>
        Every now and then I need a color conversion utility. Most sites that
        exist for this either don&apos;t support many formats or are riddled
        with advertisements.
      </p>

      <p>
        The colors are converted using the{" "}
        <a
          href="https://github.com/ilariaventurini/colors-convert"
          className="text-sky-600 dark:text-sky-500 underline underline-offset-4 hover:no-underline"
        >
          colors-convert
        </a>{" "}
        package.
      </p>
    </main>
  );
}
