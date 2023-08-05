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
      console.log(data);
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

  const slidesPerView = (book) => {
    if (window.screen.width <= 640) return 1;
    else if (window.screen.width <= 1100) return 2;
    else if (book.imgs.book.length <= 2) return 2;
    else return 3;
  };

  return (
    <>
      <Swiper
        key={book.bookName}
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={slidesPerView(book)}
      >
        {book.imgs.book.map((img, i) => {
          return (
            <>
              <SwiperSlide key={img.img.result}>
                <div
                  className={`w-72 h-auto bg-gray-400 mx-2  transition-all duration-700 rounded-md   ${
                    WhoMod == book.bookName ? "opacity-100" : "opacity-0"
                  } `}
                >
                  <input
                    placeholder={`Nombre img: ${img.img.nameOfImg} `}
                    type="text"
                    disabled={img.img.result === edit ? false : true}
                    className="m-2 w-[93%] rounded-md p-[1px] text-black"
                    onChange={(e) => {
                      uploadName(e, book.bookName, e.target.value, i);
                    }}
                  />
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
              className="rounded-md  text-6xl  mb-2 w-64 h-80  t-12 flex justify-center items-center border-dashed border-2 bg-Gray border-borderGray absolute hover:bg-menuGray  duration-700 transition-all cursor-pointer"
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
