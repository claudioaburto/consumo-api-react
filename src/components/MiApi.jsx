import { useState, useEffect } from "react";
import Buscador from "./Buscador";
import "bootstrap/dist/css/bootstrap.min.css";

function MiApi() {
  const [data, setData] = useState([]); //almacena en un array la informacion de la API
  const urlApi = "https://restcountries.com/v2/all";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlApi);
        const data = await response.json();
        setData(data);
        return;
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []); //con array vacio para que ejecute en el montaje

  return (
    <div style={{ minHeight: "100vh" }}>
      <Buscador buscar={data} />
    </div>
  );
}

export default MiApi;
