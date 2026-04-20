import React, { useEffect, useState } from "react";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch("http://localhost:5000/api/upload/fetchall")
    .then(res => res.json())
    .then(data => {
      console.log(data); // 👈 LOOK HERE
      setImages(data);
    });
}, []);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/upload/fetchall");
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Failed to fetch images", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading images...</p>;
  }
// console.log(images)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Image Gallery
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img._id}
            className="bg-white rounded-lg shadow-sm p-2"
          >
            <img
              src={`data:image/jpeg;base64,${img.image}`}
              alt="uploaded"
              className="w-full h-40 object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}