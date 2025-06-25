import DOMPurify from "isomorphic-dompurify";

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  const safeHtml = DOMPurify.sanitize(description, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      "p",
      "br",
      "b",
      "i",
      "strong",
      "em",
      "u",
      "ul",
      "ol",
      "li",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "a",
      "img",
      "blockquote",
      "pre",
      "code",
      "hr",
      "table",
      "thead",
      "tbody",
      "tr",
      "td",
      "th",
      "figure",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "target", "rel"],
  });

  return (
    <section className="flex flex-col space-y-4 p-4 sm:p-6 shadow-sm">
      <h1 className="text-5xl font-semibold mb-4 text-gray-900">
        Descripción del producto
      </h1>

      <div
        className="custom-prose"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </section>
  );
};

export default ProductDescription;
