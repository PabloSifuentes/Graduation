programa
{
	
	funcao inicio()
	{
		inteiro coluna, linha
		cadeia cor

		escreva("Digite a coluna (1 a 8): ")
		leia(coluna)
		escreva("Digite a linha (1 a 8): ")
		leia(linha)

		se(coluna < 1 ou coluna > 8 ou linha < 1 ou linha > 8){
			escreva("Erro: Valores devem estar entre 1 e 8!")
		}
		senao{
			se((coluna + linha) % 2 == 0){
				cor = "Branca"
			} senao{
				cor = "Preta"
			}
			escreva("A casa na coluna " +coluna+ " e linha " +linha+ " é " +cor)
		}
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 441; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */