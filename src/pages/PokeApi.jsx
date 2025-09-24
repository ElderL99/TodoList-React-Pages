import { useState, useEffect } from "react";
import { PokeIndex } from "../components/pokeapi";

export function PokoPage() {
  const [count, setCount] = useState(0);

  /* useEffect recibe dos parametros,  
  1.una funcion 
  2. un array de depenencias 
  */

  useEffect(() => {
    console.log("esto es useEffect sin dependencias");
  }, []);

  /* se ejecuta en dos ocaciones 
  1 cuando el componente se monta o renderiza
  2 cuand alguna de las depedencias cambia */

  useEffect(() => {
    console.log(`useEfecct con depedencias ${count}`);
  }, [count]); // la dependencia es un estado en este caso count y tambine podemos agregar mas estados a la dependencia

  // debemos evitar el uso de useEffect sin el arreglo para que no se ejecute siempre que hay un cambio de estado

  /*  useEffect(() => {
    console.log("useEffect sin arreglo []");
  }); */

  /* si quiere que algo e renderice cada que se actualice el componente hazlo afuera de un useEffect */
  /* ejemplo */
  console.log("render");

  return (
    <div>
      <PokeIndex />

      <button
        className="bg-yellow-300 text-black font-bold size-20"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}
      </button>
    </div>
  );
}
