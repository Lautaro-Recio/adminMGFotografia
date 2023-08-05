import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ButtonsOfForm from "../../FormContainer/ButtonsOfForm";

export default function NewPicture(props) {
  const {
    book,
    setImageAndBook,
    handleSubmit,
    reset,
    SetImgPreview,
    imgPreview,
  } = {
    ...props,
  };

  const preview = (file) => {
    const previewArray = [];
    for (let i = 0; i < file.length; i++) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file[i]);
      fileReader.onload = () => {
        previewArray.push(fileReader.result);
        SetImgPreview(previewArray);
      };
    }
  };
  return (
    <div className="bg-gray-500 p-4 flex">
      <div className="w-1/3  ">
        <h4>Importacion </h4>

        <label className=" p-4 " htmlFor="">
          <p className="p-4">Archivos</p>
          <input
            multiple
            accept="image/*"
            onChange={(e) => {
              setImageAndBook(e.target.files, book.bookName, book.length);
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
  );
}
