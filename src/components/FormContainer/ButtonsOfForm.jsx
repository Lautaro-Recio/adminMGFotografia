export default function ButtonsOfForm(props) {
  const { handleSubmit, reset, SetImgPreview, dis } = { ...props };
  return (
    <div className="flex justify-around items-center my-4">
      <button
        disabled={!dis && true}
        className="border-2 border-pink-300 p-2 hover:bg-Gray transitio-all duration-500 rounded-md w-32 hover:text-pink-300"
        onClick={(e) => {
          handleSubmit(e);
          reset(e);
        }}
      >
        Subir cambios
      </button>
      <button
        className="border-2 border-pink-300 p-2 hover:bg-Gray transitio-all duration-500 rounded-md w-32 hover:text-pink-500"
        onClick={(e) => {
          reset(e);
          SetImgPreview([]);
        }}
      >
        Reset
      </button>
    </div>
  );
}
