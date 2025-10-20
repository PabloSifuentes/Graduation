programa
{
//	Repetição Controlada pelo Usuário
	inclua biblioteca Util --> u
   funcao inicio()
   {
      inteiro contador = 0, num, agora = 0, decorrido, inicial = u.tempo_decorrido()
	 logico controle = verdadeiro

	
      escreva("Informe um número positivo (0 ou -1 para sair): ")
      leia(num)

      se(num == 0 ou num == -1){
      	escreva("Carregando [")
      	para(inteiro i = 0; i < 20; i++){
      	faca{
      		agora = u.tempo_decorrido()
      		decorrido = agora - inicial
      		}
      		enquanto(decorrido < (i + 1) * 250)
      		escreva("█")
      	}
      	escreva("] 100%\n")
      	escreva("Programa Finalizado!")
  		retorne
      	}
    
      enquanto (controle == verdadeiro){
      	
         se (num < -1) {
            escreva("Erro: Valor não informado! Tente novamente\n")
         } senao {
            escreva("\nBom dia!")
            contador++
         }

         escreva("\nInforme um número positivo (0 ou -1 para sair): ")
         leia(num)
         
         se(num == 0 ou num == -1){
         	limpa()
      	escreva("Carregando [")
      	para(inteiro i = 0; i < 20; i++){
      	faca{
      		agora = u.tempo_decorrido()
      		decorrido = agora - inicial
      		}
      		enquanto(decorrido < (i + 1) * 250)
      		escreva("█")
      	}
      	escreva("] 100%\n")
      	escreva("Programa Finalizado!")
  		controle = falso
      	}
      }

      escreva("\nTotal de vezes que o usuario informou: ", contador)
   }
}

/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 1454; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = {contador, 7, 14, 8}-{num, 7, 28, 3}-{agora, 7, 33, 5}-{decorrido, 7, 44, 9}-{inicial, 7, 55, 7}-{controle, 8, 9, 8}-{i, 16, 20, 1}-{i, 44, 20, 1};
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */