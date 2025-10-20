programa
{
	//Apresentar os números de 0 á 100, e tambem a soma
	// de todos estes numeros.
	funcao inicio()
	{
		escreva("Hellou World!")

		inteiro numero = 0, soma = 0

		enquanto(numero <= 100){
			escreva("\nNúmero: " +numero)
			soma = soma + numero

			escreva("\nValor Acumulado: " +soma)
			numero++
		}
		escreva("\n=== RESULTADO FINAL ===\n")
        escreva("\nA soma de todos os números de 0 a 100 é: " + soma)
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 235; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */