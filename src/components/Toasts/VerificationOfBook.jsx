import { toast } from "react-hot-toast";
import { deleteBook } from "../../../Firebase";

/* TERMINAR DE CONFIGURAR LA TOAST */
export default function VerificationOfBook(props) {
  const { t, getData, book } = { ...props };

  const deleteBookOnDB = async (e, book, option, id) => {
    console.log(option);
    if (option) {
      await deleteBook(book);
      getData();
    }
    toast.dismiss(id);
  };

  return (
    <>
      {
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 `}
        >
          <div className="text-3xl text-red-500 block text-center items-center p-4 w-full">
            <ion-icon name="help-outline"></ion-icon>
            <div className=" text-black justify-between items-center">
              <p className="text-xl mb-2">¿Deseas eliminar el book {book}?</p>
              <div className="flex justify-around items-center">
                <button
                  className="text-sm border-2 border-red-500 p-2 rounded-md w-14"
                  onClick={(e) => {
                    e.preventDefault(), deleteBookOnDB(e, book, true, t.id);
                  }}
                >
                  Si
                </button>
                <button
                  className="text-sm border-2 border-red-500 p-2 rounded-md w-14"
                  onClick={(e) => {
                    e.preventDefault(), deleteBookOnDB(e, book, false, t.id);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
