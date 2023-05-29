
export default function NewBook(props) {
    const {BooksOnUpload, addNewBook,setAddNewBook,setBooksOnUpload} = {...props}
  
    return (
    <>
        <div className="flex mb-2">
            <p>Quieres agregar un nuvevo book?</p>
            <input disabled={BooksOnUpload && true} className="ml-2 text-black" type="checkbox" name="" checked={addNewBook} onClick={()=>addNewBook ? setAddNewBook(false) : setAddNewBook(true) } id="" />
        </div>

        {addNewBook &&
            <label htmlFor="">
                Agregar nuevo Book
                <input className="rounded-md ml-2 text-black p-2" type="text" onChange={e => {setBooksOnUpload(e.target.value)}}/>
            </label>
        }
    </>
  )
}
