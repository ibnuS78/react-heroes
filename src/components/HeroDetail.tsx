import React, { ChangeEvent, useEffect, useRef } from "react";
import { Hero } from "../types/hero";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMessages } from "../context/MessageContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function HeroDetail() {
  const [hero, setHero] = useState<Hero | null>(null);
  const params = useParams();

  const {addMessage} = useMessages();
  const fetched = useRef(false);

  useEffect(() => {
    if (!fetched.current) {
      fetch(`${apiUrl}/heroes/${params.id}`)
        .then((response) => response.json())
        .then((data) => {
          setHero(data);
          addMessage(`Hero ${data.name} Loaded`);
        });
      fetched.current = true;
    }
  }, [params.id, addMessage]);

  if (!hero) return null;

  const handleNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setHero({ ...hero, name: event.target.value });
  };
  return (
    <>
      <h2 className="text-2xl">Details</h2>
      <div>
        <span className="font-bold">ID:</span>
        {hero.id}
      </div>
      <div className="space-x-2">
        <span className="font-bold">Name:</span>
        <span className="uppercase">{hero.name}</span>
      </div>
      <div className="flex flex-col gap-2 mt-3 border-t">
        <label>Hero Name</label>
        <input
          type="text"
          placeholder="Hero Name"
          className="border border-gray-300 rounded-lg p-2 w-1/4"
          value={hero.name}
          onChange={handleNameChanged}
        ></input>
      </div>
    </>
  );
}
