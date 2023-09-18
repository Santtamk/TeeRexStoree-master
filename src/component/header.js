import React from "react";
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import { Button } from "@mui/material";
import "./header.css";


export default function Header({size, setShow}) {


    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                
                <div className="navbar-header">
                <Button   className="btn btn-dark" onClick={() =>setShow(true)}><h3>TeeRex Store</h3></Button>
                </div>

                <div className="nav navbar-nav navbar-right">
                <Button variant="light" startIcon={<ShoppingCartSharpIcon />} onClick={() =>setShow(false)}> {size}</Button>
                </div>

            </div>
        </nav>
    )
}