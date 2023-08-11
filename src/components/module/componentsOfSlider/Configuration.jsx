import ButtonCheck from "./ButtonCheck";

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
        className="m-2 w-3/4 rounded-md p-[1px] disabled:text-white bg-formGray disabled:bg-disabled  border-2 border-pink-200"
        onChange={(e) => {
          uploadName(e, book.bookName, e.target.value, i);
        }}
      />
      <ButtonCheck
        img={img}
        edit={edit}
        value={header}
        viewConfiguration={viewConfiguration}
        book={book}
        p={"Header"}
        toUpload={"header"}
      />
      <ButtonCheck
        img={img}
        edit={edit}
        value={presentation1}
        viewConfiguration={viewConfiguration}
        book={book}
        p={"Img de presentacion 1"}
        toUpload={"presentation1"}
      />
      <ButtonCheck
        img={img}
        edit={edit}
        value={presentation2}
        viewConfiguration={viewConfiguration}
        book={book}
        p={"Img de presentacion 2"}
        toUpload={"presentation2"}
      />

      

      <input
        placeholder={`Posicion: ${img.img.position} `}
        type="number"
        disabled={img.img.result === edit ? false : true}
        className="mx-2 my-[5px] w-3/4 rounded-md p-[1px] disabled:text-white border-2 border-pink-200 bg-formGray disabled:bg-disabled"
        min={1}
        onChange={(e) => {
          viewPositions(e, book.bookName, e.target.value, i);
        }}
      />
    </div>
  );
}
