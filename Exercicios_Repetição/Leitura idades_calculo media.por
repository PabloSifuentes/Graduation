programa
{
	/*Ler a idade de várias pessoas e calcular a média das idades. Encerrar a execução quando valor
	negativo for digitado (o valor negativo não deve ser considerado no cálculo da média).*/
	funcao inicio()
	{
		inteiro pessoas = 0
		logico controle = verdadeiro
		real idade, media, soma = 0.0

		enquanto(controle == verdadeiro){
		escreva("Informe a idade das pessoas!: ")
		leia(idade)
		soma = soma + idade

		se(idade == 0 ou idade < 0){
			limpa()
			media = soma / pessoas
			escreva("Pessoas : " +pessoas)
			escreva("\nA média é: " +media)
			escreva("\nExecusão encerrada")
			controle = falso
		}senao{
			controle = verdadeiro
		     pessoas++
		}
		}
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 467; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = {pessoas, 7, 10, 7}-{controle, 8, 9, 8}-{idade, 9, 7, 5}-{media, 9, 14, 5}-{soma, 9, 21, 4};
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */