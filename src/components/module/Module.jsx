import { useState } from "react";
import ControllersOfMod from "./ControllersOfMod";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import SwiperMod from "./SwiperMod";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase";
import Parraf from "./componentsOfSlider/Parraf";
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
                  <Parraf
                    setParraf={setParraf}
                    book={book}
                    updateData={updateData}
                  />
                )}
              </>
            )}
          </div>
        );
      })}
    </>
  );
}
