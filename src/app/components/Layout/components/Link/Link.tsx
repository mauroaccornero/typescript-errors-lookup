import { ReactNode } from "react";

interface ILinkProps {
  children: ReactNode;
  link?: string;
  path?: string;
  title?: string;
  target?: string;
  className?: string;
  rel?: string;
}

const Link = ({ children, link = "", path = "", ...props }: ILinkProps) => {
  const BASE_URL = process.env.BASE_URL;
  const linkHref = link ? link : BASE_URL + path;
  return (
    <a href={linkHref} {...props}>
      {children}
    </a>
  );
};

export default Link;
