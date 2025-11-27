programa
{
//	Análise de 20 Valores
//	a) A soma de todos os números positivos inseridos. 
//	b) A quantidade total de números negativos inseridos.
	funcao inicio()
	{
		inteiro num[20], positivo[20], negativo[20], contPositivo = 0, contNegativo = 0, i, totalNegativo = 0, totalPositivo = 0

			escreva("Informe os 20 valores: \n")
		para(i = 0; i < 20; i++){
			escreva("Valor " + (i + 1) + ": ")
			leia(num[i])
		}
			para(i = 0; i < 20; i++){
				se(num[i] > 0){
					positivo[contPositivo] = num[i]
					contPositivo = contPositivo + 1
					totalPositivo = totalPositivo + num[i]
				} senao {
					negativo[contNegativo] = num[i]
					contNegativo = contNegativo + 1
					totalNegativo = totalNegativo + num[i]
				}
			}
				escreva("\nNumeros Positivos: \n")
			para(i = 0; i < contPositivo; i++){
				escreva(positivo[i]+ " ")
			}
				escreva("\nSoma Total de Positivos: "+ totalPositivo+"\n")
			escreva("\nNúmeros Negativos: \n")
			para(i = 0; i < contNegativo; i++){
				escreva(negativo[i]+ " ")
			}		
				escreva("\nSoma Total de Negativos: "+ totalNegativo + " \n")
				escreva("\nTotal de Negativos Inseridos: " +contNegativo)
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 1116; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */