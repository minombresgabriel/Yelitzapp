const Boton = (props) =>{

const darleclick = (name,price) =>{
    
    console.log(name,price)

}

const handleClick = () => {
    // Verifica si se ha pasado una función como prop y la llama con los argumentos adecuados
    if (props.onClick) {
      props.onClick(props.name, props.price);
    }
  };


return (

    <button
    className="w-100 btn btn-light border mb-2"
    onClick={() => handleClick()}
  >
   {props.name}
  </button>
)



}

export default Boton;