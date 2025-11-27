programa
{
//Série de Fibonacci A série de Fibonacci é formada pela sequência 0, 1, 1, 2, 3, 
//5, 8, 13, 21, .... Crie um programa em Portugol que solicite ao usuário um número 
//N e gere e mostre os N primeiros termos da série.
	funcao inicio()
	{
		inteiro n, a = 0, b = 1, temp, i
		logico controle = verdadeiro

	enquanto(controle == verdadeiro){
		escreva("\nDigite quantos termos da sequência de Fibonacci deseja exibir: \n")
		leia(n)

		se (n <= 0){
			escreva("Número inválido! Digite um valor maior que zero.\n")
			controle = verdadeiro
		} senao {
			escreva("Série de Fibonacci: ")

			se (n >= 1){
				escreva(a, " ")
			}

			se (n >= 2){
				escreva(b, " ")
			}

			para(i = 3; i <= n; i++){
				temp = a + b
				escreva(temp, " ")
				a = b
				b = temp
			}
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
 * @POSICAO-CURSOR = 13; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */