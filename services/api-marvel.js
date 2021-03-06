const Usuarios = require('../store/Usuario');
const verificaUsuarioLogado = require('../services/verifica-usuario');

const URL_BASE =  'https://gateway.marvel.com/v1/public/characters';
// public key
const API_KEY = 'dcdf32e1379ad31d1c41f42c1b58411b';
// md5 ts+PRIVATE_KEY+PUBLIC_KEY
const HASH = 'cb435dca66f97d476c7753a8a2085bd8';
const AUTH = `?ts=1&apikey=${API_KEY}&hash=${HASH}`;


function getFavoritos(token)  {
    
    Usuarios.findOne().where({token})
        .then(usu => {                     
            return usu.favoritos;
        })
        .catch(() => {
            return [];
        });        
    
};

async function converteCharacterMarvel(data) {    
    let personagens = [];

    data.forEach(character => {
        let id = character.id;

        let personagem = {
            id,
            nome: character.name,
            descricao: character.description,
            thumbnail: `${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`,
            foto: `${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`
        };      
        personagens.push(personagem);
        
    });

    return personagens;
}


module.exports = {URL_BASE, AUTH, converteCharacterMarvel};

