import React from "react";
import type { User } from "../types/user";

type userProps = {
  user: User;
};

const UserCardComponent = ({ user }: userProps) => {
  return (
    <div
      className="
        bg-[var(--color-sand)]
        hover:bg-[var(--color-latte)]
        rounded-xl
        p-5
        shadow-sm
        transition
        cursor-pointer
        duration-200
    "
    >
      <div className="flex items-center gap-4">
        <img
          src={user.image}
          alt={user.firstName}
          className="w-16 h-16 rounded-full"
        />

        <div>
          <h3 className="text-lg font-semibold text-[var(--color-coffee)]">
            {user.firstName} {user.lastName}
          </h3>

          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export const UserCard = React.memo(UserCardComponent);
