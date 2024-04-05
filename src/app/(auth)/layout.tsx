import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function LayOut({ children }: LayoutProps) {
  return <main>{children}</main>;
}
