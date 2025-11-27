programa
{
	
	funcao inicio()
	{
		real x, y, z

		escreva("Informe os valores para a Classificação!")
		escreva("\nInforme o valor de X: ")
		leia(x)
		escreva("\nInforme o valor de Y: ")
		leia(y)
		escreva("\nInforme o valor de Z: ")
		leia(z)
		limpa()

		se(x < y+z e y < x+z e z < x+y){
			escreva("Triângulo Válido!")

			se(x == y e y == z){
				escreva("\nClassificação: Equilátero")
			} senao se(x == y ou x == z ou y == z){
				escreva("\nClassificação: Isósceles")
			} senao{
				escreva("\nClassificação: Escaleno")
			}
		} senao {
			escreva("Triângulo Inválido!\n")
			se(x >= y + z){
				escreva("O lado x é maior ou igual a soma dos outros dois lados. ")
			} se(y >= x + z){
				escreva("O lado y é maior ou igual a soma dos outros dois lados. ")
			} se(z >= y + x){
				escreva("O lado z é maior ou igual a soma dos outros dois lados. ")
			}
		}
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 510; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */