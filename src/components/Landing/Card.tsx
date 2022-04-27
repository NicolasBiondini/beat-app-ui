type Props = {
  tittle: string;
  icon: JSX.Element;
  text: string;
};

function Card({ tittle, icon, text }: Props) {
  return (
    <div className=" flex flex-col justify-center items-start gap-4 h-full w-44 ">
      <div className="w-full flex flex-row gap-4 items-center ">
        {icon}
        <h2 className="text-2xl text-white font-medium">{tittle}</h2>
      </div>
      <p className="pl-14 text-indigo-50 text-base font-normal">{text}</p>
    </div>
  );
}

export default Card;
