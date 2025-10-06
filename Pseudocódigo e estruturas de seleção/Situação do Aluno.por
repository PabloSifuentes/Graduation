programa
{
	
	funcao inicio()
	{
		real nota1, nota2, nota3, media

		escreva("Informe as notas do aluno!\n")
		escreva("\nPrimeira Nota: ")
		leia(nota1)
		escreva("\nSegunda Nota: ")
		leia(nota2)
		escreva("\nTerceira Nota: ")
		leia(nota3)

		media = (nota1+nota2+nota3) / 3

		se(media >= 6){
			escreva("┏━━━━━━━━━━━━━━━━━━━━┑\n     " +       
			                " Aprovado"
		            +"\n┗━━━━━━━━━━━━━━━━━━━━┙")
		} senao se (media >= 3 e media < 6){
			escreva("┏━━━━━━━━━━━━━━━━━━━━┑\n   " +
			                " Em prova final"
		            +"\n┗━━━━━━━━━━━━━━━━━━━━┙")
		} senao{	
			escreva("┏━━━━━━━━━━━━━━━━━━━━┑\n     " +
			                " Reprovado"
		            +"\n┗━━━━━━━━━━━━━━━━━━━━┙")
		}
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 733; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */