"use client";
// to make it a client component 
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function addTopic(){
    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");

    const router = useRouter();
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!title ||!description){
            alert("Title and Description required!!")
            return ;
        }

        try {
            const res = await fetch('http://localhost:3000/api/topics',{
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                },
                body: JSON.stringify({title,description}),
            });
            if(res.ok){
                router.push('/');
                router.refresh();
            }
            else
            {
                throw new Error ("Failed to create a topic");
            }
        } catch (error) {
            console.log(error);
        }

    };



    return(
        <form  onSubmit={handleSubmit} flex flex-col gap-3>
            <input className="border border-slate-500 px-8 py-2" type="text" placeholder="Task Title"
            onChange={(e)=> setTitle(e.target.value)}
            value={title}>
            </input>
            <input className="border border-slate-500 px-8 py-2" type="text" placeholder="Task Description" 
            onChange={(e)=> setDescription(e.target.value)}
            value={description}>
            </input>
            <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">Add Task</button>
        </form>
    )
}