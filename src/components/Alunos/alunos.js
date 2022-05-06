import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import './alunos.css';
import api from '../../services/api';
import ImgBemVindo from '../../assets/bookVet.png'
import {AiFillCloseCircle} from 'react-icons/ai'

export default function Alunos(){

  const [alunos,setAlunos] = useState([])
  const [searchInput, setSearchInput] = useState('');
  const [filtro, setFiltro] = useState([]);

  const email= localStorage.getItem('email');
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const auth = {
    headers : {
      Authorization: 'Bearer ' + token
    }
  }

  useEffect(()=>{
    api.get('/api/Alunos', auth)
    .then( response =>{
      setAlunos(response.data)
    }, token)
  })

  const searchAlunos = (searchValue) => {
    setSearchInput(searchValue);

    if(searchValue !== ''){
      const dadosFiltrados = alunos.filter((item) => {
        return Object.values(item.nome).join('').toLowerCase().includes(searchValue.toLowerCase())
      })
      setFiltro(dadosFiltrados);
    }
    else{
      setFiltro(alunos)
    }
  }

  async function logout(){
    try {
      localStorage.clear();
      localStorage.setItem('token', '');
      auth.headers = '';
      navigate('/');
    } catch (error) {
      alert('Não foi possivel fazer o logout' + error)
    }
  }

  async function editar(id) {
    navigate(`/aluno/novo/${id}`)
  }

  async function deletar(id){
    try {
      if (window.confirm(`Deseja eletar o aluno de id = ${id}?`)) {
        await api.delete(`/api/alunos/${id}`,auth)
        setAlunos(alunos.filter(aluno => aluno.id !== id))
        
      }
    } catch (error) {
      alert('Não foi possivel excluir o aluno')
    }
  }


  return (
    <div className="aluno-container">
      <br/>
      <header>
        <img src={ImgBemVindo} alt="Bem vindo" id='imgBemVindo'></img>
        <span>Bem Vindo, <strong>{email}</strong>!</span>
        <Link className='button' to="/aluno/novo/0">Novo Aluno</Link>
        <button type='button' onClick={logout}><AiFillCloseCircle size={35} color="#17202a"/></button>
        <br/>
      </header>
      <form>
        <input onChange={(e)=>searchAlunos(e.target.value)} type='text' placeholder='Filtrar por Nome...'/>
       
      </form>
      <h1>Relação de alunos</h1>
      <table className='table table-bordered'>
        <thead>
          <th>Id</th>
          <th>Nome</th>
          <th>Email</th>
          <th>CPF</th>
          <th>Idade</th>
          <th>Cidade</th>
          <th></th>
        </thead>
        {searchInput !== '' ? (
        <tbody>
          {filtro.map(aluno => (
            <tr key = {aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.cpf}</td>
              <td>{aluno.idade}</td>
              <td>{aluno.cidade}</td>
              <td>
                <button className='btn btn-primary' onClick={()=> editar(aluno.id)}>Editar</button> {"    "}
                <button className='btn btn-danger' onClick={()=> deletar(aluno.id)} >Excluir</button>
              </td>
            </tr>
          ))}
         
        </tbody>

        ): (
          <tbody>
          {alunos.map(aluno => (
            <tr key = {aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.cpf}</td>
              <td>{aluno.idade}</td>
              <td>{aluno.cidade}</td>
              <td>
                <button className='btn btn-primary' onClick={()=> editar(aluno.id)}>Editar</button> {"    "}
                <button className='btn btn-danger' onClick={()=> deletar(aluno.id)} >Excluir</button>
              </td>
            </tr>
          ))}
         
        </tbody>
        )}
      </table>
    </div>
     );
    }