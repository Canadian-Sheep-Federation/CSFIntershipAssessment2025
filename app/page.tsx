"use client"

import {FaArrowRight, FaCirclePlus, FaSpinner} from "react-icons/fa6";
import {FormEvent, useEffect, useState} from "react";
import {getCat} from "@/services/cataas.api";

export default function Home() {

    const [catImg, setCatImg] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const loadCat = () => {
        setIsLoading(true)
        getCat().then(cat => {
            setCatImg(cat.url)
            setIsLoading(false)
        }).catch(err => setIsLoading(false))

    }

    useEffect(() => {
        loadCat()
    }, [])

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()

    }

    return (
        <div className={"flex flex-col gap-4 items-center justify-center py-4"}>
            <form className={"bg-white p-6 rounded-lg shadow-md"} onSubmit={onSubmit}>
                <h1 className={"text-3xl mb-8"}>Register A New Cat</h1>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Choose a cat
                </label>
                <div className={"mb-8 flex flex-col gap-2"}>
                    {catImg && <img className={"rounded-md"} height={300} width={300}
                                    src={catImg} alt={"Cat photo"}/>}

                    {!isLoading && <button
                        type={"button"}
                        onClick={loadCat}
                        className={"flex items-center gap-2 justify-center rounded-full cursor-pointer bg-blue-200 px-4 py-1"}>See
                        next <FaArrowRight/></button>}
                    {isLoading && <span
                        className={"flex items-center gap-2 justify-center rounded-full bg-blue-200 px-4 py-1"}><FaSpinner/> Loading...</span>}
                </div>

                <div className={"mb-4"}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text" id="name" placeholder="Enter cat's name"/>
                </div>

                <div className={"mb-4"}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                        Age
                    </label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="number" min={0} max={40} id="age" placeholder="Enter cat's age"/>
                </div>

                <div className={"mb-4"}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                        Weight
                    </label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="number" step={0.1} min={2} max={15} id="weight" placeholder="Weight in kg"/>
                </div>
                <button
                    type={"submit"}
                    className={"flex items-center gap-2 justify-center rounded-full cursor-pointer text-white bg-blue-500 px-4 py-1"}>
                    <FaCirclePlus/> Save cat
                </button>
            </form>
        </div>
    );
}
