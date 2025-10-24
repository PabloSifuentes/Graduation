programa
{
    funcao inicio()
    {
        inteiro num, par[5], impar[5]
        inteiro totalImpar = 0, totalPar = 0
        inteiro contPar = 0, contImpar = 0
        
        para(inteiro i = 0; i < 5; i++) {
            par[i] = 0
            impar[i] = 0
        }

        escreva("- 5 Valores!\n")
       
        para(inteiro i = 0; i < 5; i++) {
            escreva("- Informe o " + (i+1) + "º valor: ")
            leia(num)
            
            se(num % 2 == 0) {
                par[contPar] = num
                contPar++
            } senao {
                impar[contImpar] = num
                contImpar++
            }
        }

        para(inteiro i = 0; i < contPar; i++) {
            totalPar += par[i]
        }
        
        para(inteiro i = 0; i < contImpar; i++) {
            totalImpar += impar[i]
        }
        
        escreva("\n=== NÚMEROS PARES ===\n")
        para(inteiro i = 0; i < contPar; i++) {
            escreva("Posição ", i, ": ", par[i], "\n")
        }
        escreva("Total de Pares: " + totalPar + "\n")

        escreva("\n=== NÚMEROS ÍMPARES ===\n")
        para(inteiro i = 0; i < contImpar; i++) {
            escreva("Posição ", i, ": ", impar[i], "\n")
        }
        escreva("Total de Ímpares: " + totalImpar + "\n")
    }
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 162; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = {par, 5, 21, 3}-{impar, 5, 29, 5};
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */