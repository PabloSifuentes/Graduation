programa
{
	
	funcao inicio()
	{
		inteiro valor, C,D,U, resto, novoNumero

			escreva("Informe um valor de Centena: ")
			leia(valor)
			logico controleValor = verdadeiro

			enquanto(controleValor){

			se (valor == 0 ou valor <0){
				escreva("Erro, valor só acima de zero! Tente Novamente")
				controleValor = verdadeiro
			} senao {
				C = valor / 100
				D = valor / 10 % 10
				U = valor % 10
			
				novoNumero = U * 100 + D * 10 + C 
				escreva("A nova ordem: " +novoNumero)
				controleValor = falso
			}
			}
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 406; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */