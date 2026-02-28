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
- Na métrica **tempo médio de espera**, o modo IA apresentou média 21.800 (Tradicional: 36.740), com diferença IA-Tradicional de -14.940 (CI95: [-21.261, -9.280]), correspondendo a redução de 40.66%; p=0.0067.
- Na métrica **taxa de fluxo**, o modo IA apresentou média 20.300 (Tradicional: 9.300), com diferença IA-Tradicional de 11.000 (CI95: [9.300, 12.600]), correspondendo a aumento de 118.28%; p=0.0067.
- Na métrica **emissões de CO2**, o modo IA apresentou média 145.218 (Tradicional: 119.270), com diferença IA-Tradicional de 25.948 (CI95: [-12.209, 60.009]), correspondendo a aumento de 21.76%; p=0.2419.
- Na métrica **tempo de resposta de emergência**, o modo IA apresentou média 3.480 (Tradicional: 28.600), com diferença IA-Tradicional de -25.120 (CI95: [-38.261, -9.419]), correspondendo a redução de 87.83%; p=0.0457.

### emergency
- Na métrica **tempo médio de espera**, o modo IA apresentou média 15.140 (Tradicional: 34.660), com diferença IA-Tradicional de -19.520 (CI95: [-24.040, -14.440]), correspondendo a redução de 56.32%; p=0.0047.
- Na métrica **taxa de fluxo**, o modo IA apresentou média 23.700 (Tradicional: 16.100), com diferença IA-Tradicional de 7.600 (CI95: [5.800, 9.200]), correspondendo a aumento de 47.20%; p=0.0067.
- Na métrica **emissões de CO2**, o modo IA apresentou média 135.478 (Tradicional: 186.310), com diferença IA-Tradicional de -50.832 (CI95: [-81.962, -22.174]), correspondendo a redução de 27.28%; p=0.0220.
- Na métrica **tempo de resposta de emergência**, o modo IA apresentou média 1.880 (Tradicional: 34.220), com diferença IA-Tradicional de -32.340 (CI95: [-36.221, -28.480]), correspondendo a redução de 94.51%; p=0.0067.

### normal
- Na métrica **tempo médio de espera**, o modo IA apresentou média 21.280 (Tradicional: 34.280), com diferença IA-Tradicional de -13.000 (CI95: [-16.800, -8.780]), correspondendo a redução de 37.92%; p=0.0045.
- Na métrica **taxa de fluxo**, o modo IA apresentou média 19.700 (Tradicional: 13.100), com diferença IA-Tradicional de 6.600 (CI95: [6.200, 7.100]), correspondendo a aumento de 50.38%; p=0.0067.
- Na métrica **emissões de CO2**, o modo IA apresentou média 144.538 (Tradicional: 129.758), com diferença IA-Tradicional de 14.780 (CI95: [-6.871, 38.640]), correspondendo a aumento de 11.39%; p=0.2874.
- Na métrica **tempo de resposta de emergência**, o modo IA apresentou média 1.840 (Tradicional: 19.320), com diferença IA-Tradicional de -17.480 (CI95: [-34.380, -0.700]), correspondendo a redução de 90.48%; p=0.1560.

### rush_hour
- Na métrica **tempo médio de espera**, o modo IA apresentou média 26.080 (Tradicional: 39.400), com diferença IA-Tradicional de -13.320 (CI95: [-15.941, -10.580]), correspondendo a redução de 33.81%; p=0.0067.
- Na métrica **taxa de fluxo**, o modo IA apresentou média 50.900 (Tradicional: 30.300), com diferença IA-Tradicional de 20.600 (CI95: [16.900, 25.500]), correspondendo a aumento de 67.99%; p=0.0067.
- Na métrica **emissões de CO2**, o modo IA apresentou média 453.706 (Tradicional: 407.392), com diferença IA-Tradicional de 46.314 (CI95: [2.682, 85.032]), correspondendo a aumento de 11.37%; p=0.0902.
- Na métrica **tempo de resposta de emergência**, o modo IA apresentou média 1.780 (Tradicional: 44.400), com diferença IA-Tradicional de -42.620 (CI95: [-48.341, -36.999]), correspondendo a redução de 95.99%; p=0.0067.

## Síntese

De forma global, os resultados permitem quantificar ganhos e limitações do controlo IA
em diferentes cenários. A interpretação final deve considerar simultaneamente magnitude
do efeito, consistência entre cenários e significância estatística.

## Figuras recomendadas

- Boxplots por cenário e métrica (distribuição das corridas).
- Barras com média e CI95 para IA vs Tradicional por cenário.