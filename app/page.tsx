"use client";

import { FaArrowRight, FaCirclePlus, FaSpinner } from "react-icons/fa6";
import { FormEvent, useEffect, useState } from "react";
import { getCat } from "@/services/cataas.api";
import { z } from "zod";

export default function Home() {
  const [catImg, setCatImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>(null);

  const loadCat = () => {
    setIsLoading(true);
    getCat()
      .then((cat) => {
        setCatImg(cat.url);
        setIsLoading(false);
      })
      .catch((err) => setIsLoading(false));
  };

  useEffect(() => {
    loadCat();
  }, []);

  const formSchema = z.object({
    name: z.string().min(3, "Name is required"),
    age: z.number().min(1).max(40),
    weight: z.number().max(15).nullable(),
    photoUrl: z.string(),
  });

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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = handleSubmit(formData);

    if (result.errors) {
      setErrors(result.errors);
    } else {
      //save cat to Database
      const response = await fetch("http://localhost:3000/api/cats", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);

      //Clear inputs
      e.target.reset();

      //display next cat
      loadCat();
    }
  };

  return (
    <div className={"flex flex-col gap-4 items-center justify-center py-4"}>
      <form className={"bg-white p-6 rounded-lg shadow-md"} onSubmit={onSubmit}>
        <h1 className={"text-3xl mb-8"}>Register A New Cat</h1>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Choose a cat
        </label>
        <div className={"mb-8 flex flex-col gap-2"}>
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
            Weight
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
            <p className={"text-xs text-red-500"}>{errors.weight._errors[0]}</p>
          )}
        </div>

        <button
          type={"submit"}
          className={
            "flex items-center gap-2 justify-center rounded-full cursor-pointer border-1 border-blue-500 text-blue-500 hover:text-white  hover:bg-blue-500 px-4 py-1"
          }
        >
          <FaCirclePlus /> Save cat
        </button>
      </form>
    </div>
  );
}
