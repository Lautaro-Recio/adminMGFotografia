import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-hot-toast";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../Firebase";
import NewPicture from "./componentsOfSlider/NewPicture";
import ImgOfModule from "./componentsOfSlider/ImgOfModule";
const posArray = [];

export default function Slider(props) {
  const {
    book,
    WhoMod,
    getData,
    classOfPics,
    setImageAndBook,
    handleSubmit,
    reset,
    viewConfiguration,
    header,
    presentation1,
    presentation2,
  } = {
    ...props,
  };
  const [view, setView] = useState("");

  const [newPicture, SetNewPicture] = useState(false);
  const [imgPreview, SetImgPreview] = useState([]);

  const [edit, SetEdit] = useState("");

  const viewPositions = (e, bookName, value, x) => {
    if (posArray.length === 0) {
      for (let i = 0; i < book.imgs.book.length; i++) {
        posArray.push(book.imgs.book[i].img.position);
      }
    }
    for (let i = 0; i < posArray.length; i++) {
      if (value <= 0 && i === x)
        toast.error("Las posiciones tinen que ser mayores a 0");
      else if (posArray.some((e) => e === value && i === x))
        toast.error("Posicion ya asignada");
      else if (value === "" && i === x)
        toast.error("Debes ingresar una posicion");
      else if (i == x) {
        posArray[i] = value;
        uploadPosition(e, bookName, value, x);
        toast.success("Posicion actualizada con exito");
      }
    }
  };

  const bodyChange = document.querySelector("#body");

  const uploadName = async (e, book, nameOfImg, i) => {
    e.preventDefault();
    const myRef = doc(db, "books", book);
    await getDoc(myRef).then((docSnap) => {
      const data = docSnap.data();
      data.book[i].img.nameOfImg = nameOfImg;
      setDoc(myRef, {
        ...data,
      });
    });
  };
  const uploadPosition = async (e, book, position, i) => {
    e.preventDefault();
    const myRef = doc(db, "books", book);
    await getDoc(myRef).then((docSnap) => {
      const data = docSnap.data();
      data.book[i].img.position = position;
      setDoc(myRef, {
        ...data,
      });
    });
  };

  return (
    <>
      {view && (
        <>
          <span className="bg-[#676767bd] absolute z-10 w-full h-full top-0 left-0"></span>
          <div className="h-screen w-full absolute flex justify-center items-center top-0 left-0">
            <button
              className="absolute top-8 right-8 text-3xl hover:text-red-500 transition-all z-20"
              onClick={(e) => {
                e.preventDefault();
                setView("");
                bodyChange.classList.remove("overflow-hidden");
              }}
            >
              X
            </button>
            <img src={view} className="z-20 md:h-3/4   " alt="" />
          </div>
        </>
      )}
      <Swiper
        key={book.bookName}
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
      >
        {book.imgs.book.map((img, i) => {
          return (
            <>
              <SwiperSlide key={img.img.result}>
                <div
                  className={`w-auto h-full bg-menuGray mx-2  transition-all duration-700 rounded-md   ${
                    WhoMod == book.bookName ? "opacity-100" : "opacity-0"
                  } `}
                >
                  <ImgOfModule
                    book={book}
                    getData={getData}
                    viewConfiguration={viewConfiguration}
                    header={header}
                    presentation1={presentation1}
                    presentation2={presentation2}
                    img={img}
                    edit={edit}
                    SetEdit={SetEdit}
                    viewPositions={viewPositions}
                    i={i}
                    uploadName={uploadName}
                    setView={setView}
                  />
                </div>
              </SwiperSlide>
            </>
          );
        })}
        <SwiperSlide className="!w-full">
          <div className={classOfPics}>
            <button
              onClick={(e) => {
                e.preventDefault();
                SetNewPicture(true);
                window.scroll(0, 0);
                bodyChange.classList.add("overflow-hidden");
              }}
              className="rounded-md  text-6xl  mb-2 md:w-80 md:h-96 h-64 w-48  t-12 flex justify-center items-center border-dashed border-2 bg-pink border-borderGray absolute hover:bg-menuGray  duration-700 transition-all cursor-pointer"
            >
              +
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
      {newPicture && (
        <>
          <div className="absolute top-0 left-0 bg-gray-500  z-20  h-full w-full ">
            <button
              onClick={(e) => {
                e.preventDefault();
                SetNewPicture(false);
                reset(e);
                SetImgPreview([]);
                bodyChange.classList.remove("overflow-hidden");
              }}
              className="rounded-md  text-xl  mb-2 w-6 h-6 t-12 flex ml-[97%] mt-4 justify-center items-center border-2 bg-Gray border-borderGray  hover:bg-menuGray  duration-700 transition-all cursor-pointer"
            >
              X
            </button>
            <NewPicture
              book={book}
              setImageAndBook={setImageAndBook}
              handleSubmit={handleSubmit}
              reset={reset}
              SetImgPreview={SetImgPreview}
              imgPreview={imgPreview}
            />
          </div>
        </>
      )}
    </>
  );
}
