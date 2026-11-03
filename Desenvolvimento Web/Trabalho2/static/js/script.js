google.charts.load('current', {

    packages: [
        'geochart',
        'corechart',
        'gauge'
    ],

    language: 'pt-BR'

});

google.charts.setOnLoadCallback(desenharDashboard);

function desenharDashboard() {

    desenharMapaBrasil();

    desenharGraficoLinhas();

    desenharGauge();

}

function desenharMapaBrasil() {

    const valoresEstados = [

        ['BR-AC', 10],  // Acre
        ['BR-AL', 20],  // Alagoas
        ['BR-AP', 30],  // Amapá
        ['BR-AM', 40],  // Amazonas
        ['BR-BA', 50],  // Bahia
        ['BR-CE', 60],  // Ceará
        ['BR-DF', 70],  // Distrito Federal
        ['BR-ES', 80],  // Espírito Santo
        ['BR-GO', 90],  // Goiás
        ['BR-MA', 100], // Maranhão
        ['BR-MT', 110], // Mato Grosso
        ['BR-MS', 120], // Mato Grosso do Sul
        ['BR-MG', 130], // Minas Gerais
        ['BR-PA', 140], // Pará
        ['BR-PB', 150], // Paraíba
        ['BR-PR', 160], // Paraná
        ['BR-PE', 170], // Pernambuco
        ['BR-PI', 180], // Piauí
        ['BR-RJ', 190], // Rio de Janeiro
        ['BR-RN', 200], // Rio Grande do Norte
        ['BR-RS', 210], // Rio Grande do Sul
        ['BR-RO', 220], // Rondônia
        ['BR-RR', 230], // Roraima
        ['BR-SC', 240], // Santa Catarina
        ['BR-SP', 250], // São Paulo
        ['BR-SE', 260], // Sergipe
        ['BR-TO', 270]  // Tocantins

    ];

    const total = valoresEstados.reduce(function (soma, linha) {
        return soma + linha[1];
    }, 0);


    const linhas = valoresEstados.map(function (linha) {

        const codigo = linha[0];
        const valor = linha[1];

        const porcentagem = (valor / total * 100).toLocaleString('pt-BR', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        });

        return [
            codigo,
            { v: valor, f: valor + ' (' + porcentagem + '%)' }
        ];

    });

    const dados = google.visualization.arrayToDataTable(
        [['Estado', 'Valor']].concat(linhas)
    );


    document.getElementById('mapa_total').textContent =
        'Total: ' + total.toLocaleString('pt-BR') + ' (100%)';


    const opcoes = {

        region: 'BR',

        resolution: 'provinces',

        displayMode: 'regions',

        colorAxis: {

            colors: [
                '#F4F8FC',
                '#D5E5F2',
                '#A9CDE3',
                '#76B1D2',
                '#3987BD',
                '#1764A5',
                '#104B87',
                '#083B70'
            ]

        },

        backgroundColor: '#E5E7EB',

        datalessRegionColor: '#9CA3AF',

        defaultColor: '#000000',

        legend: {

            textStyle: {
                color: '#333333'
            }

        }

    };


    const elemento = document.getElementById(
        'geochart-colors'
    );


    const grafico = new google.visualization.GeoChart(
        elemento
    );


    grafico.draw(dados, opcoes);

}


function desenharGraficoLinhas() {

    const dados = google.visualization.arrayToDataTable([

        ['Mês', 'Vendas (R$)', 'Despesas (R$)'],

        ['Janeiro', 50000, 85000],
        ['Fevereiro', 135000, 92000],
        ['Março', 118000, 96000],
        ['Abril', 138000, 101000],
        ['Maio', 162000, 108000],
        ['Junho', 200000, 125000]

    ]);


    const opcoes = {

        title: 'Desempenho Comercial - 2026',

        curveType: 'function',

        legend: {
            position: 'bottom',
            textStyle: {
                color: '#E5E7EB'
            }
        },

        backgroundColor: '#27294F',

        titleTextStyle: {
            color: '#E5E7EB'
        },

        hAxis: {

            title: 'Meses',

            textStyle: {
                color: '#E5E7EB'
            },

            titleTextStyle: {
                color: '#E5E7EB'
            }

        },

        vAxis: {

            title: 'Valores (R$)',

            textStyle: {
                color: '#E5E7EB'
            },

            titleTextStyle: {
                color: '#E5E7EB'
            }

        }

    };


    const elemento = document.getElementById(
        'curve_chart'
    );


    const grafico = new google.visualization.LineChart(
        elemento
    );


    grafico.draw(dados, opcoes);

}

function obterFaixa(valor) {

    if (valor < indicador.limiteBaixo) {
        return { nome: 'Baixo', cor: '#EF4444' };
    }

    if (valor < indicador.limiteMedio) {
        return { nome: 'Intermediário', cor: '#F59E0B' };
    }

    return { nome: 'Satisfatório', cor: '#22C55E' };

}

// ===== Dados do indicador (fictícios e controlados) =====
const indicador = {
    nome: 'NPS',
    valor: 63,
    min: 0,
    max: 100,
    limiteBaixo: 30,
    limiteMedio: 60
};

function desenharGauge() {

    const dados = google.visualization.arrayToDataTable([

        ['Label', 'Value'],

        [indicador.nome, indicador.valor]

    ]);


    const elemento = document.getElementById('gauge_chart');

    const lado = Math.min(elemento.clientWidth, elemento.clientHeight);


    const opcoes = {

        width: lado,
        height: lado,

        min: indicador.min,
        max: indicador.max,

        redFrom: indicador.min,
        redTo: indicador.limiteBaixo,
        redColor: '#EF4444',

        yellowFrom: indicador.limiteBaixo,
        yellowTo: indicador.limiteMedio,
        yellowColor: '#F59E0B',

        greenFrom: indicador.limiteMedio,
        greenTo: indicador.max,
        greenColor: '#22C55E',

        majorTicks: ['0', '50', '100'],
        minorTicks: 6

    };


    const grafico = new google.visualization.Gauge(elemento);

    grafico.draw(dados, opcoes);

    document.getElementById('gauge_valor').textContent = indicador.valor;

}

let larguraAnterior = window.innerWidth;
let temporizador;

window.addEventListener('resize', function () {

    clearTimeout(temporizador);

    temporizador = setTimeout(function () {

        if (window.innerWidth !== larguraAnterior) {

            larguraAnterior = window.innerWidth;

            desenharDashboard();

        }

    }, 200);

});

function iniciarGaleria() {
 
    const pista = document.getElementById('galeria_pista');
    const botaoAnterior = document.getElementById('galeria_anterior');
    const botaoProximo = document.getElementById('galeria_proximo');
    const areaPontos = document.getElementById('galeria_pontos');
 
 
    // Cria um ponto para cada "página" da galeria
    function criarPontos() {
 
        const paginas = Math.ceil(pista.scrollWidth / pista.clientWidth);
 
        areaPontos.innerHTML = '';
 
        for (let i = 0; i < paginas; i++) {
 
            const ponto = document.createElement('button');
 
            ponto.className = 'ponto';
            ponto.setAttribute('aria-label', 'Página ' + (i + 1));
 
            ponto.addEventListener('click', function () {
                pista.scrollTo({
                    left: i * pista.clientWidth,
                    behavior: 'smooth'
                });
            });
 
            areaPontos.appendChild(ponto);
 
        }
 
        atualizarGaleria();
 
    }
 
    function atualizarGaleria() {
 
        const maximo = pista.scrollWidth - pista.clientWidth;
        const pontos = areaPontos.children;
 
        const proporcao = maximo > 0 ? pista.scrollLeft / maximo : 0;
        const ativo = Math.round(proporcao * (pontos.length - 1));
 
        for (let i = 0; i < pontos.length; i++) {
            pontos[i].classList.toggle('ativo', i === ativo);
        }
 
        botaoAnterior.disabled = pista.scrollLeft <= 0;
        botaoProximo.disabled = pista.scrollLeft >= maximo - 1;
 
    }
 
 
    botaoAnterior.addEventListener('click', function () {
        pista.scrollBy({ left: -pista.clientWidth, behavior: 'smooth' });
    });
 
    botaoProximo.addEventListener('click', function () {
        pista.scrollBy({ left: pista.clientWidth, behavior: 'smooth' });
    });
 
    pista.addEventListener('scroll', atualizarGaleria);
 
    window.addEventListener('resize', criarPontos);
 
    criarPontos();
 
}
 
iniciarGaleria();