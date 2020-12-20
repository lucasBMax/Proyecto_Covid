import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function App() {
  const [data, setData] = useState([]);

  const baseURL = "https://localhost:44353/api/Report";

  const peticionGet = async () => {
    await axios
      .get(baseURL)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div className="App">
      <table className="table table-bordered">
        <thead>
          <th>Id</th>
          <th>Acciones</th>
        </thead>
        <tbody>
          {data.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>
                <button className="btn btn-primary">Editar</button>{" "}
                <button className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    <Modal>
      <ModalHeader>Insertar registro Covid</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Fecha reporte web</label>
          <br />
          <input type="date" className="form-control"></input>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary">Insertar</button>{" "}
        <button className="btn btn-danger">Cancelar</button>
      </ModalFooter>
    </Modal>

    </div>
  );
}

export default App;
