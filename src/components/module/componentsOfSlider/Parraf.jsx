import { toast } from "react-hot-toast";

export default function Parraf(props) {
  const { setParraf, book, updateData } = { ...props };
  return (
    <>
      <p className="p-2">Parrafo</p>
      <div className="flex gap-2">
        <textarea
          className="text-black md:text-base text-sm w-full max-h-20 p-2 rounded-md"
          placeholder={`Texto en sistema: ${book.imgs.parraf}`}
          onChange={(e) => {
            setParraf(e.target.value);
          }}
        />
        <button
          className="border-Gray border-2 rounded-md hover:bg-Gray transition-all duration-500 text-white"
          onClick={(e) => {
            updateData(book.bookName, e);
            toast.success("Parrafor actualizado")
          }}
        >
          Subir Parrafo
        </button>
      </div>
    </>
  );
}
