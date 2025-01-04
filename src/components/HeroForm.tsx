/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FormEvent } from "react";
import { Hero } from "../types/hero";
import { useMessages } from "../context/MessageContext";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

type Props = {
  hero?: Hero;
  setHero?: (hero: Hero) => void;
};

export default function HeroForm({ hero, setHero }: Props) {
  const { addMessage } = useMessages();
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const url = hero ? `${apiUrl}/heroes/${hero.id}` : `${apiUrl}/heroes/`;
    const method = hero ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify({ name: formData.get("name") }),
      });

      if (!response.ok)
        throw new Error(`Request Failed : ${response.statusText}`);

      const data = await response.json();

      const messages = hero
        ? `Hero ${hero.name} updated to ${data.name}`
        : `Hero ${data.name} created`;
      addMessage(messages);
      hero && setHero ? setHero(data) : navigate(`/heroes/${data.id}`);
    } catch (error) {
      console.log(error);
      addMessage("Failed to update Hero");
    }
  };

  return (
    <div className="mt-3">
        <h2 className="text-2xl">{hero ? 'Update Hero' : 'Create Hero'}</h2>
      <form onSubmit={onSubmit}>
        <label>Hero Name</label>
        <div className="flex gap-3">
          <input
            type="text"
            name="name"
            placeholder="Hero Name"
            className="border border-gray-300 rounded-lg p-2 w-1/4"
            defaultValue={hero?.name || ""}
            // onChange={handleNameChanged}
          ></input>
          <button type="submit" className="btn">
          {hero ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
