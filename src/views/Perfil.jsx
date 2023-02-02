import { useContext, useState, useEffect } from "react";
import Context from "../Context";
import axios from "axios";
import Swal from "sweetalert2";

export default function Home() {
  const { setUsuario: setUsuarioGlobal } = useContext(Context);

  const [usuario, setUsuarioLocal] = useState({});

  const getUsuarioData = async () => {
    const urlServer = process.env.REACT_APP_BASE_URL;
    const endpoint = "/usuarios";
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.get(urlServer + endpoint, {
        headers: { Authorization: "Bearer " + token },
      });
      setUsuarioGlobal(data);
      setUsuarioLocal(data);
      
    } catch ({ response: { data: message } }) {
      Swal.fire({
        icon: 'error',
        title: `${message} 🙁`
      });
      console.log(message);
    }
  };

  useEffect(() => {
    getUsuarioData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="py-5">
      <h1>
        Bienvenido <span className="fw-bold">{usuario.email}</span>
      </h1>
      <h3>
        {usuario.rol} en {usuario.lenguage}
      </h3>
    </div>
  );
}
