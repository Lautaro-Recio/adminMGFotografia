import { useState } from "react";
import ControllersOfMod from "./ControllersOfMod";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import SwiperMod from "./SwiperMod";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase";
export default function Module(props) {
  const { BooksOnDB, getData, setFile, setBooksOnUpload, handleSubmit, reset } =
    { ...props };
  const [classOfPics, setClassOfPics] = useState("opacity-0 hidden");
  const [classOfContainer, setClassOfContainer] = useState("opacity-0 hidden");
  const [parraf, setParraf] = useState("");
  
  const [WhoMod, setWhoMod] = useState("");

  BooksOnDB.sort((a, b) => {
    if (a.imgs.order > b.imgs.order) {
      return 1;
    }
    if (a.imgs.order < b.imgs.order) {
      return -1;
    }
  });
  const setImageAndBook = (img, book, length) => {
    setBooksOnUpload(book);
    setFile(img);
    console.log(img - length);
  };
 
  /* TERMINAR ESTETICA Y FUNCIONALIDAD DE: SELECCIONAR CUAL ES LA FOTO PARA EL HEADER DE LA SECCION DE PHOTOSHOW Y LAS 2 IMAGENES QUE SE MUESTRAN EN LA SECCION DE LOS BOOKS */

  const updateData = async (book, e) => {
    e.preventDefault();
    const myRef = doc(db, "books", book);
    await updateDoc(myRef, {
      parraf,
    });

    setParraf("");
  };

  return (
    <>
      {BooksOnDB.map((book) => {
        return (
          <div
            className={`block my-2 rounded-md items-center px-2 border-2 border-Gray origin-top duration-700 transition-all w-[98%] ${
              WhoMod !== book.bookName
                ? "h-16"
                : book.imgs.order != 0
                ? "h-[36rem]"
                : "h-86"
            }`}
            key={book.bookName}
          >
            <ControllersOfMod
              book={book}
              WhoMod={WhoMod}
              setWhoMod={setWhoMod}
              setClassOfContainer={setClassOfContainer}
              setClassOfPics={setClassOfPics}
              getData={getData}
              order={book.imgs.order}
            />
            {WhoMod == book.bookName && (
              <>
                <SwiperMod
                  WhoMod={WhoMod}
                  book={book}
                  classOfContainer={classOfContainer}
                  getData={getData}
                  classOfPics={classOfPics}
                  setImageAndBook={setImageAndBook}
                  handleSubmit={handleSubmit}
                  reset={reset}
                  
                />
                {book.imgs.order != 0 && (
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
                        className="border-gray-500 border-2 rounded-md hover:bg-white transition-all duration-500 text-gray-500"
                        onClick={(e) => {
                          updateData(book.bookName, e);
                        }}
                      >
                        Subir Parrafo
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        );
      })}
    </>
  );
}
