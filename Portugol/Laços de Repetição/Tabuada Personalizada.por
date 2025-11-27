programa
{
//	Tabuada Personalizada
	funcao inicio()
	{
		inteiro valor, multiplicacao

		escreva("Informe o Valor a ser multiplicado: ")
		leia(valor)

		escreva("Tabuada de Multiplicação\n")
		para(inteiro i = 0; i <= 15; i++){
			multiplicacao = i * valor
			escreva(i+ " X " +valor+ " = " +multiplicacao+ "\n")
		}	
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 312; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */