import ButtonsOfForm from "../FormContainer/ButtonsOfForm";

export default function NewBook(props) {
  const {
    BooksOnUpload,
    addNewBook,
    setAddNewBook,
    setBooksOnUpload,
    setParrafsOnUpload,
    setParragefOrImage,
    setOrder,
    handleSubmit,
    reset,
    dis,
    comprobe
  } = {
    ...props,
  };
  return (
    <>
      <div className="flex mb-2">
        <p>Quieres agregar un nuvevo book?</p>
        <input
          disabled={BooksOnUpload && true}
          className="ml-2 text-black"
          type="checkbox"
          name=""
          checked={addNewBook}
          onClick={() =>
            addNewBook ? setAddNewBook(false) : setAddNewBook(true)
          }
          id=""
        />
      </div>
      {addNewBook && (
        <div>
          <div className="md:flex gap-4 w-full">
            <label htmlFor="w-1/4 block">
              <p>Nombre nuevo Book</p>
              <input
                className="rounded-md ml-2 text-black p-2"
                type="text"
                onChange={(e) => {
                  setBooksOnUpload(e.target.value);
                  setParragefOrImage(false);
                  comprobe()
                }}
              />
            </label>
            <label className="w-3/4 justify-center items-center" htmlFor="">
              <p>Parrafo del book</p>
              <textarea
                className="rounded-md max-h-16   ml-2 w-full  text-black p-2"
                type="text-area"
                onChange={(e) => {
                  setParrafsOnUpload(e.target.value);
                  setParragefOrImage(true);
                  comprobe()
                }}
              />
            </label>
            <label className="w-16 justify-center items-center" htmlFor="">
              <p>Orden</p>
              <input
                className="rounded-md  ml-2 w-full  text-black p-2"
                type="number"
                min={1}
                onChange={(e) => {
                  setOrder(e.target.value);
                  comprobe()
                }}
              />
            </label>
          </div>

          <ButtonsOfForm dis={dis} handleSubmit={handleSubmit} reset={reset} />
        </div>
      )}
    </>
  );
}
