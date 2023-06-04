import { useEffect, useState } from "react";
import { uploadFile, db, uploadData } from "../../../Firebase";
import { collection, getDocs } from "firebase/firestore";
import Module from "../../components/module/Module";
import logo from "../../assets/logo.png";
import NewBook from "../module/NewBook";
import SignOut from "../SignIn/SignOut";
import { Toaster, toast } from "react-hot-toast";
import ButtonsOfForm from "./ButtonsOfForm"
export default function FormContainer(props) {
  const { SignOutGoogle } = { ...props };
  const [File, setFile] = useState("");
  const [BooksOnDB, setBooksOnDB] = useState([]);
  const [BooksOnUpload, setBooksOnUpload] = useState("");
  const [addNewBook, setAddNewBook] = useState(false);
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
    setFile();
    setBooksOnUpload();
    setAddNewBook();
    toast.success('Formulario Reseteado')
  };
  useEffect(() => {
    getData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = File && (await uploadFile(File));
      const newDate = new Date()
      const date = newDate.getDate()
      const month = newDate.getMonth()
      const FullYear = newDate.getFullYear()
      const DateToDB = `${date}/${month}/${FullYear}`
      const img = {
        result,
        DateToDB
      };
      !File && (await uploadData(BooksOnUpload));
      File && (await uploadData(BooksOnUpload, img));
      await getData();
      reset(e);
      toast.success('Informacion actualizada!')
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
            <h4 className="text-white ml-6 text-xl">Selecciona un book</h4>
            {BooksOnDB.length > 0 && (
              <Module
                BooksOnDB={BooksOnDB}
                getData={getData}
                setFile={setFile}
                setBooksOnUpload={setBooksOnUpload}
              />
            )}
            <NewBook
              BooksOnUpload={BooksOnUpload}
              addNewBook={addNewBook}
              setAddNewBook={setAddNewBook}
              setBooksOnUpload={setBooksOnUpload}
            />
          </div>
          <ButtonsOfForm handleSubmit={handleSubmit} reset={reset}/>
        </form>
      </div>
      <Toaster />
    </>
  );
}
