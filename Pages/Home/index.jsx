import React, { useState, useEffect } from 'react';

import './styles.css';

import { Card } from '../../Components/Card';

export function Home() {
    const [studentName, SetStudentName] = useState('');
    const [students, setStudents] = useState([]);
    const [user, setUser] = useState({
        name: '',
        avatar: '',
    });

    function handleAddStudent(name) {
        const newStudent = {
            name: studentName,
            time: new Date().toLocaleTimeString("pt-br", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            })   
        };
//      preveState é pra vc adicionar pessoas diferentes e não apenas substituir quem já está la
        setStudents(prevState => [...prevState, newStudent]);
        //lê-se o td conteúdo do meu estado anterior + o novo estudante
    };

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://api.github.com/users/JailsonSilv')
            const data = await response.json();
            console.log("Dados ===>", data);
            setUser({
                name: data.name, 
                avatar: data.avatar_url,
            });
        }

        fetchData()
    }, []);

    
   

    return (
        <div className='container'>
            <header>
                 <h1> Lista de Presença </h1>
                 <strong>{user.name}</strong>
                 <img 
                    src={user.avatar} 
                    alt="Foto de perfil github" 
                />
            </header>
            <form>
                <input 
                    type="text"
                    name='name'
                    placeholder="Digite o seu nome:"
                    onChange={e => SetStudentName(e.target.value)}
                />

                <button 
                type="button" onClick={handleAddStudent}>
                    Adicionar
                </button>
            </form>

            {
                students.map(student => (
                    <Card 
                        key={student.time}
                        name={student.name} 
                        time={student.time} 
                    />
                ))
            }
            
        </div>
    )
}
