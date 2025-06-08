"use client";

import { FaArrowRight, FaCirclePlus, FaSpinner } from "react-icons/fa6";
import { FormEvent, useEffect, useState } from "react";
import { getCat } from "@/services/cataas.api";
import { z } from "zod";
import { Cat } from "@/data/types";
import { FaTrashAlt } from "react-icons/fa";

export default function Home() {
  const apiUrl = `http://localhost:${window.location.port || 3000}/api/cats`;

  const [catImg, setCatImg] = useState("");
  const [cats, setCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>(null);

  // Function to fetch a random cat image from the Cataas API
  const loadCat = () => {
    setIsLoading(true);
    getCat()
      .then((cat) => {
        setCatImg(cat.url);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  // Load a random cat image and fetch all cats when the component mounts
  useEffect(() => {
    loadCat();
    getAllCats();
  }, []);

  // Zod schema for form validation
  const formSchema = z.object({
    name: z.string().min(3, "Name is required"),
    age: z.number().min(1).max(40),
    weight: z.number().min(2).max(15),
    photoUrl: z.string(),
  });

  // Function to handle form validation
  // Returns an object with either errors or a success message
  const handleSubmit = (formData: FormData) => {
    const parsedData = formSchema.safeParse({
      name: formData.get("name"),
      photoUrl: formData.get("photoUrl"),
      age: Number(formData.get("age")),
      weight: Number(formData.get("weight")),
    });
    if (!parsedData.success) {
      return { errors: parsedData.error.format() };
    }
    return { message: "Form submitted successfully" };
  };

  // Function to handle form submission
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = handleSubmit(formData);

    if (result.errors) {
      // If there are validation errors, set them in the state
      setErrors(result.errors);
    } else {
      //save cat to Database
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);

      //Clear inputs
      // @ts-ignore
      e.target.reset();

      //display next cat
      loadCat();
      //Refresh cats list
      getAllCats();
    }
  };

  // Function to fetch all cats from the API
  const getAllCats = async () => {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch cats");
    }
    setCats(await response.json());
  };

  // Function to delete a cat by ID
  const deleteCat = async (id: number) => {
    if (!confirm("Are you sure you want to delete this cat?")) {
      return;
    }
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete cat");
    }
    alert((await response.json()).message);
    getAllCats();
  };

  return (
    <div className={"container flex gap-24 justify-center py-4"}>
      <div className={"flex flex-col gap-4"}>
        <form
          className={"bg-white p-6 rounded-lg shadow-md"}
          onSubmit={onSubmit}
        >
          <h1 className={"text-2xl mb-6"}>Register A New Cat</h1>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Choose a cat
          </label>
          <div className={"mb-8 fl flex flex-col gap-2"}>
            {catImg && (
              <img
                className={"rounded-md"}
                height={300}
                width={300}
                src={catImg}
                alt={"Cat photo"}
              />
            )}

            {!isLoading && (
              <button
                type={"button"}
                onClick={loadCat}
                className={
                  "flex items-center gap-2 justify-center rounded-full cursor-pointer bg-blue-200 px-4 py-1 hover:bg-blue-300"
                }
              >
                See next <FaArrowRight />
              </button>
            )}
            {isLoading && (
              <span
                className={
                  "flex items-center gap-2 justify-center rounded-full bg-blue-200 px-4 py-1"
                }
              >
                <FaSpinner /> Loading...
              </span>
            )}
            <input
              readOnly={true}
              hidden={true}
              name={"photoUrl"}
              value={catImg}
            />
          </div>

          <div className={"mb-4"}>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name *
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="name"
              placeholder="Enter cat's name"
            />
            {errors?.name && (
              <p className={"text-xs text-red-500"}>{errors.name._errors[0]}</p>
            )}
          </div>

          <div className={"mb-4"}>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age *
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              min={1}
              max={40}
              name="age"
              placeholder="Enter cat's age"
            />
            {errors?.age && (
              <p className={"text-xs text-red-500"}>{errors.age._errors[0]}</p>
            )}
          </div>

          <div className={"mb-4"}>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="weight"
            >
              Weight *
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              step={0.1}
              min={2}
              max={15}
              name="weight"
              placeholder="Weight in kg"
            />
            {errors?.weight && (
              <p className={"text-xs text-red-500"}>
                {errors.weight._errors[0]}
              </p>
            )}
          </div>

          <button
            type={"submit"}
            className={
              "flex items-center gap-2 justify-center  rounded-full cursor-pointer border-1 border-blue-500 text-blue-500 hover:text-white  hover:bg-blue-500 px-4 py-1 transition-all duration-300 ease-in-out"
            }
          >
            <FaCirclePlus /> Save cat
          </button>
        </form>
      </div>
      <div
        className={"flex flex-col items-center overflow-y-auto max-h-screen"}
      >
        <span className="text-3xl">My Cat's</span>
        <table className="table-auto mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Weight</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {cats.map((cat) => (
              <tr key={cat.id}>
                <td className="px-4 py-2">{cat.name}</td>
                <td className="px-4 py-2">{`${cat.age} yo`}</td>
                <td className="px-4 py-2">{`${cat.weight} kg`}</td>
                <td className="px-4 py-2 hover:pb-16 transition-all duration-300 ease-in-out">
                  <img
                    className="w-16 h-16 rounded-full object-cover scale-100 hover:scale-300 hover:z-10 transition-transform duration-300 ease-in-out "
                    src={cat.photo_url}
                  />
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => deleteCat(cat.id)} className="text-red-500 hover:text-red-700 cursor-pointer">
                    <FaTrashAlt size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
