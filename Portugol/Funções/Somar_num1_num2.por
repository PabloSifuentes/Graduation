programa
{
	funcao inicio()
	{
		inteiro valor1, valor2

		
		escreva("Informe 1º valores: ")
		leia(valor1)
		escreva("Informe 2º valores: ")
		leia(valor2)

		inteiro total = somar(valor1, valor2)
		escreva("A soma dos valores é: " +total)
	}
	
	funcao inteiro somar(inteiro a, inteiro b){
		inteiro resultado = a + b
		retorne resultado
		
	}
	
	
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 200; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */