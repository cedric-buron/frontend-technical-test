import {usePagination} from '@/utils/hooks/UsePagination';
import {User, Users} from "@/app/types/Users";

function generateRandomUser() {
    const names = ["John", "Alice", "Bob", "Eva", "David", "Sophia", "Liam", "Olivia", "Noah", "Emma"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomEmail = `${randomName.toLowerCase()}@example.com`;

    const user: User = {
        id: Math.random().toString(),
        name: randomName,
        email: randomEmail,
        type: "member",
    };

    return user;
}

// Create an array of 15 random users
const randomUsers: Users = [];
for (let i = 0; i < 25; i++) {
    const randomUser = generateRandomUser();
    randomUsers.push(randomUser);
}

describe('test', () => {
    it('should init pagination', () => {
        const filteredUserList: Users = [];
        const EmptyReactComponent = () => {
            const {currentPage, totalPages, paginatedItems, goToPage, next, prev} = usePagination(filteredUserList, 10);
            expect(currentPage).toBe(1);
            expect(totalPages).toBe(1);
            expect(paginatedItems).toBe(10);
            expect(goToPage).toBe(1);
            expect(next).toBe(1);
            expect(prev).toBe(1);
            return <></>
        };

    });
    it('should init pagination and have 3 pages', () => {
        const filteredUserList = [...randomUsers];
        console.log(filteredUserList.length);
            const EmptyReactComponent = () => {
                const {currentPage, totalPages, paginatedItems, goToPage, next, prev} = usePagination(filteredUserList, 10);
                expect(currentPage).toBe(1);
                expect(totalPages).toBe(3);
                expect(paginatedItems).toBe(10);
                expect(goToPage).toBe(1);
                expect(next).toBe(1);
                expect(prev).toBe(1);
                return <></>
            };

        });
    });