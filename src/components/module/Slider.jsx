import { Swiper, SwiperSlide } from "swiper/react";
import VerificationToast from "../Toasts/VerificationToast";
import { toast } from "react-hot-toast";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import { useState } from "react";
import ButtonsOfForm from "../FormContainer/ButtonsOfForm";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../Firebase";
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
  } = {
    ...props,
  };
  const [newPicture, SetNewPicture] = useState(false);
  const [imgPreview, SetImgPreview] = useState([]);
  const [edit, SetEdit] = useState("");
  const preview = (file) => {
    const previewArray = [];
    for (let i = 0; i < file.length; i++) {
      const fileReader = new FileReader();
      console.log(file[i]);
      fileReader.readAsDataURL(file[i]);
      fileReader.onload = () => {
        previewArray.push(fileReader.result);
        SetImgPreview(previewArray);
      };
    }
  };
  const bodyChange = document.querySelector("#body");

/* SOLUCIONAR LO DEL SCROLL */

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

  return (
    <>
      <Swiper
        key={book.bookName}
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={
          window.screen.width <= 640
            ? 1
            : book.imgs.book.length <= 3
            ? book.imgs.book.length + 1
            : 3
        }
      >
        {book.imgs.book.map((img, i) => {
          return (
            <>
              <SwiperSlide key={img.img.result}>
                <div
                  className={`w-64 h-80 bg-gray-400 mx-2  transition-all duration-700   ${
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
                  <div className="relative ">
                    <img
                      className="w-40 h-40 my-10 rounded-md mx-[20%] border-2 border-borderGray "
                      src={img.img.result}
                      alt={img.result}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault(),
                          toast.custom((t) => (
                            <VerificationToast
                              result={img.img.result}
                              book={book.bookName}
                              array={book.imgs.book}
                              getData={getData}
                              t={t}
                            />
                          ));
                      }}
                      className="w-20 h-40 rounded-md md:mx-[20%] mx-[20%] absolute opacity-0 top-0 left-0 flex justify-center items-center text-5xl duration-500 transition-all hover:bg-darkRed hover:opacity-100"
                    >
                      <ion-icon name="trash-outline"></ion-icon>
                    </button>
                    {img.img.result === edit ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          SetEdit("");
                        }}
                        className="w-20 h-40 rounded-md md:mx-[18%] mx-[20%] absolute opacity-0 top-0 right-0 flex justify-center items-center text-5xl duration-500 transition-all hover:bg-save hover:opacity-100"
                      >
                        <ion-icon name="save-outline"></ion-icon>
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault(), SetEdit(img.img.result);
                        }}
                        className="w-20 h-40 rounded-md md:mx-[18%] mx-[20%] absolute opacity-0 top-0 right-0 flex justify-center items-center text-5xl duration-500 transition-all hover:bg-yellowButton hover:opacity-100"
                      >
                        <ion-icon name="create-outline"></ion-icon>
                      </button>
                    )}
                    <input
                      placeholder={`Posicion: ${img.img.position} `}
                      type="number"
                      disabled={img.img.result === edit ? false : true}
                      className="mx-2 my-[2px] w-[93%] rounded-md p-[1px] text-black"
                      min={1}
                      onChange={(e) => {
                        viewPositions(e, book.bookName, e.target.value, i);
                      }}
                    />
                  </div>
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
              className="rounded-md  text-6xl  mb-2 w-64 h-80 t-12 flex justify-center items-center border-dashed border-2 bg-Gray border-borderGray absolute hover:bg-menuGray  duration-700 transition-all cursor-pointer"
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
            <div className="bg-gray-500 p-4 flex">
              <div className="w-1/3  ">
                <h4>Importacion </h4>

                <label className=" p-4 " htmlFor="">
                  <p className="p-4">Archivos</p>
                  <input
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      setImageAndBook(
                        e.target.files,
                        book.bookName,
                        book.length
                      );
                      preview(e.target.files);
                    }}
                    type="file"
                    className="w-full mb-16 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:text-transparet text-black hover:file:bg-violet-100"
                  />
                </label>
                <ButtonsOfForm
                  handleSubmit={handleSubmit}
                  reset={reset}
                  SetImgPreview={SetImgPreview}
                />
              </div>
              <div className="w-2/3 gap-2 h-auto justify-center items-center">
                <Swiper
                  key={book.bookName}
                  modules={[Navigation, Pagination]}
                  spaceBetween={50}
                  navigation
                  slidesPerView={
                    window.screen.width <= 640
                      ? 1
                      : book.imgs.book.length <= 2
                      ? book.imgs.book.length + 1
                      : 2
                  }
                >
                  {imgPreview.map((img) => {
                    return (
                      <>
                        <SwiperSlide>
                          <img
                            className="h-auto w-auto   rounded-md"
                            src={img}
                            alt=""
                          />
                        </SwiperSlide>
                      </>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
