package com.chaveiro.Casa_das_Chaves.controller;

import com.chaveiro.Casa_das_Chaves.dto.UsuarioSessaoDto;
import com.chaveiro.Casa_das_Chaves.sessao.ControleSessao;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/home")
public class HomeController {

    @GetMapping
    public String dashboard(Model model, HttpServletRequest request) {

        UsuarioSessaoDto usuarioSessaoDto = ControleSessao.obter(request);
        if (usuarioSessaoDto.getId() == 0) {
        return "redirect:/login";
        }
        return "home";
    }
}
