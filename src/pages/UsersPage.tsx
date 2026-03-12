import { useEffect, useState, useCallback } from "react";
import { fetchUsers, searchUsers } from "../api/userApi";
import { UserCard } from "../components/UserCard";
import { SearchBar } from "../components/SearchBar";
import { Pagination } from "../components/Pagination";

import type { User } from "../types/user";

const LIMIT = 10;

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  const loadUsers = useCallback(async (pageNumber: number) => {
    const skip = (pageNumber - 1) * LIMIT;
    const data = await fetchUsers(LIMIT, skip);
    setUsers(data.users);
    setTotal(data.total);
  }, []);

  const handleSearch = useCallback(
    (query: string) => {
      setSearch(query);
      if (page !== 1) setPage(1);
    },
    [page],
  );

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedQuery.trim().length === 0) {
        loadUsers(page);
        return;
      }
      const data = await searchUsers(debouncedQuery);
      const filteredUsers = data.users.filter((user) =>
        user.firstName.toLowerCase().startsWith(debouncedQuery.toLowerCase()),
      );
      setUsers(filteredUsers);
      setTotal(filteredUsers.length);
    };
    fetchData();
  }, [debouncedQuery, page, loadUsers]);

  return (
    <div className="min-h-screen p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-[var(--color-coffee)] mb-6">
          Users Catalog
        </h1>

        <SearchBar value={search} onChange={handleSearch} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>       
        {debouncedQuery.trim().length === 0 && (
          <Pagination
            total={total}
            limit={LIMIT}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};
