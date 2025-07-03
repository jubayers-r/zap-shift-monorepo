  import Marquee from "react-fast-marquee";

const companies = [
  { name: "amazon", logo: "/logos/amazon.png" },
  { name: "casio", logo: "/logos/casio.png" },
  { name: "moonstar", logo: "/logos/moonstar.png" },
  { name: "randstad", logo: "/logos/randstad.png" },
  { name: "start", logo: "/logos/start.png" },
  { name: "start-people 1", logo: "/logos/start-people 1.png" },
];

export default function TrustedCompaniesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center ">
        <h2 className="text-2xl md:text-3xl font-bold mb-20 text-[#03373D]">
          We've helped thousands of sales teams
        </h2>

        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={false}
          className="flex items-center"
        >
            <div className="flex gap-30">
          {companies.map((company, index) => (
              <img
              key={index}
                src={company.logo}
                alt={company.name}
                className=" w-auto transition duration-300"
              />
            ))}
            </div>
        </Marquee>
      </div>
    </section>
  );
}