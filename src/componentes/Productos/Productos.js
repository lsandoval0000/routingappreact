import React, { Component } from 'react';
import Producto from '../Producto/Producto';
import './Productos.css';
import Buscador from '../Buscador/Buscador';

class Productos extends Component {
    render() {
        return (
            <div className="productos">
                <h2>NUESTOS PRODUCTOS</h2>
                <Buscador
                    busqueda = {this.props.busquedaProducto}
                />
                <ul className="lista-productos">
                    {Object.keys(this.props.productos).map( producto =>(
                        <Producto
                            informacion = {this.props.productos[producto]}
                            key= {producto}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default Productos;