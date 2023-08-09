export default function Configuration(props) {
  const {
    book,
    viewConfiguration,
    header,
    presentation1,
    presentation2,
    uploadName,
    edit,
    img,
    viewPositions,
    i,
  } = {
    ...props,
  };
  return (
    <div className="grid gap-1 p-2">
      <input
        placeholder={`Nombre img: ${img.img.nameOfImg} `}
        type="text"
        disabled={img.img.result === edit ? false : true}
        className="m-2 w-3/4 rounded-md p-[1px] text-black"
        onChange={(e) => {
          uploadName(e, book.bookName, e.target.value, i);
        }}
      />
      <label htmlFor="" className=" flex gap-2 justify-start items-center  ">
        <p className="ml-2 p-2 rounded-md">Header</p>
        <button
          disabled={img.img.result === edit ? false : true}
          className={`text-2xl ${
            img.img.result === edit ? "bg-white" : "bg-disabled"
          } h-6 w-6  rounded-sm ${
            header === img.img.result ? "text-green-500" : "text-red-500"
          }`}
          onClick={(e) => {
            e.preventDefault();
            viewConfiguration(book.bookName, img.img.result, "header");
          }}
        >
          {header === img.img.result ? (
            <ion-icon name="checkmark-outline"></ion-icon>
          ) : (
            <ion-icon name="close-outline"></ion-icon>
          )}
        </button>
      </label>

      <label htmlFor="" className=" flex gap-2 justify-start items-center  ">
        <p className="ml-2 p-2 rounded-md">Img de presentacion 1</p>
        <button
          disabled={img.img.result === edit ? false : true}
          className={`text-2xl ${
            img.img.result === edit ? "bg-white" : "bg-disabled"
          } h-6 w-6  rounded-sm ${
            presentation1 === img.img.result ? "text-green-500" : "text-red-500"
          }`}
          onClick={(e) => {
            e.preventDefault();
            viewConfiguration(book.bookName, img.img.result, "presentation1");
          }}
        >
          {presentation1 === img.img.result ? (
            <ion-icon name="checkmark-outline"></ion-icon>
          ) : (
            <ion-icon name="close-outline"></ion-icon>
          )}
        </button>
      </label>

      <label htmlFor="" className=" flex gap-2 justify-start items-center  ">
        <p className="ml-2 p-2 rounded-md">Img de presentacion 2</p>
        <button
          disabled={img.img.result === edit ? false : true}
          className={`text-2xl ${
            img.img.result === edit ? "bg-white" : "bg-disabled"
          } h-6 w-6  rounded-sm ${
            presentation2 === img.img.result ? "text-green-500" : "text-red-500"
          }`}
          onClick={(e) => {
            e.preventDefault();
            viewConfiguration(book.bookName, img.img.result, "presentation2");
          }}
        >
          {presentation2 === img.img.result ? (
            <ion-icon name="checkmark-outline"></ion-icon>
          ) : (
            <ion-icon name="close-outline"></ion-icon>
          )}
        </button>
      </label>
      <input
        placeholder={`Posicion: ${img.img.position} `}
        type="number"
        disabled={img.img.result === edit ? false : true}
        className="mx-2 my-[5px] w-3/4 rounded-md p-[1px] text-black"
        min={1}
        onChange={(e) => {
          viewPositions(e, book.bookName, e.target.value, i);
        }}
      />
    </div>
  );
}
