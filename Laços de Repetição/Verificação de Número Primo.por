programa
{
//Verificação de Número Primo Faça um algoritmo em Portugol que solicite ao 
//usuário um número inteiro positivo. O programa deve então verificar e informar 
//se o número digitado é um número primo ou não. 

//		Definição: Um número primo é aquele que é divisível apenas por 1 e por 
//		ele mesmo.
//
//		Dica: Para verificar se um número N é primo, você pode testar se ele 
//		possui algum divisor no intervalo de 2 até N-1. 
//
//		Observação: O número 1 não é considerado número primo.
	funcao inicio()
    {
        inteiro num, i, divisores = 0

        escreva("Informe um número positivo: ")
        leia(num)
        
        se (num <= 1) {
            escreva("O número ", num, " não é primo")
        } senao {
            
            para(i = 2; i < num; i++) {
                se (num % i == 0) {
                    divisores = divisores + 1
                }
            }
            se (divisores == 0) {
                escreva("O número ", num, " é primo")
            } senao {
                escreva("O número ", num, " não é primo")
            }
        }
    }
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 856; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */