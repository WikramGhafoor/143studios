export default function About() {
  return (
    <section
      id="about"
      className="bg-black px-4 py-20 sm:px-6 md:py-24"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="break-words text-4xl font-black text-white sm:text-5xl">
          About <span className="text-red-600">143 Studios</span>
        </h2>

        <p className="mx-auto mt-8 max-w-4xl break-words text-base leading-8 text-gray-400 sm:text-lg">
          143 Studios Is An Independent Registered Music Company Based In
          Pakistan, Dedicated To Building Artists, Developing Original Music
          And Delivering Professional Digital Entertainment Solutions
          Worldwide.
        </p>

        <p className="mx-auto mt-6 max-w-4xl break-words text-base leading-8 text-gray-400 sm:text-lg">
          From Song Writing And Music Production To Recording, Distribution,
          Publishing, Promotion And Visual Content, We Provide Complete
          Creative Support For Artists Under One Platform.
        </p>
      </div>
    </section>
  );
}