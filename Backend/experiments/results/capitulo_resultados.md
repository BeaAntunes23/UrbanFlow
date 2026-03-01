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

Para a inferência estatística foram usados:
- intervalos de confiança (95%);
- teste de permutação bilateral para diferença IA vs Tradicional.

## Resultados por Cenário

### accident
- Na métrica **tempo médio de espera**, o modo IA apresentou média 20.560 (Tradicional: 39.940), com diferença IA-Tradicional de -19.380 (CI95: [-24.580, -15.720]), correspondendo a redução de 48.52%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **taxa de fluxo**, o modo IA apresentou média 19.500 (Tradicional: 8.700), com diferença IA-Tradicional de 10.800 (CI95: [8.600, 13.000]), correspondendo a aumento de 124.14%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **emissões de CO2**, o modo IA apresentou média 135.602 (Tradicional: 111.972), com diferença IA-Tradicional de 23.630 (CI95: [6.520, 40.138]), correspondendo a aumento de 21.10%; p=0.1265 (análise emparelhada (n pares=5)).
- Na métrica **tempo de resposta de emergência**, o modo IA apresentou média 3.420 (Tradicional: 40.980), com diferença IA-Tradicional de -37.560 (CI95: [-56.400, -15.140]), correspondendo a redução de 91.65%; p=0.1217 (análise emparelhada (n pares=5)).

### emergency
- Na métrica **tempo médio de espera**, o modo IA apresentou média 16.240 (Tradicional: 32.460), com diferença IA-Tradicional de -16.220 (CI95: [-19.960, -12.480]), correspondendo a redução de 49.97%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **taxa de fluxo**, o modo IA apresentou média 23.700 (Tradicional: 16.800), com diferença IA-Tradicional de 6.900 (CI95: [5.598, 8.100]), correspondendo a aumento de 41.07%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **emissões de CO2**, o modo IA apresentou média 137.132 (Tradicional: 188.492), com diferença IA-Tradicional de -51.360 (CI95: [-85.624, -17.474]), correspondendo a redução de 27.25%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **tempo de resposta de emergência**, o modo IA apresentou média 1.860 (Tradicional: 32.580), com diferença IA-Tradicional de -30.720 (CI95: [-32.600, -28.700]), correspondendo a redução de 94.29%; p=0.0647 (análise emparelhada (n pares=5)).

### normal
- Na métrica **tempo médio de espera**, o modo IA apresentou média 19.240 (Tradicional: 29.520), com diferença IA-Tradicional de -10.280 (CI95: [-12.820, -7.740]), correspondendo a redução de 34.82%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **taxa de fluxo**, o modo IA apresentou média 19.200 (Tradicional: 13.700), com diferença IA-Tradicional de 5.500 (CI95: [4.600, 6.200]), correspondendo a aumento de 40.15%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **emissões de CO2**, o modo IA apresentou média 129.176 (Tradicional: 143.750), com diferença IA-Tradicional de -14.574 (CI95: [-37.444, 3.398]), correspondendo a redução de 10.14%; p=0.4429 (análise emparelhada (n pares=5)).
- Na métrica **tempo de resposta de emergência**, o modo IA apresentou média 1.920 (Tradicional: 24.960), com diferença IA-Tradicional de -23.040 (CI95: [-39.280, -7.280]), correspondendo a redução de 92.31%; p=0.1265 (análise emparelhada (n pares=5)).

### rush_hour
- Na métrica **tempo médio de espera**, o modo IA apresentou média 25.720 (Tradicional: 39.520), com diferença IA-Tradicional de -13.800 (CI95: [-16.420, -11.600]), correspondendo a redução de 34.92%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **taxa de fluxo**, o modo IA apresentou média 49.900 (Tradicional: 28.900), com diferença IA-Tradicional de 21.000 (CI95: [19.200, 22.800]), correspondendo a aumento de 72.66%; p=0.0647 (análise emparelhada (n pares=5)).
- Na métrica **emissões de CO2**, o modo IA apresentou média 476.892 (Tradicional: 415.130), com diferença IA-Tradicional de 61.762 (CI95: [22.178, 92.018]), correspondendo a aumento de 14.88%; p=0.1305 (análise emparelhada (n pares=5)).
- Na métrica **tempo de resposta de emergência**, o modo IA apresentou média 1.740 (Tradicional: 40.060), com diferença IA-Tradicional de -38.320 (CI95: [-60.840, -15.567]), correspondendo a redução de 95.66%; p=0.1217 (análise emparelhada (n pares=5)).

## Síntese

De forma global, os resultados permitem quantificar ganhos e limitações do controlo IA
em diferentes cenários. A interpretação final deve considerar simultaneamente magnitude
do efeito, consistência entre cenários e significância estatística.

## Figuras recomendadas

- Boxplots por cenário e métrica (distribuição das corridas).
- Barras com média e CI95 para IA vs Tradicional por cenário.