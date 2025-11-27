programa
{
	/*Realizar a leitura de um valor inteiro e apresentar a tabuada de 0 (zero) à 10 (dez) do valor informado.
	Deve-se utilizar uma estrutura de repetição para a resolução deste exercício.
*/
	funcao inicio()
	{
	inteiro valor, resultado = 0

	escreva("Informe um valor: ")
	leia(valor)

	para(inteiro tabuada = 0;tabuada <= 10;tabuada++){
		resultado = valor * tabuada
		escreva("\n" +valor+ " X " +tabuada+ " = " +resultado)
	}
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 356; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */