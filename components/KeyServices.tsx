

interface Service {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

interface KeyServicesProps {
  services: Service[];
}

export default function KeyServices({ services }: KeyServicesProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Key Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className={`${service.color} p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2`}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

