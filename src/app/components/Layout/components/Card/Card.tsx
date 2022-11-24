import { ReactNode } from "react";

interface ICardProps {
  children: ReactNode;
}

const Card = ({ children }: ICardProps) => {
  return (
    <div className="my-5 min-h-[50px] rounded bg-white p-5 text-slate-900 shadow">
      {children}
    </div>
  );
};

export default Card;
