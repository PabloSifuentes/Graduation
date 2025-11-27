programa
{
	
	funcao inicio()
	{
		inteiro valor1, valor2, maiorNum
		
		escreva("Informe o Primeiro valor: ")
		leia(valor1)
		escreva("Informe o Segundo valor: ")
		leia(valor2)

		se (valor1 > valor2){
			escreva("O Primeiro valor " +valor1+ " é maior que o " +valor2)
		} senao se(valor1 == valor2){
			escreva("Valores são iguais!")
		}
		senao {
			escreva("O Segudno valor " +valor2+ " é maior que o " +valor1)
		}

	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 329; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */