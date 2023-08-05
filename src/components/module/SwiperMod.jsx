import Slider from "./Slider";
export default function SwiperMod(props) {
  const {
    WhoMod,
    book,
    classOfContainer,
    classOfPics,
    setImageAndBook,
    getData,
    handleSubmit,
    reset,
    setPosition,
    setNameOfImg,
    updateData,
    viewConfiguration,
    header,
    presentation1,
    presentation2,
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
        <Slider
          book={book}
          WhoMod={WhoMod}
          getData={getData}
          setImageAndBook={setImageAndBook}
          classOfPics={classOfPics}
          handleSubmit={handleSubmit}
          reset={reset}
          setPosition={setPosition}
          setNameOfImg={setNameOfImg}
          updateData={updateData}
          viewConfiguration={viewConfiguration}
          presentation1={presentation1}
          presentation2={presentation2}
          header={header}
        />
      </div>
    </>
  );
}
