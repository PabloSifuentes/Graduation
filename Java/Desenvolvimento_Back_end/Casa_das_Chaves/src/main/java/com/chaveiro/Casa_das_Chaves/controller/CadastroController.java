package com.chaveiro.Casa_das_Chaves.controller;

import com.chaveiro.Casa_das_Chaves.dto.MensagemDto;
import com.chaveiro.Casa_das_Chaves.dto.RequestDto;
import com.chaveiro.Casa_das_Chaves.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cadastro")
public class CadastroController {

    @Autowired
    UsuarioService service;

    @GetMapping
    public String mostrarCadastro(Model model) {
        model.addAttribute("requestDto", new RequestDto());
        return "cadastro";
    }

    @PostMapping
    public String cadastrar(@ModelAttribute("requestDto") RequestDto requestDto, Model model) {

        MensagemDto mensagemDto = service.adicionarUsuario(requestDto);

        if (mensagemDto.isSucesso()) {
            return "redirect:/login?cadastro=sucesso";
        }
        model.addAttribute("erro", mensagemDto.getMensagem());
        model.addAttribute("requestDto", requestDto);
        return "cadastro";
    }
}