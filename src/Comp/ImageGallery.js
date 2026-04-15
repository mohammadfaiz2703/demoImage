import React, { useEffect, useState } from "react";

export default function ImageGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/images")
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-xl font-semibold mb-6 text-center">
        Image Gallery
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <img
            key={img._id}
            src={`http://localhost:5000/api/images/${img._id}`}
            alt="Uploaded"
            className="w-full h-40 object-cover rounded-lg shadow"
          />
        ))}
      </div>
    </div>
  );
}