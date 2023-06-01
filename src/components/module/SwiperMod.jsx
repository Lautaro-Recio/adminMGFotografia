import { toast } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import VerificationToast from "../Toasts/VerificationToast";
import { Navigation, Pagination } from "swiper";

export default function SwiperMod(props) {
  const {
    WhoMod,
    book,
    classOfContainer,
    classOfPics,
    setImageAndBook,
    getData,
  } = { ...props };
  return (
    <>
      <div
        className={
          WhoMod == book.bookName
            ? classOfContainer
            : "opacity-0 h-0 transition"
        }
      >
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          navigation
          pagination={{ clickable: true }}
          slidesPerView={
            book.imgs.book.length <= 4 ? book.imgs.book.length + 1 : 4
          }
        >
          {console.log(book.imgs.book.length)}
          {book.imgs.book.map((img) => {
            return (
              /* Hacer animacion fade in para las imagenes y solucionar el problema para que se vea el swiper aunque sean menos de 4 slides */
              <>
                <SwiperSlide key={img.img.result}>
                  <div
                    className={`w-40 h-40 mx-2 transition-all duration-700  ${
                      WhoMod == book.bookName ? "opacity-100" : "opacity-0"
                    } `}
                  >
                    <img
                      className="w-40 h-40 rounded-md  border-2 border-borderGray "
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
                      className="w-40 h-40 rounded-md mx-2  absolute opacity-0 top-0 left-0 flex justify-center items-center text-5xl duration-500 transition-all hover:bg-darkRed hover:opacity-100"
                    >
                      <ion-icon name="trash-outline"></ion-icon>{" "}
                    </button>
                  </div>
                </SwiperSlide>
              </>
            );
          })}
          <SwiperSlide className="!w-full">
            <div
              className={classOfPics}
              onClick={() => {
                document
                  .querySelector(`#${book.bookName.split(" ").join("")}`)
                  .click();
              }}
            >
              <input
                type="file"
                id={book.bookName.split(" ").join("")}
                accept="image/*"
                onChange={(e) => {
                  setImageAndBook(e.target.files[0], book.bookName);
                }}
                className="w-20 h-20 rounded-md opacity-0"
              />
              <p
                className={`text-6xl  rounded-md mb-2 w-40 h-40 t-12 flex justify-center items-center border-dashed border-2 bg-Gray border-borderGray absolute hover:bg-menuGray  duration-700 transition-all cursor-pointer`}
              >
                +
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}