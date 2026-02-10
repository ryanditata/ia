import { newsData } from "@/constants/newsData";

export default function News() {
  return (
    <div className="bg-primary-900 py-12 lg:space-y-16" id="news">
      <div className="container space-y-8 text-center">
        <h2 className="text-xl font-bold text-white lg:text-3xl">
          News and Events
        </h2>
        <p className="text-sm text-neutral-200 lg:text-lg">
          Stay updated with our latest news and events. We are committed to
          providing up-to-date information about global academic collaborations.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsData.map((news, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 rounded-3xl bg-white p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold">{news.title}</h3>
              <p className="text-sm text-neutral-700">{news.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
