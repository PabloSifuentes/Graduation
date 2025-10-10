programa
{
	/*Realizar a leitura de dois valores inteiros, somá-los e apresentar o resultado da soma na saída padrão.
Após a mensagem, deve-se questionar se o usuário gostaria de finalizar o programa e, caso não
queira, o programa deve repetir o processo de leitura/soma/exibição/questionamento.*/
	funcao inicio()
	{
		inteiro valor1, valor2, soma, usuario
		logico controle = verdadeiro

		enquanto(controle == verdadeiro){
			escreva("\nInforme o primeiro valor: ")
			leia(valor1)
			escreva("Informe o seguundo valor: ")
			leia(valor2)
			soma = valor1 + valor2
			escreva("\nA soma dos valores é: " +soma)

			escreva("\nGostaria de Finalizar o Programa?\n"+
						+" [1] - Sim "+
						+"\n [2] - Não ")
						leia(usuario)
						se(usuario == 1){
							controle = verdadeiro
						} senao{
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
 * @POSICAO-CURSOR = 804; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */