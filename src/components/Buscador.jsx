import React from "react";
import { useState, useEffect } from "react";

const Buscador = ({ buscar }) => {
  const [paises, setPaises] = useState([]); //almacena en un array la informacion de la API
  const [buscadorPaises, setBuscadorPaises] = useState(""); //almacena el valor del input
  const [sortOption, setSortOption] = useState("1"); //almacena el valor del select

  useEffect(() => {
    setPaises(buscar);
  }, [buscar]); //actualiza el estado de paises con el valor de buscar

  const filtroPaises = paises.filter((paises) => {
    //constante filtra los paises por nombre, capital o poblacion
    const searchedValue = buscadorPaises.toLowerCase();
    return (
      paises.name?.toLowerCase().includes(searchedValue) ||
      paises.capital?.toLowerCase().includes(searchedValue) ||
      paises.population?.toString().includes(searchedValue)
    );
  });

  const sortPaises = (paises) => {
    //ordena los paises por nombre de forma ascendente o descendente
    const sortedPaises = [...paises];
    if (sortOption === "1") {
      sortedPaises.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "2") {
      sortedPaises.sort((a, b) => b.name.localeCompare(a.name));
    }
    return sortedPaises;
  };
  const sortedPaises = sortPaises(filtroPaises); //almacena los paises filtrados y ordenados
  const handleChangeSearch = (event) => {
    //actualiza el estado de buscadorPaises con el valor del INPUT
    setBuscadorPaises(event.target.value);
  };
  const handleChangeSort = (event) => {
    setSortOption(event.target.value); //actualiza el estado de sortOption con el valor del select
  };

  return (
    //muestra los paises filtrados y ordenados
    <div className="row mt-0">
      <nav id="headerNavbar" className="navbar row">
        <a id="buskdor" className="navbar-brand col- m-4 ">
          Buscador de Paises y su Bandera
        </a>
        <div className="container-fluid col-8">
          <form className="d-flex" role="search">
            <select
              className="form-select me-2"
              id="select"
              aria-label="Default select example"
              onChange={handleChangeSort}
            >
              <option value="1">Orden A-Z</option>
              <option value="2">Orden Z-A</option>
            </select>
            <input
              className="form-control me-8"
              type="search"
              placeholder="Buscar país"
              aria-label="Search"
              onChange={handleChangeSearch}
            />
          </form>
        </div>
      </nav>
      <div id="mycard" className="row d-flex justify-content-around">
        {sortedPaises.map((paises) => (
          <div className="card m-2 col-2" key={paises.numericCode}>
            <img
              src={paises.flag}
              style={{ height: "180px", Width: "240px" }}
              className="card-img-top ps-1 mt-6"
              alt={paises.name}
            />
            <div className="card-body">
              <h4 className="card-text">{paises.name}</h4>
              <h6 className="card-text">Capital: {paises.capital}</h6>
              <p className="card-text" style={{ fontSize: "20px" }}>
                Población: {paises.population} personas
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buscador;
