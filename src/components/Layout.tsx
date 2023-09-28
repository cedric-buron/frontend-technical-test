import { ReactNode, useState } from "react";
import "@/app/globals.css";

interface LayoutProps {
  children: ReactNode;
  onInputChange: (inputValue: string) => void; // Fonction de rappel pour envoyer la valeur de l'input
  onSortChange: () => void; // Fonction de rappel pour trier la liste
}

export default function Layout({
  children,
  onInputChange,
  onSortChange,
}: LayoutProps) {
  const [searchValue, setSearchValue] = useState("");

  // Mettre à jour la valeur de recherche lorsque l'utilisateur saisit du texte
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    // Appeler la fonction de rappel pour envoyer la valeur de l'input au parent
    onInputChange(inputValue);
  };
  const handleOnSort = (e: any) => {
    onSortChange();
  };

  return (
    <div className="w-full">
      <header className="w-full mb-8 m-4">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <h1 className="inline-block h-2 border-b-1 border-solid border-black mb-8 mt-4 font-bold text-xl">
          Majelan Homework ! : User Management
        </h1>
        <div id="searchInputUser" className="mb-4">
          <h2 className="text-lg">Search and Sort</h2>
          <input
            type="text"
            placeholder="Search for a user"
            value={searchValue}
            onChange={handleSearchInputChange}
            className="block font-bold  border-2 border-solid border-black p-2 rounded-xl mb-4"
          />
          <button
            onClick={handleOnSort}
            className="inline-block bg-amber-400 h-8 border-solid border-1 border-black rounded-xl mb-4 font-bold leading-8 px-4"
          >
            sort by name
          </button>
        </div>
      </header>
      <main className="m-4">{children}</main>
    </div>
  );
}
