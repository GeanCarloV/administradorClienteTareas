// cliente_mern > src > componentes > auth > login.js 
import React, {Fragment, useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autentificacion/authContext';

const Login = (props) => {

    // extraemos los valores del context 
     const alertaContext = useContext(AlertaContext); 
     const { alerta, mostrarAlerta } = alertaContext;
 
     const authContext = useContext(AuthContext); 
     const { mensaje, autenticado, iniciarSesion } = authContext;
    
    // para mandar mensaje de error del bacjen al otro state
    useEffect(() => { 
        if(autenticado) { 
            props.history.push('/proyectos');
        }
        if(mensaje) { 
            mostrarAlerta(mensaje.msg, mensaje.categoria); 
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);


    // state para iniciar ssecion 
    const [usuario, guardarUsario] = useState({ 
        email: '', 
        password: ''
    });

    // extraer del usario 
    const { email, password } = usuario; 


    const onChange = (e) => { 
        // hacemos el codigo de con vlaue y los id guardamos en el state 
        guardarUsario({
            ...usuario, 
            [e.target.name] : e.target.value
        })
    } 

    // cuando el usario quiere inicuar cesion
    const onSubmit = (e) => { 
         e.preventDefault(); 
        //  validar que no esten los campos vacion 
        if(email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error'); 
            return
        }
        // pasarlo al accion 
        // mandamos en obetjos el email y password 
        iniciarSesion({ email, password}); 

    }

    return ( 
        <Fragment>
        <div className="encambesado">
            <div className="logo">
                <h1>Gestor de Metas</h1>
                <h2> <span>By</span> Gean Carlo Vitorino</h2>
            </div>
            <div className="pasos">
                <div className="numero" >
                    <p >1</p>                
                </div>
                <p>Create una cuenta</p>
                <div className="numero" >
                    <p>2</p>                
                </div>
                <p>Ingresa</p>
                <p>Creata tus metas</p>
                <div className="numero" >
                    <p>3</p>                
                </div>
                <p>En cada meta, pon pasos especificos</p>
                <p>Dale completar, con cada avance</p>
                <p>premiate cuando todos los pasos esten completos</p>
                <div className="numero" >
                    <p>4</p>                
                </div>
                <p>Disfruto y prospera</p>

            </div>
        </div>
        
        <div className="form-usuario">
             {/* aqui, se pone le state de alerta  */}
             {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) :  null }
            
            <div className="contenedor-form sombra-dark">
                
                <h1>Iniciar Sesion</h1>

                <form onSubmit={onSubmit}>
                   
                    <div className="campo-form">

                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange= {onChange}
                        />
                    </div>
                   
                    <div className="campo-form">

                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange= {onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesion" />
                    </div>

                </form>

                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>

            </div>
        </div>
        </Fragment>
     );
}
 
export default Login;