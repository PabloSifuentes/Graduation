programa
{
	
	funcao inicio()
	{
		inteiro num[10], maior = 0, menor = 0

			escreva("Informe 10 Valores: \n")
		para(inteiro i = 0; i < 10; i++){
			escreva("Valor " + i+1 + "º = ")
			leia(num[i])

			maior = num[0]
			menor = num[0]
			
			se(num[i] > maior ){
				maior = num[i]
			}se(num[i] < menor){
				menor = num[i]
			}
		}

		escreva("\n=== RESULTADOS ===\n")
        escreva("Maior número: ", maior, "\n")
        escreva("Menor número: ", menor, "\n")
        
        escreva("\nNúmeros digitados: ")
        para (inteiro i = 0; i < 10; i++) {
            escreva(num[i])
            se (i < 9) {
                escreva(", ")
            }
        }
    }
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 78; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */