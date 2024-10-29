import express from 'express';
import { uuid } from 'uuidv4';

import contatos from './data/contatos.mjs'

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
        <h1 style='color: red;'>
            Olá Mundo!
        </h1>
        <p>
            Aula DevOps - Hand-On - Backend - Docker
        </p>
    `)
});

app.get('/contatos', (req, res) => {
    res.status(200).json({
        error: false,
        contatos
    })
});

app.get('/contatos/:id', (req, res) => {
    const id = req.params.id;
    const contato = contatos.find((contato) => contato.id == id);

    if(!contato) 
        return res.status(404).json({
            error: true,
            message: "Contato não encontrado!"
        });

    res.status(200).json({
        error: false,
        contato
    });
});

app.post('/contatos', (req, res) => {
    const { nome, genero, telefone, email } = req.body;

    if(!nome || !genero || !telefone || !email )
        return res.status(400).json({
            error: true,
            message: "Entrada inválida!"
        });
    
    if(contatos.find((contato) => contato.email === email))
        return res.status(400).json({
            error: true,
            message: "Email já cadastrado!"
        })
    
        id = (contatos.length == 0) 
            ? 1 
            : contatos[contatos.length-1].id + 1; 
    const contato = { id: uuid(), nome, genero, telefone, email };
    res.status(201).json({
        error: false,
        contato
    });
})

app.put('/contatos/:id', (req, res) => {
    
    const id = req.params.id;
    const contato = contatos.find((contato) => contato.id == id);
    
    if(!contato) 
        return res.status(404).json({
        error: true,
        message: "Contato não encontrado!"
    });

    const { nome, genero, telefone, email } = req.body;

    if(email) {
        if(contatos.find((contato) => contato.email === email))
            return res.status(400).json({
                error: true,
                message: "Email já cadastrado!"
            })
        contato.email = email;
    }
    if(nome) contato.nome = nome;
    if(genero) contato.genero = genero;
    if(telefone) contato.telefone = telefone;

    return res.status(200).json({
        error: false,
        message: "Contato atualizado com sucesso!"
    });
    
});

app.delete('/contatos/:id', (req, res) => {
    
    const id = req.params.id;
    const index = contatos.findIndex((contato) => contato.id == id);
    
    if(index == -1) 
        return res.status(404).json({
            error: true,
            message: "Contato não encontrado!"
        });
    
    contatos.splice(index, 1);
    return res.status(200).json({
        error: false,
        message: "Contato deletado com sucesso!"
    });
    
});

app.listen(3000, '127.0.0.1', ()=> {
    console.log("Servidor iniciado na porta 3000.");
});
