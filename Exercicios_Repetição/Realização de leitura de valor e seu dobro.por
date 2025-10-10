programa
{
	/*Realizar a leitura de valor inteiro, armazenar em uma variável e apresentar uma mensagem
informando o dobro deste valor, isto é: caso o usuário informe 6, deve-se apresentar a mensagem “O
dobro de 6 é 12.”. Este processo deve se repetir até que o usuário informe o número 0 (zero).*/
	funcao inicio()
	{
	inteiro valor, dobroValor
	logico controle = verdadeiro
	
		enquanto(controle == verdadeiro){
		escreva("\nInforme um valor: ")
		leia(valor)

		se(valor == 0){
			controle = falso
			pare
		}
		
		dobroValor = valor * 2
		escreva("O Dobro do valor " +valor+ " é ["+dobroValor+"]")
		}
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 379; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */