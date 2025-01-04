import { useState, useRef, useEffect } from "react";
import { Hero } from "../types/hero";
import { Link } from "react-router-dom";
import { useMessages } from "../context/MessageContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const fetched = useRef(false);
  const {addMessage} = useMessages();

  useEffect(() => {
    if (!fetched.current) {
      fetch(`${apiUrl}/heroes?_limit=4`)
        .then((response) => response.json())
        .then((data) => {
          setHeroes(data);
          addMessage('Top Heroes loaded');
        });

      fetched.current = true;
    }
  }, [addMessage]);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl">Top Heroes</h2>
      <div className="flex gap-3">
        {heroes.map((hero) => (
          <Link
            key={hero.id}
            to={`/heroes/${hero.id}`}
            className="p-4 bg-slate-700 text-white rounded-lg cursor-pointer"
          >
            {hero.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
