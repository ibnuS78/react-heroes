import { useRef, useState, useEffect } from "react";
import { Hero } from "../types/hero";
import { Link } from "react-router-dom";
import { useMessages } from "../context/MessageContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function HeroesList() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const fetched = useRef(false);
  const {addMessage} = useMessages();

  useEffect(() => {
    if (!fetched.current) {
      fetch(`${apiUrl}/heroes`)
        .then((response) => response.json())
        .then((data) => {
            setHeroes(data);
            addMessage('Hero List Loaded');
        });

      fetched.current = true;
    }
  }, [addMessage]);

  async function deleteHero(hero:Hero) {
    try {
      const request = await fetch(`${apiUrl}/heroes/${hero.id}`,{
        method: 'DELETE'
      });

      if(!request.ok)
        throw new Error(`Failed to delete Hero ${request.statusText}`);

      setHeroes(prevheroes => (prevheroes.filter( h => h.id !== hero.id)));
      addMessage(`Hero ${hero.name} deleted`);
    } catch (error) {
      console.log(error);
      addMessage('Failed to delete Hero');
    }
  }

  return (
    <>
    <div className="flex gap-3">
    <h2 className="text-2xl ">My Heroes</h2>
    <Link to='/heroes/create'>
    <button className="btn">Create New</button>
    </Link>
    </div>
      <ul className="flex flex-col gap-2 my-3">
        {heroes.map((hero) => (
          <Link
            to={`/heroes/${hero.id}`}
            key={hero.id}
            className="flex cursor-pointer"
          >
            <span className="bg-slate-700 text-white rounded-l p-2">
              {hero.id}
            </span>
            <div className="p-2 bg-slate-300 rounded-r w-full flex justify-between">
            <span >
              {hero.name}
            </span>
            <span onClick={(e) => {
              e.preventDefault();
              deleteHero(hero);
            }}
            className="bg-white px-1 cursor-pointer">
                X
            </span>
            </div>
            
          </Link>
        ))}
      </ul>
    </>
  );
}
