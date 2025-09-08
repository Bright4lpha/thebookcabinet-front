import React from "react";
import { BookType } from "../../types/types";

type Props = BookType;

export const Book: React.FC<Props> = ({ id, title, author, genre, url_image, isbn }) => {
    return (
        <div className="antialiased text-gray-900 ">
            <div className="p-2 flex items-center justify-center">
                <div className="bg-white rounded-lg overflow-hidden shadow-2xl xl:w-1/2 lg:w-1/4 md:w-1/3 sm:w-1/2">
                    <img
                        className="h-70 w-full object-cover object-end"
                        src={url_image ? url_image : "https://placehold.co/660x1000"}
                        alt="Home in Countryside"
                    />
                    <div className="p-6">
                        <div className="flex items-baseline">
                            {genre ? genre.map((g) => (
                                <span
                                    key={g}
                                    className="inline-block bg-gray-200 text-gray-800 py-1 px-2 mr-2 mb-2 text-xs rounded-full uppercase font-semibold tracking-wide"
                                >
                                    {g}
                                </span>
                            )) : null}
                        </div>
                        <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
                            {title}
                        </h4>

                        <div className="mt-1">
                            <span>{author}</span>
                        </div>

                        <div className="mt-1">
                            <span>{isbn}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;
