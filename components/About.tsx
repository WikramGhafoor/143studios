import { getSitePage } from "@/lib/site-pages";

type HomepageAboutContent = {
  about_title_prefix?: string;
  about_title_highlight?: string;
  about_paragraph_one?: string;
  about_paragraph_two?: string;
};

const defaultContent = {
  about_title_prefix: "About",
  about_title_highlight: "143 Studios",
  about_paragraph_one:
    "143 Studios Is An Independent Registered Music Company Based In Pakistan, Dedicated To Building Artists, Developing Original Music And Delivering Professional Digital Entertainment Solutions Worldwide.",
  about_paragraph_two:
    "From Song Writing And Music Production To Recording, Distribution, Publishing, Promotion And Visual Content, We Provide Complete Creative Support For Artists Under One Platform.",
};

export default async function About() {
  const savedContent =
    await getSitePage("homepage");

  const content = {
    ...defaultContent,
    ...(savedContent as HomepageAboutContent | null),
  };

  return (
    <section
      id="about"
      className="bg-black px-4 py-20 sm:px-6 md:py-24"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="break-words text-4xl font-black text-white sm:text-5xl">
          {content.about_title_prefix}{" "}
          <span className="text-red-600">
            {content.about_title_highlight}
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-4xl break-words text-base leading-8 text-gray-400 sm:text-lg">
          {content.about_paragraph_one}
        </p>

        <p className="mx-auto mt-6 max-w-4xl break-words text-base leading-8 text-gray-400 sm:text-lg">
          {content.about_paragraph_two}
        </p>
      </div>
    </section>
  );
}
