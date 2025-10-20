programa
{
//Estatísticas de 10 Números Desenvolva um algoritmo que solicite ao usuário 
//que insira 10 números inteiros. Após a inserção de todos os números, o 
//programa deve calcular e exibir: o maior, o menor e a média dos números 
//fornecidos.
	funcao inicio()
	{
		inteiro numeros[10], i, maior, menor
	
		escreva("Informe 10 números: \n")
		para(i = 0; i < 10; i++){
		escreva("numero " +(i + 1)+ ": ")	
		leia(numeros[i])
		}
		
		maior = numeros[0]
		menor = numeros[0]

		para(i = 0; i < 10; i++){
		se(numeros[i] > maior ){
		maior = numeros[i]		
		} se(numeros[i] < menor){
		menor = numeros[i]
		}
	 }
			escreva("\nNúmeros digitados: ")
		para(i = 0; i < 10; i++){
			escreva(numeros[i] + "")
	}
		escreva("\nMaior número: " + maior)
		escreva("\nMenor número: " + menor)
 }
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 800; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */