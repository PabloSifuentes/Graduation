programa
{
	// Cálculo de Fatorial 
	funcao inicio()
	{
		inteiro num, numFatorial = 1
		logico controle = verdadeiro

		enquanto (controle == verdadeiro)
		{
			escreva("Informe um valor positivo: \n")
			leia(num)

			se (num < 0)
			{
				escreva("Erro, o número informado não é positivo ou igual a zero!\nTente novamente\n")
				controle = verdadeiro
			} senao se(num == 0){
				escreva(num+"! = 1")
				pare
			}
			senao
			{
				escreva(num + "! = ")

				para (inteiro i = num; i >= 1; i--)
				{
					numFatorial = numFatorial * i
					escreva(i + " X ")
				}

				escreva("= " + numFatorial)
				controle = falso
			}
		}
	}
}

/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 639; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */