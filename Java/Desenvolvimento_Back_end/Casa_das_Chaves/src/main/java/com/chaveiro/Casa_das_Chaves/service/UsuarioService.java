package com.chaveiro.Casa_das_Chaves.service;

import com.chaveiro.Casa_das_Chaves.dto.*;
import com.chaveiro.Casa_das_Chaves.model.UsuarioModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.chaveiro.Casa_das_Chaves.repository.UsuarioRepository;

import java.awt.dnd.InvalidDnDOperationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public UsuarioSessaoDto toEnter(LoginDto login) {

        UsuarioSessaoDto usuarioSessao = new UsuarioSessaoDto();

        Optional<UsuarioModel> usuarioOptional = usuarioRepository.findByEmail(login.getEmail());

        if (usuarioOptional.isPresent()) {
            if (usuarioOptional.get().getSenha().equals(login.getSenha())) {
                usuarioSessao.setId(usuarioOptional.get().getId());
                usuarioSessao.setNome(usuarioOptional.get().getNome());
            }
        }
        return usuarioSessao;
    }

    public MensagemDto adicionarUsuario(RequestDto requestDto) {

        UsuarioModel usuarioModel = new UsuarioModel();
        usuarioModel.setNome(requestDto.getNome());
        usuarioModel.setEmail(requestDto.getEmail());
        usuarioModel.setSenha(requestDto.getSenha());

        usuarioRepository.save(usuarioModel);

        MensagemDto mensagem = new MensagemDto();
        mensagem.setMensagem("Cadastrado com sucesso!");
        return mensagem;
    }

    public boolean atualizarUsuario(Long id, UsuarioAtualizarDto usuarioDto) {

        //--buscar no banco de dados o usuario pelo ID
        Optional<UsuarioModel> usuarioOptional = usuarioRepository.findById(id);

        Optional<UsuarioModel> usuarioOptionalLogin = usuarioRepository.findByEmail(usuarioDto.getEmail());

        if (usuarioOptionalLogin.isPresent() && !usuarioOptionalLogin.get().getId().equals(id)) {
            throw new InvalidDnDOperationException("Já existe um usuário com este login!");
        }
        System.out.println("Chegou no service=" + usuarioOptional.isPresent());

        //--se encontrar usuario
        if (usuarioOptional.isPresent()) {

            //--Atualizar
            //--Obter o usuario dentro do optional
            UsuarioModel usuario = usuarioOptional.get();

            //--Atualizar valores do usuario
            usuario.setNome(usuarioDto.getNome());
            usuario.setEmail(usuarioDto.getEmail());
            if (!usuarioDto.getSenha().isEmpty()) {
                usuario.setSenha(usuarioDto.getSenha());
            }
            usuarioRepository.save(usuario);
            return true;
        }
        return false;
    }

    public UsuarioAtualizarDto buscarUsuarioId(Long id){

        Optional<UsuarioModel> usuarioOP = usuarioRepository.findById(id);
        if(!usuarioOP.isPresent()){
            return new UsuarioAtualizarDto(0L);
        }
        return new UsuarioAtualizarDto(usuarioOP.get());
    }

    public List<ListaUsuariosDto> listarUsuarios(){

        //--Obter os usuários do banco de dados
        List<UsuarioModel> listausuarios = usuarioRepository.findAll();

        //--Criar a lista DTO para realizar o retorno
        List<ListaUsuariosDto> lista = new ArrayList<>();

        //--Percorre a lista de usuários do banco e converter em uma lista de DTO
        for(UsuarioModel usuario : listausuarios){

            //--Crio um objeto DTO
            ListaUsuariosDto usuarioRetorno = new ListaUsuariosDto();

            //--Converto um objeto model em um objeto DTO
            usuarioRetorno.setId(usuario.getId());
            usuarioRetorno.setNome(usuario.getNome());
            usuarioRetorno.setEmail(usuario.getEmail());

            //--Adiciono o objeto model em um objeto DTO
            lista.add(usuarioRetorno);
        }
        return lista;
    }

    public MensagemDto removeUsuario(Long id){

        MensagemDto mensagem = new MensagemDto();
        mensagem.setMensagem("Erro ao excluir");
        mensagem.setSucesso(false);

        //--buscar no banco de dados o usuário pelo ID
        Optional<UsuarioModel> usuarioOptional = usuarioRepository.findById(id);

        if(usuarioOptional.isPresent()){

            usuarioRepository.delete(usuarioOptional.get());

            mensagem.setMensagem("Sucesso ao excluir o usuário");
            mensagem.setSucesso(true);
        }
        return mensagem;
    }


}
