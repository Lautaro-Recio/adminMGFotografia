
export default function Configuration(props) {
    const {
        book,
        viewConfiguration,
        header,
        presentation1,
        presentation2,
        img
      } = {
        ...props,
      };
  return (
    <div className="grid gap-1 p-2">
    <label
      htmlFor=""
      className=" flex gap-2 justify-start items-center  "
    >
      <p className="ml-2 p-2 rounded-md">Header</p>
      <button
        className={`text-2xl bg-white h-6 w-6  rounded-sm ${
          header === img.img.result
            ? "text-green-500"
            : "text-red-500"
        }`}
        onClick={(e) => {
          e.preventDefault();
          viewConfiguration(
            book.bookName,
            img.img.result,
            "header"
          );
        }}
      >
        {header === img.img.result ? (
          <ion-icon name="checkmark-outline"></ion-icon>
        ) : (
          <ion-icon name="close-outline"></ion-icon>
        )}
      </button>
    </label>

    <label
      htmlFor=""
      className=" flex gap-2 justify-start items-center  "
    >
      <p className="ml-2 p-2 rounded-md">
        Img de presentacion 1
      </p>
      <button
        className={`text-2xl bg-white h-6 w-6  rounded-sm ${
          presentation1 === img.img.result
            ? "text-green-500"
            : "text-red-500"
        }`}
        onClick={(e) => {
          e.preventDefault();
          viewConfiguration(
            book.bookName,
            img.img.result,
            "presentation1"
          );
        }}
      >
        {presentation1 === img.img.result ? (
          <ion-icon name="checkmark-outline"></ion-icon>
        ) : (
          <ion-icon name="close-outline"></ion-icon>
        )}
      </button>
    </label>

    <label
      htmlFor=""
      className=" flex gap-2 justify-start items-center  "
    >
      <p className="ml-2 p-2 rounded-md">
        Img de presentacion 2
      </p>
      <button
        className={`text-2xl bg-white h-6 w-6  rounded-sm ${
          presentation2 === img.img.result
            ? "text-green-500"
            : "text-red-500"
        }`}
        onClick={(e) => {
          e.preventDefault();
          viewConfiguration(
            book.bookName,
            img.img.result,
            "presentation2"
          );
        }}
      >
        {presentation2 === img.img.result ? (
          <ion-icon name="checkmark-outline"></ion-icon>
        ) : (
          <ion-icon name="close-outline"></ion-icon>
        )}
      </button>
    </label>
  </div>
  )
}
