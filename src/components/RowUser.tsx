import { useRef } from "react";
import { User } from "@/app/types/Users";

interface RowUserProps {
  user: User;
  isEditing: boolean;
  onToggleEditing: () => void;
  onSave: (value: string) => void;
  onFinishEditing: () => void;
}

const rulesColor = (user: User): string => {
  switch (user.type) {
    case "admin":
      return "bg-red-400";
    case "staff":
      return "bg-yellow-400";
    case "member":
      return "bg-green-400";
    default:
      return "bg-white";
  }
};

function RowUser({
  user,
  isEditing,
  onToggleEditing,
  onSave,
  onFinishEditing,
}: RowUserProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSave = () => {
    if (inputRef.current) {
      onSave(inputRef.current.value);
    }
  };

  return (
    <div className="grid grid-cols-3 grid-flow-col-dense border-solid border-t-2 border-l-2 border-r-2 border-black " onBlur={onFinishEditing}>
      {isEditing ? (
        <input
          type="text"
          className="inline-block bg-amber-400 px-2 font-bold  border-2 border-solid border-black"
          value={user.name}
          onChange={(e) => onSave(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
              onFinishEditing();
            }
          }}
          onBlur={handleSave}
          ref={inputRef}
        />
      ) : (
        <div
          className="selection:inline-block bg-inherit px-2 cursor-pointer hover:cursor-text hover:font-bold border-r-2 border-solid border-black"
          onClick={onToggleEditing}
        >
          {user.name}
        </div>
      )}
      <div className="inline-block px-2 text-right border-r-2 border-solid border-black">{user.email}</div>
      <div className={"inline-block text-right px-2 " + rulesColor(user)}>
        {user.type}
      </div>
    </div>
  );
}

export default RowUser;
