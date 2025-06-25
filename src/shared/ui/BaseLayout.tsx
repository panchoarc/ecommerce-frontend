import UserHeader from "@/features/user/layouts/UserHeader";
import { FC } from "react";

const BaseLayout: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <UserHeader />

      <main className="size-full overflow-y-auto bg-gray-100 dark:bg-black p-4">
        {children}
      </main>
    </>
  );
};

export default BaseLayout;
