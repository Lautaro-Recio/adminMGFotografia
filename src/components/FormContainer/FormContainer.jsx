import { useEffect, useState } from "react";
import { uploadFile, db, uploadData } from "../../../Firebase";
import { collection, getDocs } from "firebase/firestore";
import Module from "../../components/module/Module";
import logo from "../../assets/logo.png";
import NewBook from "../module/NewBook";
import SignOut from "../SignIn/SignOut";
import { Toaster, toast } from "react-hot-toast";
export default function FormContainer(props) {
  const { SignOutGoogle } = { ...props };
  const [File, setFile] = useState("");
  const [BooksOnDB, setBooksOnDB] = useState([]);
  const [BooksOnUpload, setBooksOnUpload] = useState("");
  const [addNewBook, setAddNewBook] = useState(false);
  const [parraf, setParrafsOnUpload] = useState("");
  const [order, setOrder] = useState(0);

  const getData = async () => {
    const dbCollection = await getDocs(collection(db, "books"));
    try {
      const booksOnFirebase = [];
      dbCollection.forEach((doc) => {
        const book = { bookName: doc.id, imgs: doc.data() };
        booksOnFirebase.push(book);
      });
      setBooksOnDB(booksOnFirebase);
    } catch (error) {
      console.error(error);
    }
  };
  const reset = (e) => {
    e.preventDefault();
    setFile("");
    setBooksOnUpload("");
    setAddNewBook(false);
    toast.success("Formulario Reseteado");
  };

  useEffect(() => {
    getData();
  }, []);

  const imgFile = async (file, e) => {
    const result = file && (await uploadFile(file));
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth();
    const FullYear = newDate.getFullYear();
    const DateToDB = `${date}/${month}/${FullYear}`;
    const position = "";
    const img = {
      result,
      DateToDB,
      position,
      nameOfImg: file.name,
    };
    console.log(file)
    file === "undefined" && (await uploadData(BooksOnUpload, parraf, true, order));
    file && (await uploadData(BooksOnUpload, img, false, order));
    reset(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(File)

    try {
      if (File === "") {
        imgFile("undefined");
      } else {
        for (let i = 0; i < File.length; i++) {
          imgFile(File[i], e);
        }
      }
      getData();
      reset(e);
      toast.success("Informacion actualizada!");
    } catch (error) {
      console.error(error);
      toast.error("Fallo al subir, intente mas tarde");
    }
  };
  return (
    <>
      <div className="text-white bg-formGray border-[1px] md:rounded-xl rounded-none p-4  border-borderGray md:m-2  h-full">
        <div className="flex justify-around items-center ">
          <img className="w-26 h-20 mx-4" src={logo} alt="" />
          <SignOut SignOutGoogle={SignOutGoogle} />
        </div>
        <h4 className="text-xl text-white">Formulario subida de imagenes</h4>
        <form className="block ">
          <div className=" my-4 p-2 rounded-md ">
            <div className="flex justify-between pr-10 text-2xl items-center">
              <h4 className="text-white ml-6 ">Selecciona un book</h4>

              <button
                className="text-2xl flex justify-center items-center gap-4 border-2 border-white p-2 rounded-md"
                onClick={(e) => {
                  e.preventDefault()
                  getData();
                }}
              >
                Recargar datos <ion-icon name="refresh-outline"></ion-icon>
              </button>
            </div>
            {BooksOnDB.length > 0 && (
              <Module
                BooksOnDB={BooksOnDB}
                getData={getData}
                setFile={setFile}
                setBooksOnUpload={setBooksOnUpload}
                setParrafsOnUpload={setParrafsOnUpload}
                handleSubmit={handleSubmit}
                reset={reset}
              />
            )}
            <NewBook
              setParrafsOnUpload={setParrafsOnUpload}
              BooksOnUpload={BooksOnUpload}
              addNewBook={addNewBook}
              setAddNewBook={setAddNewBook}
              setBooksOnUpload={setBooksOnUpload}
              setOrder={setOrder}
              handleSubmit={handleSubmit}
              reset={reset}
            />
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
}
