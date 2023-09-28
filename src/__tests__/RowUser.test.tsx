import RowUser  from "../components/RowUser";
import {User} from "@/app/types/Users";
import {render} from "@testing-library/react";
import exp from "constants";

describe("RowUser", () => {
    it("should take a user and render it", () => {
        const user: User = {
            id: "1",
            name: "John Doe",
            email: "tot@mail.com",
            type: "admin"
        };

        const {getByText} = render(<RowUser user={user} isEditing={false} onToggleEditing={() => {}} onSave={() => {}}/>);

        expect(getByText("John Doe")).toBeTruthy();
        expect(getByText("tot@mail.com")).toBeTruthy();
        expect(getByText("admin")).toBeTruthy();

        expect(getByText("John Doe")).toHaveClass("bg-inherit");
    });
});