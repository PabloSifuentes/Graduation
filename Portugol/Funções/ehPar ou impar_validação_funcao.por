programa
{
	
	funcao inicio()
	{
		inteiro valor
	
		escreva("Informe um valor: ")
		leia(valor)

		ehPar(valor)
	}

     funcao vazio ehPar(inteiro numero){
		se(numero % 2 == 0){
			escreva("Numero é Par!")
		} senao{
			escreva("Numero é Impar!")
		}
		
     }
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 118; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */