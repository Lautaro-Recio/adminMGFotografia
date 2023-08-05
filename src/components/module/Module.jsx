import { useState } from "react";
import ControllersOfMod from "./ControllersOfMod";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import SwiperMod from "./SwiperMod";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase";
export default function Module(props) {
  const { BooksOnDB, getData, setFile, setBooksOnUpload, handleSubmit, reset } =
    { ...props };
  const [classOfPics, setClassOfPics] = useState("opacity-0 hidden");
  const [classOfContainer, setClassOfContainer] = useState("opacity-0 hidden");
  const [parraf, setParraf] = useState("");

  const [WhoMod, setWhoMod] = useState("");
  const [header, setHeader] = useState("");
  const [presentation1, setPresentation1] = useState("");
  const [presentation2, setPresentation2] = useState("");

  BooksOnDB.sort((a, b) => {
    if (a.imgs.order > b.imgs.order) {
      return 1;
    }
    if (a.imgs.order < b.imgs.order) {
      return -1;
    }
  });
  const setImageAndBook = (img, book) => {
    setBooksOnUpload(book);
    setFile(img);
  };
  const viewConfiguration = async (bookName, value, configuration) => {
    /* SI CAMBIA EL ESTADO EN FIREBASE // FALTA QUE CAMBIE DE MANERA LOCAL Y PREGUNTAR SI QUIERE EFECTUAR LOS CAMBIOS */
    const myRef = doc(db, "books", bookName);
    const actualizacion = await getDoc(myRef);
    setHeader(actualizacion.data().header);
    setPresentation1(actualizacion.data().presentation1);
    setPresentation2(actualizacion.data().presentation2);

    if (configuration === "header") {
      setHeader(value);
      await updateDoc(myRef, {
        header: value,
      });
    } else if (configuration === "presentation1") {
      setPresentation1(value);
      await updateDoc(myRef, {
        presentation1: value,
      });
    } else {
      setPresentation2(value);
      await updateDoc(myRef, {
        presentation2: value,
      });
    }
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
                ? "h-[40rem]"
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
              viewConfiguration={viewConfiguration}
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
                  viewConfiguration={viewConfiguration}
                  header={header}
                  presentation1={presentation1}
                  presentation2={presentation2}
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
