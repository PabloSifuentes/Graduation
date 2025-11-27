programa
{
	funcao inicio()
	{
		real num1, num2
		cadeia opcao
	 
		escreva("Informe o 1º valor: ")
		leia(num1)
		escreva("Informe o 2º valor: ")
		leia(num2)
		escreva("Escolha o calculo:")
		leia(opcao)
			
		real total = realizarOperacaoMatematica(num1, num2, opcao)
		escreva("Calculado: " +total)
		
		}

	funcao real realizarOperacaoMatematica(real x, real y, cadeia operacao){
		real resultado = 0.0
		se(operacao == "+"){
			resultado = x + y 
		} se(operacao == "-"){
			resultado = x - y 
		} se(operacao == "/"){
			resultado = x / y
		}
		retorne resultado
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 578; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */