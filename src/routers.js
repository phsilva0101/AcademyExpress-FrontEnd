import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/login";
import Alunos from "./components/Alunos/alunos";
import NovoAluno from './components/NovoAluno/novoAluno';

export default function Routers(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Login/>}/>
            <Route path="/alunos" element={<Alunos/>}/>
            <Route path="/aluno/novo/:alunoId" element={<NovoAluno/>}/>
        </Routes>
        </BrowserRouter>
    )
}