export default function Contact() {
  return (
    <div className="container bg-white py-12 lg:space-y-16" id="contact">
      <div className="space-y-8 text-center">
        <h2 className="text-xl font-bold lg:text-3xl">Contact Us</h2>
        <p className="text-sm text-neutral-700 lg:text-lg">
          If you have any questions or need further information, feel free to
          reach out to us.
        </p>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full rounded-lg border border-gray-300 p-2"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full rounded-lg border border-gray-300 p-2"
          />
          <textarea
            placeholder="Your Message"
            className="w-full rounded-lg border border-gray-300 p-2"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-white"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
