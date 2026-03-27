package com.chaveiro.Casa_das_Chaves.controller;

import com.chaveiro.Casa_das_Chaves.dto.UsuarioDto;
import com.chaveiro.Casa_das_Chaves.dto.UsuarioSessaoDto;
import com.chaveiro.Casa_das_Chaves.service.UsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import com.chaveiro.Casa_das_Chaves.sessao.ControleSessao;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UsuarioCadastroController {

    @GetMapping("/usuariocadastro")
    public String viewCadastroUsuario(Model model, HttpServletRequest request) {

        UsuarioSessaoDto usuarioSessao = ControleSessao.obter(request);

        if (usuarioSessao == null || usuarioSessao.getId() == 0) {
            return "redirect:/login";
        }
        UsuarioDto usuarioDto = new UsuarioDto();
        model.addAttribute("usuarioDto", usuarioDto);

        return "usuariocadastro";
    }
}
