programa
{
	funcao inicio()
	{
		inteiro num1, num2, num3, maior, menor, meio
		
		escreva("Informe o número 1: ")
		leia(num1)
		escreva("Informe o número 2: ")
		leia(num2)
		escreva("Informe o número 3: ")
		leia(num3)

		se (num1 >= num2 e num1 >= num3){
			maior = num1
			se (num2 >= num3) {
				meio = num2
				menor = num3
			}
			senao{
				meio = num3
				menor = num2
			}
		}
		senao se (num2 >= num1 e num2 >= num3){
			maior = num2
			se (num1 >= num3){
				meio = num1
				menor = num3
			}
			senao{
				meio = num3
				menor = num1
			}
		}
		senao{
			maior = num3
			se (num1 >= num2){
				meio = num1
				menor = num2
			}
			senao{
				meio = num2
				menor = num1
			}
		}
		escreva("Ordem Decrescente: "+ maior + ", " + meio + ", " + menor + "\n")
	}
}

/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 652; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */