programa
{
	
	funcao inicio()
	{
		inteiro valor, tabuadaFinal, tabuadaInicial, calculo
		
		escreva("Informe um Valor: ")
		leia(valor)
		escreva("Informe a contagem Inicial: ")
		leia(tabuadaInicial)
		escreva("Informe a contagem Final: ")
		leia(tabuadaFinal)
		escreva("\n")

		para(tabuadaInicial; tabuadaInicial <= tabuadaFinal; tabuadaInicial++){
			calculo = tabuadaInicial * valor
			escreva(tabuadaInicial+" X "+ valor + " = " +calculo+ "\n")
		}
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 462; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */