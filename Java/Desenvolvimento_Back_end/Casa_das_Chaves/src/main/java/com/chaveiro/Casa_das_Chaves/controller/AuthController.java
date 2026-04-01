package com.chaveiro.Casa_das_Chaves.controller;

import com.chaveiro.Casa_das_Chaves.dto.LoginDto;
import com.chaveiro.Casa_das_Chaves.dto.UsuarioSessaoDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import com.chaveiro.Casa_das_Chaves.service.UsuarioService;
import com.chaveiro.Casa_das_Chaves.sessao.ControleSessao;

@Controller
public class AuthController {

    @Autowired
    UsuarioService service;

    @GetMapping("/login")
    public String obterLogin(Model model) {

        model.addAttribute("loginDto", new LoginDto());
        return "login";
    }

    @PostMapping("/login")
    public String realizarLogin(@ModelAttribute("loginDto") LoginDto login, HttpServletRequest request) {

        UsuarioSessaoDto usuarioSessao = service.toEnter(login);

        if (usuarioSessao.getId() != 0L) {
            ControleSessao.registrar(request, usuarioSessao);
            return "redirect:/home";
        }
        return "redirect:/login?erro";

    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request) {

        ControleSessao.encerrar(request);
        return "redirect:/login";
    }
}
