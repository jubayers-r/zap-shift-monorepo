const BenefitCard = ({ benefit }) => {
  const { title, description, image } = benefit;
  return (
    <div className="card bg-base-100 hover:shadow-md p-8 flex md:flex-row items-center gap-4 rounded-2xl">
      <div className="w-40 h-40 flex-shrink-0">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      <div className="border-l h-full mx-7 border-dashed" />
      <div className="space-y-3">
        <h3 className="text-2xl font-extrabold">{title}</h3>
        <p className="font-medium text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
