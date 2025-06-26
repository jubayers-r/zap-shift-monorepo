export default function ServiceCard({ service }) {
    const {icon, title, description} = service;

  return (
    <div className="card bg-base-200 shadow-md hover:shadow-lg hover:bg-[#caeb66] transition duration-300 p-8 rounded-3xl">
      <div className="card-body items-center text-center">
        <div className="text-4xl text-primary mb-4">{icon}</div>
        <h3 className="card-title text-xl font-bold text-[#03373D]">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}