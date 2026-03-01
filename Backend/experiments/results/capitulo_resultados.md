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
- Na métrica **tempo médio de espera**, o modo IA apresentou média 9.120 (Tradicional: 23.980), com diferença IA-Tradicional de -14.860 (CI95: [-21.963, -3.460]), correspondendo a redução de 61.97%; p=0.1305 (análise emparelhada (n pares=5)).
- Na métrica **taxa de fluxo**, o modo IA apresentou média 5.300 (Tradicional: 1.500), com diferença IA-Tradicional de 3.800 (CI95: [2.900, 4.400]), correspondendo a aumento de 253.33%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **emissões de CO2**, o modo IA apresentou média 49.830 (Tradicional: 49.988), com diferença IA-Tradicional de -0.158 (CI95: [-7.030, 8.214]), correspondendo a redução de 0.32%; p=0.9368 (análise emparelhada (n pares=5)).
- Na métrica **tempo de resposta de emergência**, o modo IA apresentou média 2.520 (Tradicional: 17.880), com diferença IA-Tradicional de -15.360 (CI95: [-51.340, 2.760]), correspondendo a redução de 85.91%; p=1.0000 (análise emparelhada (n pares=5)).
- Na métrica **colisões totais**, o modo IA apresentou média 22.800 (Tradicional: 25.000), com diferença IA-Tradicional de -2.200 (CI95: [-4.200, -0.800]), correspondendo a redução de 8.80%; p=0.1265 (análise emparelhada (n pares=5)).
- Na métrica **colisões evitadas**, o modo IA apresentou média 0.000 (Tradicional: 0.000), com diferença IA-Tradicional de 0.000 (CI95: [0.000, 0.000]), correspondendo a aumento de 0.00%; p=1.0000 (análise emparelhada (n pares=5)).
- Na métrica **tempo médio de espera (ligeiros)**, o modo IA apresentou média 14.620 (Tradicional: 21.000), com diferença IA-Tradicional de -6.380 (CI95: [-18.820, 6.820]), correspondendo a redução de 30.38%; p=0.5051 (análise emparelhada (n pares=5)).
- Na métrica **tempo médio de espera (pesados)**, o modo IA apresentou média 0.520 (Tradicional: 2.840), com diferença IA-Tradicional de -2.320 (CI95: [-6.960, 0.000]), correspondendo a redução de 81.69%; p=1.0000 (análise emparelhada (n pares=5)).
- Na métrica **veículos ligeiros concluídos**, o modo IA apresentou média 6.600 (Tradicional: 2.600), com diferença IA-Tradicional de 4.000 (CI95: [3.000, 4.800]), correspondendo a aumento de 153.85%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **veículos pesados concluídos**, o modo IA apresentou média 0.200 (Tradicional: 0.200), com diferença IA-Tradicional de 0.000 (CI95: [0.000, 0.000]), correspondendo a aumento de 0.00%; p=1.0000 (análise emparelhada (n pares=5)).

### emergency
- Na métrica **tempo médio de espera**, o modo IA apresentou média 7.320 (Tradicional: 19.320), com diferença IA-Tradicional de -12.000 (CI95: [-16.900, -8.440]), correspondendo a redução de 62.11%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **taxa de fluxo**, o modo IA apresentou média 10.100 (Tradicional: 4.400), com diferença IA-Tradicional de 5.700 (CI95: [3.800, 7.100]), correspondendo a aumento de 129.55%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **emissões de CO2**, o modo IA apresentou média 56.582 (Tradicional: 61.530), com diferença IA-Tradicional de -4.948 (CI95: [-12.738, 2.790]), correspondendo a redução de 8.04%; p=0.4411 (análise emparelhada (n pares=5)).
- Na métrica **tempo de resposta de emergência**, o modo IA apresentou média 1.840 (Tradicional: 15.620), com diferença IA-Tradicional de -13.780 (CI95: [-21.711, -5.409]), correspondendo a redução de 88.22%; p=0.1277 (análise emparelhada (n pares=5)).
- Na métrica **colisões totais**, o modo IA apresentou média 17.200 (Tradicional: 21.200), com diferença IA-Tradicional de -4.000 (CI95: [-5.800, -1.400]), correspondendo a redução de 18.87%; p=0.1265 (análise emparelhada (n pares=5)).
- Na métrica **colisões evitadas**, o modo IA apresentou média 0.000 (Tradicional: 0.000), com diferença IA-Tradicional de 0.000 (CI95: [0.000, 0.000]), correspondendo a aumento de 0.00%; p=1.0000 (análise emparelhada (n pares=5)).
- Na métrica **tempo médio de espera (ligeiros)**, o modo IA apresentou média 14.320 (Tradicional: 17.820), com diferença IA-Tradicional de -3.500 (CI95: [-9.120, 3.420]), correspondendo a redução de 19.64%; p=0.3909 (análise emparelhada (n pares=5)).
- Na métrica **tempo médio de espera (pesados)**, o modo IA apresentou média 18.000 (Tradicional: 14.920), com diferença IA-Tradicional de 3.080 (CI95: [-1.440, 8.840]), correspondendo a aumento de 20.64%; p=0.4944 (análise emparelhada (n pares=5)).
- Na métrica **veículos ligeiros concluídos**, o modo IA apresentou média 8.800 (Tradicional: 5.200), com diferença IA-Tradicional de 3.600 (CI95: [2.200, 5.400]), correspondendo a aumento de 69.23%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **veículos pesados concluídos**, o modo IA apresentou média 1.000 (Tradicional: 0.600), com diferença IA-Tradicional de 0.400 (CI95: [0.000, 0.800]), correspondendo a aumento de 66.67%; p=0.4999 (análise emparelhada (n pares=5)).

### normal
- Na métrica **tempo médio de espera**, o modo IA apresentou média 11.900 (Tradicional: 21.720), com diferença IA-Tradicional de -9.820 (CI95: [-13.520, -4.760]), correspondendo a redução de 45.21%; p=0.1277 (análise emparelhada (n pares=5)).
- Na métrica **taxa de fluxo**, o modo IA apresentou média 7.900 (Tradicional: 3.700), com diferença IA-Tradicional de 4.200 (CI95: [3.300, 5.400]), correspondendo a aumento de 113.51%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **emissões de CO2**, o modo IA apresentou média 53.936 (Tradicional: 48.204), com diferença IA-Tradicional de 5.732 (CI95: [0.870, 10.416]), correspondendo a aumento de 11.89%; p=0.1850 (análise emparelhada (n pares=5)).
- Na métrica **tempo de resposta de emergência**, o modo IA apresentou média 1.900 (Tradicional: 14.740), com diferença IA-Tradicional de -12.840 (CI95: [-27.320, -0.680]), correspondendo a redução de 87.11%; p=0.2562 (análise emparelhada (n pares=5)).
- Na métrica **colisões totais**, o modo IA apresentou média 14.600 (Tradicional: 17.200), com diferença IA-Tradicional de -2.600 (CI95: [-4.400, -1.000]), correspondendo a redução de 15.12%; p=0.1217 (análise emparelhada (n pares=5)).
- Na métrica **colisões evitadas**, o modo IA apresentou média 0.000 (Tradicional: 0.000), com diferença IA-Tradicional de 0.000 (CI95: [0.000, 0.000]), correspondendo a aumento de 0.00%; p=1.0000 (análise emparelhada (n pares=5)).
- Na métrica **tempo médio de espera (ligeiros)**, o modo IA apresentou média 14.960 (Tradicional: 21.020), com diferença IA-Tradicional de -6.060 (CI95: [-10.500, -0.520]), correspondendo a redução de 28.83%; p=0.1277 (análise emparelhada (n pares=5)).
- Na métrica **tempo médio de espera (pesados)**, o modo IA apresentou média 12.280 (Tradicional: 0.000), com diferença IA-Tradicional de 12.280 (CI95: [1.880, 24.640]), correspondendo a redução de 0.00%; p=0.2447 (análise emparelhada (n pares=5)).
- Na métrica **veículos ligeiros concluídos**, o modo IA apresentou média 11.400 (Tradicional: 6.200), com diferença IA-Tradicional de 5.200 (CI95: [3.200, 7.000]), correspondendo a aumento de 83.87%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **veículos pesados concluídos**, o modo IA apresentou média 1.200 (Tradicional: 0.000), com diferença IA-Tradicional de 1.200 (CI95: [0.400, 2.200]), correspondendo a aumento de 0.00%; p=0.1277 (análise emparelhada (n pares=5)).

### rush_hour
- Na métrica **tempo médio de espera**, o modo IA apresentou média 5.700 (Tradicional: 8.900), com diferença IA-Tradicional de -3.200 (CI95: [-4.460, -1.940]), correspondendo a redução de 35.96%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **taxa de fluxo**, o modo IA apresentou média 12.100 (Tradicional: 4.600), com diferença IA-Tradicional de 7.500 (CI95: [5.500, 9.400]), correspondendo a aumento de 163.04%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **emissões de CO2**, o modo IA apresentou média 152.774 (Tradicional: 149.832), com diferença IA-Tradicional de 2.942 (CI95: [-1.484, 6.646]), correspondendo a aumento de 1.96%; p=0.2527 (análise emparelhada (n pares=5)).
- Na métrica **tempo de resposta de emergência**, o modo IA apresentou média 1.680 (Tradicional: 10.440), com diferença IA-Tradicional de -8.760 (CI95: [-15.060, -3.832]), correspondendo a redução de 83.91%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **colisões totais**, o modo IA apresentou média 83.800 (Tradicional: 90.000), com diferença IA-Tradicional de -6.200 (CI95: [-7.800, -4.200]), correspondendo a redução de 6.89%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **colisões evitadas**, o modo IA apresentou média 0.200 (Tradicional: 0.400), com diferença IA-Tradicional de -0.200 (CI95: [-0.800, 0.400]), correspondendo a redução de 50.00%; p=1.0000 (análise emparelhada (n pares=5)).
- Na métrica **tempo médio de espera (ligeiros)**, o modo IA apresentou média 8.600 (Tradicional: 8.580), com diferença IA-Tradicional de 0.020 (CI95: [-1.600, 1.640]), correspondendo a aumento de 0.23%; p=1.0000 (análise emparelhada (n pares=5)).
- Na métrica **tempo médio de espera (pesados)**, o modo IA apresentou média 5.360 (Tradicional: 5.840), com diferença IA-Tradicional de -0.480 (CI95: [-7.840, 8.640]), correspondendo a redução de 8.22%; p=1.0000 (análise emparelhada (n pares=5)).
- Na métrica **veículos ligeiros concluídos**, o modo IA apresentou média 15.200 (Tradicional: 7.600), com diferença IA-Tradicional de 7.600 (CI95: [4.600, 10.400]), correspondendo a aumento de 100.00%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **veículos pesados concluídos**, o modo IA apresentou média 0.800 (Tradicional: 0.400), com diferença IA-Tradicional de 0.400 (CI95: [0.000, 0.800]), correspondendo a aumento de 100.00%; p=0.5134 (análise emparelhada (n pares=5)).

## Síntese

De forma global, os resultados permitem quantificar ganhos e limitações do controlo IA
em diferentes cenários. A interpretação final deve considerar simultaneamente magnitude
do efeito, consistência entre cenários e significância estatística.

## Figuras recomendadas

- Boxplots por cenário e métrica (distribuição das corridas).
- Barras com média e CI95 para IA vs Tradicional por cenário.