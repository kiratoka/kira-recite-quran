
interface JsonLdProps {
  /**
   * Data struktur JSON-LD yang valid sesuai standar schema.org.
   * Disarankan untuk menyertakan "@context": "https://schema.org" di dalam objek ini.
   */
  schema: Record<string, any>;
}

/**
 * Komponen reusable untuk menyuntikkan JSON-LD Structured Data di Next.js.
 * Komponen ini aman digunakan di Server Components (RSC) maupun Client Components.
 */
export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
