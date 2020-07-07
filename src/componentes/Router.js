import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Nosotros from './Nosotros/Nosotros';
import Error from './Error/Error';
import Productos from './Productos/Productos';
import Header from './Header/Header';
import SingleProducto from './SingleProducto/SingleProducto';
import Navegacion from './Navegacion/Navegacion';
import Contacto from './Contacto/Contacto';
import infoProductos from '../datos/datos.json';

class Router extends Component {

    constructor(props){
        super(props);
        this.state = {
            terminoBusqueda: '',
            productos : []
        };
    }

    componentDidMount() {
        this.setState({
            productos: infoProductos
        });
    }

    busquedaProducto = (busqueda)=>{
        if(busqueda.length > 3){
            this.setState({
                terminoBusqueda: busqueda
            });
        }else{
            this.setState({
                terminoBusqueda: ''
            });
        }
    }

    render() {
        let productos = [...this.state.productos];
        let busqueda = this.state.terminoBusqueda;
        let resultado;

        if(busqueda !== ''){
            resultado = productos.filter( (producto) => (
                producto.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1
            ));
        }else{
            resultado = productos;
        }

        return (
            <BrowserRouter>
                <Header/>
                <Navegacion/>
                <Switch>
                    <Route exact path="/" render={ () =>(
                        <Productos
                            productos = {resultado}
                            busquedaProducto = {this.busquedaProducto}
                        />
                    )} />
                    <Route exact path="/nosotros" component={Nosotros} />
                    <Route exact path="/productos" render={ () =>(
                        <Productos
                            productos = {resultado}
                            busquedaProducto = {this.busquedaProducto}
                        />
                    )} />
                    <Route exact path="/productos/:productoId" render={ (props) =>(
                        <SingleProducto
                            producto = {this.state.productos[props.match.params.productoId]}
                            key={props.match.params.productoId}
                        />
                    )} />
                    <Route exact path="/contacto" component={Contacto} />
                    <Route component={Error} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;