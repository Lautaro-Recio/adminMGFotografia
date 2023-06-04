import { useState } from "react";
import ControllersOfMod from "./ControllersOfMod"
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import SwiperMod from "./SwiperMod";
export default function Module(props) {
  const { BooksOnDB, getData, setFile, setBooksOnUpload } = { ...props };
  const [classOfPics, setClassOfPics] = useState("opacity-0 hidden");
  const [classOfContainer, setClassOfContainer] = useState("opacity-0 hidden");

  const [WhoMod, setWhoMod] = useState("");
  

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
            className={`block my-2 rounded-md items-center px-2 border-2 border-Gray origin-top duration-700 transition-all w-[98%] ${
              WhoMod == book.bookName ? "h-80" : "h-16"
            }`}
            key={book.bookName}
          >
            {/* book, setWhoMod,setClassOfContainer,setClassOfPics,getData */}
            <ControllersOfMod book={book} WhoMod={WhoMod} setWhoMod={setWhoMod} setClassOfContainer={setClassOfContainer} setClassOfPics={setClassOfPics} getData={getData}/>

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
    </>
  );
}
