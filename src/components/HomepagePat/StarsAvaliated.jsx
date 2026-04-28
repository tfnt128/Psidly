import { useState } from "react";

export default function StarAvaliated({ starQtde }) {

    return (
        <div className="flex flex-row gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className="text-[50px] lg:text-[170px] cursor-pointer transition-transform duration-150 hover:scale-125"
                    style={{ color: star <= starQtde ? "#F59E0B" : "#ccc",
                            filter: star <= starQtde ? "drop-shadow(0 0 6px #F59E0B)" : "none"
                     }}
                >
                    ★
                </span>
            ))}
        </div>
    );
}