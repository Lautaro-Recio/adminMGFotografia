export default function ButtonCheck(props) {
  const { img, edit, value, viewConfiguration, book, p, toUpload } = {
    ...props,
  };
  return (
    <label htmlFor="" className=" flex gap-2 justify-start items-center  ">
      <p className="ml-2 p-2 rounded-md text-pink-300">{p}</p>
      <button
        disabled={img.img.result === edit ? false : true}
        className={`text-2xl ${
          img.img.result !== edit ? "bg-formGray" : "bg-disabled"
        } h-6 w-6  rounded-sm ${
          value === img.img.result ? "text-green-500" : "text-red-500"
        }`}
        onClick={(e) => {
          e.preventDefault();
          viewConfiguration(book.bookName, img.img.result, toUpload);
        }}
      >
        {value === img.img.result ? (
          <ion-icon name="checkmark-outline"></ion-icon>
        ) : (
          <ion-icon name="close-outline"></ion-icon>
        )}
      </button>
    </label>
  );
}
