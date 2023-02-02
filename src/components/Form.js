import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios"
export default function Form() {
    const [usuario, setUsuario] = useState({});

    const registrarUsuario = async () => {
        try {
            await axios.post(process.env.REACT_APP_BASE_URL, {usuario})
            Swal.fire({
                icon: 'success',
                title: 'Usuario agregado con éxito'    
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Algo salió mal'
            })
            console.log(error)
        }

    };

    return (
        <div>
            <input
                value={usuario.email}
                onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
            />
            <input
                value={usuario.password}
                onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
            />
            <button onClick={registrarUsuario}> Registrarse </button>
        </div>
    );
}
