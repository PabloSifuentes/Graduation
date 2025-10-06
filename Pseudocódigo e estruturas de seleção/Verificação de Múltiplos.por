programa
{
	
	funcao inicio()
	{
		inteiro a, b, resto, maior, menor

		escreva("Informe o valor A: \n")
		leia(a)
		escreva("Informe o valor B:  \n")
		leia(b)
		limpa()
		
		se(a >= b){
			maior = a
			menor = b
		}
		senao{
			maior = b
			menor = a
		}
		escreva("Valor maior: " +maior+ "\nValor menor: " +menor)
		resto = maior % menor
		escreva("\nResto é: " +resto)
		
		escreva("\n")
		
		se (resto == 0){
		escreva("\nSão Multiplos")	
		}
		senao {
			escreva("\nNão são Multiplos")
		}
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 399; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */