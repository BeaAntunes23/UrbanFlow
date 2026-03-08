# Capítulo de Resultados Experimentais

## Metodologia Experimental

Foi realizada uma campanha comparativa entre os modos de controlo **IA** e **Tradicional**,
utilizando o mesmo ambiente de simulação, múltiplos cenários urbanos e repetições independentes.

Fonte de dados da campanha: `C:\Users\Lenovo\OneDrive - UTAD\LEI\3º ano\2º semestre\Laboratório de Projeto\Projeto\Projeto-Final-LEI\Frontend\experiments\results\latest.csv`

A análise considerou as métricas:
- tempo médio de espera;
- taxa de fluxo;
- emissões de CO2;
- tempo de resposta de emergência.
- colisões totais;
- colisões evitadas.
- tempo médio de espera por classe (ligeiros e pesados);
- volume concluído por classe (ligeiros e pesados).

Para a inferência estatística foram usados:
- intervalos de confiança (95%);
- teste de permutação bilateral para diferença IA vs Tradicional.

## Resultados por Cenário

### accident
- Na métrica **tempo médio de espera**, o modo IA apresentou média 26.730 (Tradicional: 69.760), com diferença IA-Tradicional de -43.030 (CI95: [-47.498, -38.740]), correspondendo a redução de 61.68%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **taxa de fluxo**, o modo IA apresentou média 4.913 (Tradicional: 2.033), com diferença IA-Tradicional de 2.880 (CI95: [2.540, 3.247]), correspondendo a aumento de 141.64%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **emissões de CO2**, o modo IA apresentou média 188.019 (Tradicional: 195.180), com diferença IA-Tradicional de -7.160 (CI95: [-19.068, 3.830]), correspondendo a redução de 3.67%; p=0.2387 (análise emparelhada (n pares=30)).
- Na métrica **tempo de resposta de emergência**, o modo IA apresentou média 3.873 (Tradicional: 41.320), com diferença IA-Tradicional de -37.447 (CI95: [-50.594, -25.486]), correspondendo a redução de 90.63%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **colisões totais**, o modo IA apresentou média 58.133 (Tradicional: 64.633), com diferença IA-Tradicional de -6.500 (CI95: [-7.534, -5.467]), correspondendo a redução de 10.06%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **colisões evitadas**, o modo IA apresentou média 0.333 (Tradicional: 0.067), com diferença IA-Tradicional de 0.267 (CI95: [0.067, 0.500]), correspondendo a aumento de 400.00%; p=0.0557 (análise emparelhada (n pares=30)).
- Na métrica **tempo médio de espera (ligeiros)**, o modo IA apresentou média 37.300 (Tradicional: 72.323), com diferença IA-Tradicional de -35.023 (CI95: [-40.271, -29.916]), correspondendo a redução de 48.43%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **tempo médio de espera (pesados)**, o modo IA apresentou média 21.707 (Tradicional: 16.743), com diferença IA-Tradicional de 4.963 (CI95: [-7.528, 17.227]), correspondendo a aumento de 29.64%; p=0.4414 (análise emparelhada (n pares=30)).
- Na métrica **veículos ligeiros concluídos**, o modo IA apresentou média 16.800 (Tradicional: 8.567), com diferença IA-Tradicional de 8.233 (CI95: [6.832, 9.833]), correspondendo a aumento de 96.11%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **veículos pesados concluídos**, o modo IA apresentou média 0.900 (Tradicional: 0.400), com diferença IA-Tradicional de 0.500 (CI95: [0.100, 0.933]), correspondendo a aumento de 125.00%; p=0.0342 (análise emparelhada (n pares=30)).

### emergency
- Na métrica **tempo médio de espera**, o modo IA apresentou média 17.680 (Tradicional: 68.110), com diferença IA-Tradicional de -50.430 (CI95: [-53.543, -47.359]), correspondendo a redução de 74.04%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **taxa de fluxo**, o modo IA apresentou média 9.593 (Tradicional: 3.313), com diferença IA-Tradicional de 6.280 (CI95: [5.747, 6.794]), correspondendo a aumento de 189.54%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **emissões de CO2**, o modo IA apresentou média 211.792 (Tradicional: 261.931), com diferença IA-Tradicional de -50.140 (CI95: [-65.002, -35.100]), correspondendo a redução de 19.14%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **tempo de resposta de emergência**, o modo IA apresentou média 2.920 (Tradicional: 64.993), com diferença IA-Tradicional de -62.073 (CI95: [-69.960, -54.177]), correspondendo a redução de 95.51%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **colisões totais**, o modo IA apresentou média 46.767 (Tradicional: 60.400), com diferença IA-Tradicional de -13.633 (CI95: [-15.300, -11.933]), correspondendo a redução de 22.57%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **colisões evitadas**, o modo IA apresentou média 0.167 (Tradicional: 0.100), com diferença IA-Tradicional de 0.067 (CI95: [-0.100, 0.267]), correspondendo a aumento de 66.67%; p=0.7193 (análise emparelhada (n pares=30)).
- Na métrica **tempo médio de espera (ligeiros)**, o modo IA apresentou média 34.790 (Tradicional: 69.123), com diferença IA-Tradicional de -34.333 (CI95: [-38.337, -30.340]), correspondendo a redução de 49.67%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **tempo médio de espera (pesados)**, o modo IA apresentou média 24.820 (Tradicional: 35.387), com diferença IA-Tradicional de -10.567 (CI95: [-27.658, 7.190]), correspondendo a redução de 29.86%; p=0.2619 (análise emparelhada (n pares=30)).
- Na métrica **veículos ligeiros concluídos**, o modo IA apresentou média 23.033 (Tradicional: 11.400), com diferença IA-Tradicional de 11.633 (CI95: [9.933, 13.433]), correspondendo a aumento de 102.05%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **veículos pesados concluídos**, o modo IA apresentou média 1.433 (Tradicional: 0.533), com diferença IA-Tradicional de 0.900 (CI95: [0.367, 1.433]), correspondendo a aumento de 168.75%; p=0.0027 (análise emparelhada (n pares=30)).

### normal
- Na métrica **tempo médio de espera**, o modo IA apresentou média 32.013 (Tradicional: 75.230), com diferença IA-Tradicional de -43.217 (CI95: [-47.074, -39.406]), correspondendo a redução de 57.45%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **taxa de fluxo**, o modo IA apresentou média 6.573 (Tradicional: 3.013), com diferença IA-Tradicional de 3.560 (CI95: [3.207, 3.927]), correspondendo a aumento de 118.14%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **emissões de CO2**, o modo IA apresentou média 217.682 (Tradicional: 231.563), com diferença IA-Tradicional de -13.881 (CI95: [-31.297, 3.959]), correspondendo a redução de 5.99%; p=0.1450 (análise emparelhada (n pares=30)).
- Na métrica **tempo de resposta de emergência**, o modo IA apresentou média 2.807 (Tradicional: 49.463), com diferença IA-Tradicional de -46.657 (CI95: [-62.404, -30.586]), correspondendo a redução de 94.33%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **colisões totais**, o modo IA apresentou média 41.800 (Tradicional: 49.433), com diferença IA-Tradicional de -7.633 (CI95: [-8.533, -6.667]), correspondendo a redução de 15.44%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **colisões evitadas**, o modo IA apresentou média 0.167 (Tradicional: 0.067), com diferença IA-Tradicional de 0.100 (CI95: [-0.100, 0.333]), correspondendo a aumento de 150.00%; p=0.5666 (análise emparelhada (n pares=30)).
- Na métrica **tempo médio de espera (ligeiros)**, o modo IA apresentou média 37.160 (Tradicional: 75.680), com diferença IA-Tradicional de -38.520 (CI95: [-42.334, -34.567]), correspondendo a redução de 50.90%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **tempo médio de espera (pesados)**, o modo IA apresentou média 25.587 (Tradicional: 35.813), com diferença IA-Tradicional de -10.227 (CI95: [-28.428, 6.528]), correspondendo a redução de 28.56%; p=0.2582 (análise emparelhada (n pares=30)).
- Na métrica **veículos ligeiros concluídos**, o modo IA apresentou média 27.000 (Tradicional: 13.400), com diferença IA-Tradicional de 13.600 (CI95: [11.867, 15.300]), correspondendo a aumento de 101.49%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **veículos pesados concluídos**, o modo IA apresentou média 1.567 (Tradicional: 0.633), com diferença IA-Tradicional de 0.933 (CI95: [0.500, 1.333]), correspondendo a aumento de 147.37%; p=0.0010 (análise emparelhada (n pares=30)).

### rush_hour
- Na métrica **tempo médio de espera**, o modo IA apresentou média 19.890 (Tradicional: 49.960), com diferença IA-Tradicional de -30.070 (CI95: [-33.203, -27.333]), correspondendo a redução de 60.19%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **taxa de fluxo**, o modo IA apresentou média 7.913 (Tradicional: 2.847), com diferença IA-Tradicional de 5.067 (CI95: [4.667, 5.493]), correspondendo a aumento de 177.99%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **emissões de CO2**, o modo IA apresentou média 459.442 (Tradicional: 452.175), com diferença IA-Tradicional de 7.267 (CI95: [-5.970, 19.366]), correspondendo a aumento de 1.61%; p=0.2892 (análise emparelhada (n pares=30)).
- Na métrica **tempo de resposta de emergência**, o modo IA apresentou média 2.747 (Tradicional: 32.283), com diferença IA-Tradicional de -29.537 (CI95: [-42.207, -17.773]), correspondendo a redução de 91.49%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **colisões totais**, o modo IA apresentou média 222.433 (Tradicional: 234.667), com diferença IA-Tradicional de -12.233 (CI95: [-13.333, -11.267]), correspondendo a redução de 5.21%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **colisões evitadas**, o modo IA apresentou média 0.833 (Tradicional: 0.633), com diferença IA-Tradicional de 0.200 (CI95: [-0.267, 0.667]), correspondendo a aumento de 31.58%; p=0.4964 (análise emparelhada (n pares=30)).
- Na métrica **tempo médio de espera (ligeiros)**, o modo IA apresentou média 27.533 (Tradicional: 49.427), com diferença IA-Tradicional de -21.893 (CI95: [-25.647, -18.437]), correspondendo a redução de 44.29%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **tempo médio de espera (pesados)**, o modo IA apresentou média 24.580 (Tradicional: 22.753), com diferença IA-Tradicional de 1.827 (CI95: [-10.661, 13.641]), correspondendo a aumento de 8.03%; p=0.7711 (análise emparelhada (n pares=30)).
- Na métrica **veículos ligeiros concluídos**, o modo IA apresentou média 26.867 (Tradicional: 12.833), com diferença IA-Tradicional de 14.033 (CI95: [12.133, 16.068]), correspondendo a aumento de 109.35%; p=0.0002 (análise emparelhada (n pares=30)).
- Na métrica **veículos pesados concluídos**, o modo IA apresentou média 1.600 (Tradicional: 0.467), com diferença IA-Tradicional de 1.133 (CI95: [0.667, 1.600]), correspondendo a aumento de 242.86%; p=0.0002 (análise emparelhada (n pares=30)).

## Integração de RL na Comparação Final

Além da comparação principal IA vs Tradicional, foi incluída uma avaliação adicional com o agente **RL (Q-Learning)** para posicionar o seu desempenho relativo no mesmo conjunto de cenários.

Configuração da avaliação RL:
- repetições por cenário/modo: 3;
- duração por corrida: 90s; dt=0.2;
- dimensão da grelha: 4x4.

### Resultados RL por Cenário

#### accident
- Espera média: RL=19.567s, IA=6.067s, Tradicional=18.333s.
- Fluxo médio: RL=1.333 veíc/min, IA=6.233 veíc/min, Tradicional=1.300 veíc/min.
- Colisões totais: RL=18.333, IA=16.000, Tradicional=19.000.
- Melhor modo por métrica: tempo médio de espera: AI (6.067); taxa de fluxo: AI (6.233); emissões de CO2: AI (34.423); tempo de resposta de emergência: TRADITIONAL (0.000); colisões totais: AI (16.000).

#### emergency
- Espera média: RL=18.400s, IA=7.733s, Tradicional=17.333s.
- Fluxo médio: RL=5.800 veíc/min, IA=8.433 veíc/min, Tradicional=3.533 veíc/min.
- Colisões totais: RL=14.667, IA=13.667, Tradicional=16.000.
- Melhor modo por métrica: tempo médio de espera: AI (7.733); taxa de fluxo: AI (8.433); emissões de CO2: TRADITIONAL (40.887); tempo de resposta de emergência: AI (1.767); colisões totais: AI (13.667).

#### normal
- Espera média: RL=11.333s, IA=11.267s, Tradicional=8.700s.
- Fluxo médio: RL=5.333 veíc/min, IA=8.200 veíc/min, Tradicional=3.100 veíc/min.
- Colisões totais: RL=12.333, IA=10.333, Tradicional=12.333.
- Melhor modo por métrica: tempo médio de espera: TRADITIONAL (8.700); taxa de fluxo: AI (8.200); emissões de CO2: TRADITIONAL (27.460); tempo de resposta de emergência: RL (0.000); colisões totais: AI (10.333).

#### rush_hour
- Espera média: RL=4.367s, IA=5.367s, Tradicional=7.100s.
- Fluxo médio: RL=9.567 veíc/min, IA=10.900 veíc/min, Tradicional=5.333 veíc/min.
- Colisões totais: RL=62.667, IA=61.000, Tradicional=64.667.
- Melhor modo por métrica: tempo médio de espera: RL (4.367); taxa de fluxo: AI (10.900); emissões de CO2: RL (105.727); tempo de resposta de emergência: RL (1.300); colisões totais: AI (61.000).

### Nota Metodológica

A comparação com RL neste capítulo é **descritiva** (médias por cenário/modo). Para conclusão inferencial forte, recomenda-se repetir a análise emparelhada e os testes estatísticos também para o modo RL no mesmo desenho experimental da comparação IA vs Tradicional.

## Síntese

De forma global, os resultados permitem quantificar ganhos e limitações do controlo IA
em diferentes cenários. A interpretação final deve considerar simultaneamente magnitude
do efeito, consistência entre cenários e significância estatística.

## Figuras recomendadas

- Boxplots por cenário e métrica (distribuição das corridas).
- Barras com média e CI95 para IA vs Tradicional por cenário.