programa
{
    funcao inicio()
    {
        real segundosDesejados = 1.5
        inteiro contador = 0, valor
        
          escreva("Informe um valor: ")
          escreva("Iniciando contagem...\n")
        
        enquanto (contador < segundosDesejados) {
            inteiro i = 0
		
            enquanto (i < 150000000) {
                i++
            }
           contador++
        		escreva("Tempo finalizado!\n")
        		pare
        }
        leia(valor)
		se(valor <= 0 ou valor >= 5){
		} senao{
			limpa()
			escreva("Você escolheu a opção " +valor)
		}
    }
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 350; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */