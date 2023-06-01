import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import VerificationOfBook from "../Toasts/VerificationOfBook";
import SwiperMod from "./SwiperMod";
export default function Module(props) {
  const { BooksOnDB, getData, setFile, setBooksOnUpload } = { ...props };
  const [classOfPics, setClassOfPics] = useState("opacity-0 hidden");
  const [classOfContainer, setClassOfContainer] = useState("opacity-0 hidden");

  const [WhoMod, setWhoMod] = useState("");
  const openModule = (e, nameOfBook) => {
    e.preventDefault();
    setClassOfContainer(
      "opacity-100 flex duration-[2500ms] transition-all mx-2 h-56 "
    );
    setClassOfPics(
      "opacity-100 flex duration-[2500ms] transition-all mx-2 h-[172px] w-[172px]"
    );
    setWhoMod(nameOfBook);
  };
  const closeModule = (e) => {
    e.preventDefault();
    setClassOfContainer("opacity-0 hidden");
    setWhoMod("");
  };

  const setImageAndBook = (img, book) => {
    setFile(img);
    setBooksOnUpload(book);
  };

  return (
    <>
      {/* TERMINAR LA INTERGRACION DEL SLIDER*/}

      {BooksOnDB.map((book) => {
        return (
          <div
            className={`block my-2 rounded-md items-center px-2 border-2 border-Gray origin-top duration-700 transition-all ${
              WhoMod == book.bookName ? "h-80" : "h-16"
            }`}
            key={book.bookName}
          >
            <div className="flex items-center justify-between my-2 mx-4">
              <div className="flex">
                <h3 className="text-white mr-2 text-2xl">{book.bookName}</h3>
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
              {book.bookName !== "Carrousel" && (
                <button className="text-3xl justify-center items-center flex hover:text-darkRed transition mx-4 group hover:bg-Gray p-2 rounded-md  cursor-default">
                  <ion-icon
                    aria-hidden="favorte"
                    name="trash-outline"
                  ></ion-icon>
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

            {WhoMod == book.bookName && (
              <SwiperMod
                WhoMod={WhoMod}
                book={book}
                classOfContainer={classOfContainer}
                getData={getData}
                classOfPics={classOfPics}
                setImageAndBook={setImageAndBook}
              />
            )}
          </div>
        );
      })}
      <Toaster />
    </>
  );
}
