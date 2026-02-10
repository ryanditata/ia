import { cooperationTypes } from "@/constants/cooperationTypes";

export default function Type() {
  return (
    <div className="bg-primary-900 w-full py-16" id="collaboration-types">
      <div className="container space-y-8 text-center lg:space-y-12">
        <h2 className="text-xl font-bold text-white lg:text-3xl">
          Types of Collaboration
        </h2>
        <p className="text-sm text-neutral-200 lg:text-lg">
          We offer various types of collaborations open to students from
          universities around the world. Each collaboration type is designed to
          provide a unique and enriching learning experience.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cooperationTypes.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 rounded-3xl bg-white p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <img src={item.image} alt={item.title} className="w-3xs" />
              <p className="text-sm text-neutral-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
