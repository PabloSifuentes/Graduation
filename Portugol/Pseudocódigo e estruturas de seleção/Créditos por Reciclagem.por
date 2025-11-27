programa
{
	
	funcao inicio()
	{
		real vasilhamesLitros, totalCredito, creditoTotal
		logico controleConta = verdadeiro


		enquanto(controleConta){
			
		escreva("\nInforme a quantidade de litros(Vasilhames): ")
		leia(vasilhamesLitros)

		se (vasilhamesLitros <= 0) {
			escreva("Erro, tente novamente!")
			controleConta = verdadeiro
		}	
		senao se (vasilhamesLitros <= 1.0){
		 	creditoTotal = vasilhamesLitros * 0.10
		 	escreva("Valor Total de R$" +creditoTotal+ " Crédito Obtido")
		 	pare
		} senao {
			creditoTotal = vasilhamesLitros * 0.25
			escreva("Valor Total de R$" +creditoTotal+ " Crédito Obtido")
			pare
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