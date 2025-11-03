import { Link } from "react-router-dom";
import propertiesData from "../data/properties.json";

export default function Properties() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {propertiesData.map((property) => (
          <Link
            key={property.id}
            to={`/properties/${property.id}`}
            className="block border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <img
              src={`/images/${property.image}`}  
              alt={property.title}
              className="w-full h-48 object-cover"  
              onError={(e) => { e.target.src = '/images/fallback.jpg'; }} 
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{property.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{property.location}</p>
              <p className="text-xl font-semibold text-blue-600 mb-2">
                GMD {property.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">{property.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}