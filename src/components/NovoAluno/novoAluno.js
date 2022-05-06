import React, {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from 'react-router-dom';
import {GrReturn, GrUserAdd} from 'react-icons/gr';
import { Button } from "bootstrap";
import './novoAluno.css';
import api from "../../services/api";


export default function NovoAluno(){

    const {alunoId} = useParams();
    const [id, setId] = useState(null)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [idade, setIdade] = useState('')
    const [cidade, setCidade] = useState('')

    const data = {
        nome,email,cpf, idade, cidade
    }

    const emailStorage = localStorage.getItem('email');
    const token = localStorage.getItem('token')

    const auth = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    useEffect(()=>{
        if (alunoId === '0') {
            return
        }
        else{
            carregarAlunos()
        }
    }, alunoId)

    async function carregarAlunos(){
        try {
            const response = await api.get(`/api/alunos/${alunoId}`, auth);
            setId(response.data.id)
            setEmail(response.data.email)
            setNome(response.data.nome)
            setCpf(response.data.cpf)
            setCidade(response.data.cidade)
            setIdade(response.data.idade)
        } catch (error) {
            alert('Erro ao recuperar aluno' + error)
            navigate('/alunos')
        }
    }

    const navigate = useNavigate();
    async function cadastrarAluno(event){
        event.preventDefault()
        try {
            if (alunoId === '0'){
                await api.post('/api/alunos', data, auth)
            }
            else{
                data.id = id
                await api.put(`/api/alunos`, data, auth)
            }
            
        } catch (error) {
            alert('Erro ao processar requisição' + error)
        }
        finally{

            navigate('/alunos')
        }
    }

    return(
        <div className="novo-aluno-container">
            <div className="content">
                <section className="form">
                    <GrUserAdd size={105} color="17202a"/>
                <h1> {alunoId === '0' ? "Cadastrar Novo Aluno" : "Atualizar Aluno"}</h1>
                <Link className="back-link" to="/alunos">
                    <GrReturn size={25} color="#17202a"/>
                    Retornar
                    </Link>
                </section>
                <form onSubmit={cadastrarAluno}>
                    <input placeholder="Nome" 
                    value={nome} 
                    onChange={e=>setNome(e.target.value)}></input>

                    <input placeholder="E-mail"
                    value={email} 
                    onChange={e=>setEmail(e.target.value)}></input>

                    <input placeholder="CPF"
                    value={cpf} 
                    onChange={e=>setCpf(e.target.value)}></input>

                    <input placeholder="Idade"
                    value={idade} 
                    onChange={e=>setIdade(e.target.value)}></input>

                    <input placeholder="Cidade"
                    value={cidade} 
                    onChange={e=>setCidade(e.target.value)}></input>

                    <button className="button" type="submit" >
                    {alunoId === '0' ? "Cadastra Aluno" : "Atualizar Aluno"}
                    </button>
                </form>
            </div>
        </div>
    )
}