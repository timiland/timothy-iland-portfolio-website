export interface IActionTag {
  readonly name: string;
  readonly keyInput: string;
  readonly callback: () => void;
}

const ActionTag = ({ name, keyInput, callback }: IActionTag) => {
  return (
    <button
      onClick={() => callback()}
      className="text-lg bg-black py-2 px-4 rounded-full shadow-lg text-white"
    >
      {name} :
      <span className="text- text-green-500 font font-bold"> {keyInput}</span>
    </button>
  );
};

export default ActionTag;
