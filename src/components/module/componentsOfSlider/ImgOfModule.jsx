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
    setView,
    i,
  } = {
    ...props,
  };

  const bodyChange = document.querySelector("#body");
  return (
    <>
      <div className=" md:grid md:grid-cols-2 h-4/5 w-full p-2 ">
        <div className=" flex justify-center items-center">
          <div className="relative">
            <img
              className="md:w-auto md:h-full  rounded-md md:max-h-[400px] max-h-[200px] "
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
              className="w-10 h-10 md:w-20 md:text-3xl md:h-20 rounded-br-full rounded-tl-md justify-center absolute top-0 left-0 items-center text-xl duration-500 transition-all bg-darkRed hover:w-40 hover:h-40 hover:opacity-100 hover:text-2xl"
            >
              <ion-icon name="trash-outline"></ion-icon>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                setView(img.img.result);
                window.scroll(0, 0);
                bodyChange.classList.add("overflow-hidden");
              }}
              className="w-10 h-10 md:w-20 md:text-3xl md:h-20 rounded-bl-full rounded-tr-md justify-center absolute top-0 right-0 items-center text-xl duration-500 transition-all bg-expand hover:w-40 hover:h-40 hover:opacity-100 hover:text-2xl"
            >
              <ion-icon name="search-outline"></ion-icon>
            </button>

            {img.img.result === edit ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  SetEdit("");
                }}
                className="w-10 h-10 md:w-20 md:text-3xl md:h-20 rounded-tr-full rounded-bl-md justify-center absolute bottom-0 left-0 items-center text-xl duration-500 transition-all hover:w-40 hover:h-40 bg-save hover:opacity-100 hover:text-2xl"
              >
                <ion-icon name="save-outline"></ion-icon>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault(), SetEdit(img.img.result);
                }}
                className="w-10 h-10 md:w-20 md:text-3xl md:h-20 rounded-tr-full rounded-bl-md  justify-center absolute bottom-0 left-0 items-center text-xl duration-500 transition-all hover:w-40 hover:h-40 bg-yellowButton hover:opacity-100 hover:text-2xl"
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
    </>
  );
}
