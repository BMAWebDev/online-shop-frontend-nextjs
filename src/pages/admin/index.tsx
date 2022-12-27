// Types
import { ReactElement } from "react";
import { GetServerSideProps } from "next";

// Auth
import { checkAuth } from "src/auth";

export default function Admin(): ReactElement {
  return <>Welcome to the admin dashboard page, hope you like it here!</>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await checkAuth(context);
};
