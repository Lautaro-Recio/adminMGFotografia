import { toast } from "react-hot-toast";
import VerificationToast from "../../Toasts/VerificationToast";
import Configuration from "./Configuration";

export default function ImgOfModule(props) {
  const {
    book,
    getData,
    viewConfiguration,
    header,
    presentation1,
    presentation2,
    img,
    edit,
    uploadName,
    SetEdit,
    viewPositions,
    i,
  } = {
    ...props,
  };

  return (
    <div className=" grid grid-cols-2 h-4/5 w-full p-2 ">
      <div className=" flex justify-center items-center">
        <div className="relative">
          <img
            className="w-auto h-full  rounded-md max-h-[400px] "
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
            className="w-20 h-20 rounded-br-full rounded-tl-md md:mx-[0%] mx-[20%] justify-center absolute top-0 left-0 items-center text-3xl duration-500 transition-all bg-darkRed hover:w-40 hover:h-40 hover:opacity-100 hover:text-5xl"
          >
            <ion-icon name="trash-outline"></ion-icon>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault()
              alert("Hola")
            }}
            className="w-20 h-20 rounded-bl-full rounded-tr-md md:mx-[0%] mx-[20%] justify-center absolute top-0 right-0 items-center text-3xl duration-500 transition-all bg-expand hover:w-40 hover:h-40 hover:opacity-100 hover:text-5xl"
          >
            <ion-icon name="search-outline"></ion-icon>
          </button>

          {img.img.result === edit ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                SetEdit("");
              }}
              className="w-20 h-20 rounded-tr-full rounded-bl-md md:mx-[0%] mx-[20%] justify-center absolute bottom-0 left-0 items-center text-3xl duration-500 transition-all hover:w-40 hover:h-40 bg-save hover:opacity-100 hover:text-5xl"
            >
              <ion-icon name="save-outline"></ion-icon>
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault(), SetEdit(img.img.result);
              }}
              className="w-20 h-20 rounded-tr-full rounded-bl-md md:mx-[0%] mx-[20%] justify-center absolute bottom-0 left-0 items-center text-3xl duration-500 transition-all hover:w-40 hover:h-40 bg-yellowButton hover:opacity-100 hover:text-5xl"
            >
              <ion-icon name="create-outline"></ion-icon>
            </button>
          )}
        </div>
      </div>

      <Configuration
        book={book}
        viewConfiguration={viewConfiguration}
        header={header}
        presentation1={presentation1}
        presentation2={presentation2}
        img={img}
        uploadName={uploadName}
        i={i}
        edit={edit}
        viewPositions={viewPositions}
      />
    </div>
  );
}
