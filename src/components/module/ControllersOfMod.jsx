import { toast } from "react-hot-toast";
import VerificationOfBook from "../Toasts/VerificationOfBook";

export default function ControllersOfMod(props) {
  const {
    book,
    WhoMod,
    setWhoMod,
    setClassOfContainer,
    setClassOfPics,
    getData,
    order,
    viewConfiguration,
  } = { ...props };
  const openModule = (e, nameOfBook) => {
    e.preventDefault();
    viewConfiguration(book.bookName, "", "presentation2");
    getData();
    setClassOfContainer(
      "opacity-100 flex duration-[2500ms] transition-all mx-2 h-[450px] "
    );
    setClassOfPics(
      "opacity-100 flex duration-[2500ms] transition-all md:mx-2  h-[172px] w-[172px] "
    );
    setWhoMod(nameOfBook);
  };
  const closeModule = (e) => {
    e.preventDefault();
    getData();
    setClassOfContainer("opacity-0 hidden");
    setWhoMod("");
  };
  return (
    <div className="flex items-center justify-between my-2 mx-4">
      <div className="flex justify-center items-center">
        {order != 0 && <p className="text-3xl pb-2 mr-4">{order + ")"} </p>}
        <h3 className="text-white mr-2 text-s md:text-2xl">{book.bookName}</h3>
        {WhoMod === book.bookName ? (
          <button
            onClick={(e) => closeModule(e)}
            className="flex justify-center items-center w-10 h-10  text-3xl hover:bg-whte rounded-full hover:text-menuGray transition-all"
          >
            <ion-icon name="close-outline"></ion-icon>
          </button>
        ) : (
          <button
            onClick={(e) => openModule(e, book.bookName)}
            className="flex justify-center items-center w-10 text-3xl h-10 p-2  hover:border-borderGray hover:bg-white rounded-full hover:text-menuGray transition-all"
          >
            <ion-icon name="chevron-down-outline"></ion-icon>
          </button>
        )}
      </div>
      {order != 0 && (
        <button className="text-3xl justify-center items-center flex hover:text-darkRed transition mx-4 group hover:bg-Gray p-2 rounded-md  cursor-default">
          <ion-icon aria-hidden="none" name="trash-outline"></ion-icon>
          <p
            className=" cursor-pointer text-sm opacity-0 group-hover:opacity-100 mx-2 "
            onClick={(e) => {
              e.preventDefault(),
                toast.custom((t) => (
                  <VerificationOfBook
                    book={book.bookName}
                    getData={getData}
                    t={t}
                  />
                ));
            }}
          >
            Borrar book
          </p>
        </button>
      )}
    </div>
  );
}
