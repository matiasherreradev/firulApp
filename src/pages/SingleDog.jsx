import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function SingleDog() {
  const [dog, setDog] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchSingleDogData = async () => {
      try {
        const res = await fetch(
          `https://api.thedogapi.com/v1/breeds/search?q=${name}`
        );
        const data = await res.json();
        setDog(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleDogData();
  }, [name]);

  return (
    <>
      <section className="max-w-5xl mx-auto flex items-center justify-center h-screen">
        {dog.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:place-items-center"
          >

{/* IMAGEN DEL PERRO SELECCIONADO*/}

            <article>
              <img
                src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`}
                alt={item.name}
              />
            </article>
            <article>
              <h1 className="font-bold text-2xl md:text-3xl text-amber-900 lg:text-4xl mb-8">
                {item.name}
              </h1>
              {item.description && (
                <p className="text-slate-500 mb-6 text-sm lg:text-base leading-relaxed">
                  {item.description}
                </p>
              )}
              <h3 className="font-bold mb-4">Info:</h3>
              <ul className="text-sm leading-loose mb-4">
                <li>
                  <span className="font-bold">Bred for: </span> {item.bred_for}
                </li>
                <li>
                  <span className="font-bold"> Height:</span>{" "}
                  {item.height.metric} cm
                </li>
                <li>
                  <span className="font-bold">Weight: </span>
                  {item.weight.metric} kgs
                </li>
                <li>
                  <span className="font-bold">Breed Group:</span>{" "}
                  {item.breed_group}
                </li>
                <li>
                  <span className="font-bold">Lifespan:</span> {item.life_span}
                </li>
                <li>
                  <span className="font-bold">Temperament:</span>{" "}
                  {item.temperament}
                </li>
              </ul>

              <Link
                to="/"
                className="inline-block bg-amber-900 rounded-md px-4 py-1 text-white hover:bg-amber-800 transition-all duration-200"
              >
                {" "}
                &larr; Back
              </Link>
            </article>
          </div>
        ))}
      </section>
    </>
  );
}
