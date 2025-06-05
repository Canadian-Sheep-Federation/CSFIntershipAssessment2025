"use client"
import Image from "next/image";
import {MdPlayArrow} from "react-icons/md";
import {FaArrowRight, FaCirclePlus} from "react-icons/fa6";

export default function Home() {

    const catImg = "https://cataas.com/cat/rynTlTM9SkeOjlTT/says/Hello?position=center&font=Impact&fontSize=50&fontColor=%23fff&fontBackground=none"

    const onSubmit = async (e) => {
        e.preventDefault()
    }
    return (
        <div className={"flex flex-col gap-4 items-center justify-center h-screen"}>
            <h1 className={"text-3xl"}>Register a new cat</h1>
            <form className={"bg-white p-6 rounded-lg shadow-md"} onSubmit={onSubmit}>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Choose a cat
                </label>
                <div className={"mb-8 flex flex-col gap-2"}>
                    <img className={"rounded-md"} height={300} width={300}
                         src={catImg} alt={"Cat photo"}/>
                    <button
                        className={"flex items-center gap-2 justify-center rounded-full cursor-pointer bg-blue-200 px-4 py-1"}>See
                        next <FaArrowRight/></button>
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
                    className={"flex items-center gap-2 justify-center rounded-full cursor-pointer text-white bg-blue-500 px-4 py-1"}>
                    <FaCirclePlus/> Save cat
                </button>
            </form>
        </div>
    );
}
