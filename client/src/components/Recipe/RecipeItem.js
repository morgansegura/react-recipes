import React from "react"
import { Link } from "react-router-dom"

const RecipeItem = ({ _id, name, imageUrl, category, description, likes }) => (
    <div className="min-w-1/3">
        <Link
            to={`/recipes/${_id}`}
            className="relative bg-black flex flex-col rounded-lg overflow-hidden "
        >
            <img
                className="h-64 object-cover rounded-lg "
                src={imageUrl}
                alt={name}
            />
            <div className="absolute bottom-0 inset-x-0 w-full bg-gradient-to-t from-black p-4 flex">
                <div className="font-semibold text-white">{name}</div>
                <div className="inline-block rounded-md bg-gradient-to-r from-orange-400 to-orange-800 text-sm text-white py-2 px-3">
                    {category}
                </div>
                <div>{likes}</div>
            </div>
        </Link>
    </div>
)

export default RecipeItem
