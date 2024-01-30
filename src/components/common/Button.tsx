export enum ButtonTypeSubmit {
  BUTTON = "button",
  SUBMIT = "submit",
  RESET = "reset",
}

interface ButtonType {
  text: string;
  state?: boolean;
  textState?: string;
  onClick?: () => void;
  outline?: boolean;
  typeSubmit?: ButtonTypeSubmit;
}

const Button = ({
  text,
  state,
  textState,
  onClick,
  outline,
  typeSubmit,
}: ButtonType) => {
  return (
    <button
      type={typeSubmit || "submit"}
      className="flex justify-center items-center relative rounded-xl cursor-pointer w-fit outline-none font-medium group"
      onClick={onClick}
    >
      <div
        className={`${
          outline
            ? "bg-gray-800 border-gray-950 group-hover:bg-gray-950 "
            : "bg-teal-500 border-teal-800 group-hover:bg-teal-900 group-hover:border-gray-950"
        } relative px-7 py-2.5 rounded-md border-2 text-white z-20 text-md m-[3px] transition capitalize`}
      >
        {state && textState ? textState : text}
      </div>

      <div className="blinking-color absolute opacity-0 top-0 group-hover:opacity-100 w-full h-full rounded-lg transition" />
      <div className="absolute opacity-100 top-0 group-hover:opacity-0 w-full h-full rounded-md transition" />
    </button>
  );
};

export default Button;
