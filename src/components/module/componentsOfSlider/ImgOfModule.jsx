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
    SetEdit,
    viewPositions,
    i
  } = {
    ...props,
  };
  return (
    <div className="relative ">
      <img
        className="w-40 h-40 rounded-md mx-[20%] my-4 border-2 border-borderGray "
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
      <Configuration
        book={book}
        viewConfiguration={viewConfiguration}
        header={header}
        presentation1={presentation1}
        presentation2={presentation2}
        img={img}
      />
      <input
        placeholder={`Posicion: ${img.img.position} `}
        type="number"
        disabled={img.img.result === edit ? false : true}
        className="mx-2 my-[5px] w-[93%] rounded-md p-[1px] text-black"
        min={1}
        onChange={(e) => {
          viewPositions(e, book.bookName, e.target.value, i);
        }}
      />
    </div>
  );
}
