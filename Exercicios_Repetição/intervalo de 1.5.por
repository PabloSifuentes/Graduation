programa
{
//	Realizar a leitura de um valor inteiro até que o utilizador informe um número dentro do intervalo
//[1, 5]. Caso o valor informado seja menor ou igual à zero ou maior ou igual a cinco deve-se
//solicitar novamente um valor inteiro. Ao final, apresentar uma mensagem informando a opção
//escolhida pelo usuário, exemplo: “Você escolheu a opção um!”
	
	funcao inicio()
	{
		inteiro valor, i = 0
		real segundo = 1.5, contador = 0.0

		
		faca{
		escreva("Informe um valor: ")
		leia(valor)
		
		se(valor <= 0 ou valor >= 5){
			
		} senao{
			limpa()
			escreva("Você escolheu a opção " +valor)
			pare
		}
			
		enquanto(i < 150000000)
		i++
		
		enquanto(contador < segundo){
		contador++


		}
		}
		escreva("\nTempo esgotado!")
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 541; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */