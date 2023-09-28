import Layout from "../components/Layout";
import React, { useEffect, useRef, useState } from "react";
import { User, Users } from "@/app/types/Users";
import { usePagination } from "@/utils/hooks/UsePagination"; // Importez le hook personnalisé ici
import RowUser from "@/components/RowUser";
import RowHeader from "@/components/RowHeader";
export default function App() {
  const [userList, setUserList] = useState<Users>([]);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const finishEditingName = () => {
    setEditingIndex(-1);
  };

  const toggleEditingName = (index: number) => {
    if (editingIndex === index) {
      finishEditingName();
    } else {
      setEditingIndex(index);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const hasValue = (stringToValidate: string, value: string): boolean =>
    stringToValidate.toLowerCase().includes(value.toLowerCase());

  const isValueFoundInFields = (value: string, user: User): boolean => {
    return (
      hasValue(user.name, value) ||
      hasValue(user.email, value) ||
      hasValue(user.type, value)
    );
  };

  const filteredUserList = userList.filter((user) => {
    return isValueFoundInFields(inputValue, user) || inputValue.length === 0;
  });

  const onSortUsersByName = () => {
    setUserList([
      ...userList.sort((a, b) =>
        a.name.split(" ")[1].localeCompare(b.name.split(" ")[1])
      ),
    ]);
  };

  const handleInputValueChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUserList(data);
      });
  }, []);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    next,
    prev,
    getFullIndexFromPageIndex,
  } = usePagination(filteredUserList, 10);

  function onSave(index: number) {
    return (newValue: string) => {
      const updatedUserList = [...userList];
      updatedUserList[getFullIndexFromPageIndex(index)].name = newValue;
      setUserList(updatedUserList);
    };
  }

  return (
    <>
      <Layout
        onInputChange={handleInputValueChange}
        onSortChange={onSortUsersByName}
      >
        {paginatedItems.length > 0 && (
          <div className="container grid border-solid border-b-2 border-black min-w-min">
            {paginatedItems.length > 0 && (
              <div className="flex justify-between mt-4">
                <button
                  onClick={prev}
                  disabled={currentPage === 1}
                  className="min-w-min"
                >
                  Previous Page
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={next}
                  disabled={currentPage === totalPages}
                  className="min-w-min"
                >
                  Next Page
                </button>
              </div>
            )}
            <RowHeader />
            {paginatedItems.map((user, index) => (
              <RowUser
                key={index.toString()}
                user={user}
                isEditing={editingIndex === index}
                onToggleEditing={() => toggleEditingName(index)}
                onSave={onSave(index)}
                onFinishEditing={finishEditingName}
              />
            ))}
          </div>
        )}
      </Layout>
    </>
  );
}
