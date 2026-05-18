import { useState } from "react";

export default function StarAvaliation({ value, onChange }) {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="flex flex-row gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className="text-[50px] lg:text-[170px] cursor-pointer transition-transform duration-150 hover:scale-125"
                    style={{ color: star <= (hovered || value) ? "#F59E0B" : "#ccc",
                            filter: star <= (hovered || value) ? "drop-shadow(0 0 6px #F59E0B)" : "none"
                     }}
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(null)}
                >
                    ★
                </span>
            ))}
        </div>
    );
}