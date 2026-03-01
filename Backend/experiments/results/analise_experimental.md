# Relatório Estatístico de Campanha Experimental

Fonte de dados: `C:\Users\Lenovo\OneDrive - UTAD\LEI\3º ano\2º semestre\Laboratório de Projeto\Projeto\Projeto-Final-LEI\Frontend\experiments\results\latest.csv`

## Resumo por Cenário e Modo

### Cenário: accident
- Modo: **ai** (n=5)
  - avg_wait_time: mean=9.120, CI95=[6.136, 12.104]
  - flow_rate: mean=5.300, CI95=[4.391, 6.209]
  - co2_emissions: mean=49.830, CI95=[45.720, 53.940]
  - emergency_response_time: mean=2.520, CI95=[2.254, 2.786]
  - total_collisions: mean=22.800, CI95=[21.114, 24.486]
  - collision_avoided: mean=0.000, CI95=[0.000, 0.000]
- Modo: **traditional** (n=5)
  - avg_wait_time: mean=23.980, CI95=[13.575, 34.385]
  - flow_rate: mean=1.500, CI95=[0.963, 2.037]
  - co2_emissions: mean=49.988, CI95=[44.044, 55.932]
  - emergency_response_time: mean=17.880, CI95=[-17.165, 52.925]
  - total_collisions: mean=25.000, CI95=[24.123, 25.877]
  - collision_avoided: mean=0.000, CI95=[0.000, 0.000]

### Cenário: emergency
- Modo: **ai** (n=5)
  - avg_wait_time: mean=7.320, CI95=[6.048, 8.592]
  - flow_rate: mean=10.100, CI95=[8.336, 11.864]
  - co2_emissions: mean=56.582, CI95=[50.751, 62.413]
  - emergency_response_time: mean=1.840, CI95=[1.722, 1.958]
  - total_collisions: mean=17.200, CI95=[15.107, 19.293]
  - collision_avoided: mean=0.000, CI95=[0.000, 0.000]
- Modo: **traditional** (n=5)
  - avg_wait_time: mean=19.320, CI95=[15.618, 23.022]
  - flow_rate: mean=4.400, CI95=[3.071, 5.729]
  - co2_emissions: mean=61.530, CI95=[53.512, 69.548]
  - emergency_response_time: mean=15.620, CI95=[6.173, 25.067]
  - total_collisions: mean=21.200, CI95=[19.107, 23.293]
  - collision_avoided: mean=0.000, CI95=[0.000, 0.000]

### Cenário: normal
- Modo: **ai** (n=5)
  - avg_wait_time: mean=11.900, CI95=[10.073, 13.727]
  - flow_rate: mean=7.900, CI95=[7.057, 8.743]
  - co2_emissions: mean=53.936, CI95=[49.535, 58.337]
  - emergency_response_time: mean=1.900, CI95=[1.609, 2.191]
  - total_collisions: mean=14.600, CI95=[13.816, 15.384]
  - collision_avoided: mean=0.000, CI95=[0.000, 0.000]
- Modo: **traditional** (n=5)
  - avg_wait_time: mean=21.720, CI95=[14.859, 28.581]
  - flow_rate: mean=3.700, CI95=[2.163, 5.237]
  - co2_emissions: mean=48.204, CI95=[40.139, 56.269]
  - emergency_response_time: mean=14.740, CI95=[-0.459, 29.939]
  - total_collisions: mean=17.200, CI95=[15.300, 19.100]
  - collision_avoided: mean=0.000, CI95=[0.000, 0.000]

### Cenário: rush_hour
- Modo: **ai** (n=5)
  - avg_wait_time: mean=5.700, CI95=[4.855, 6.545]
  - flow_rate: mean=12.100, CI95=[11.054, 13.146]
  - co2_emissions: mean=152.774, CI95=[147.464, 158.084]
  - emergency_response_time: mean=1.680, CI95=[1.490, 1.870]
  - total_collisions: mean=83.800, CI95=[82.657, 84.943]
  - collision_avoided: mean=0.200, CI95=[-0.192, 0.592]
- Modo: **traditional** (n=5)
  - avg_wait_time: mean=8.900, CI95=[8.048, 9.752]
  - flow_rate: mean=4.600, CI95=[3.345, 5.855]
  - co2_emissions: mean=149.832, CI95=[146.208, 153.456]
  - emergency_response_time: mean=10.440, CI95=[4.075, 16.805]
  - total_collisions: mean=90.000, CI95=[88.926, 91.074]
  - collision_avoided: mean=0.400, CI95=[-0.080, 0.880]

## Comparação IA vs Tradicional

### Cenário: accident
- avg_wait_time: IA=9.120, Trad=23.980, análise=paired, pares=5, Δ=-14.860, CI95(Δ)=[-21.963, -3.460], melhoria=61.97%, p=0.1305
- flow_rate: IA=5.300, Trad=1.500, análise=paired, pares=5, Δ=3.800, CI95(Δ)=[2.900, 4.400], melhoria=253.33%, p=0.0647
- co2_emissions: IA=49.830, Trad=49.988, análise=paired, pares=5, Δ=-0.158, CI95(Δ)=[-7.030, 8.214], melhoria=0.32%, p=0.9368
- emergency_response_time: IA=2.520, Trad=17.880, análise=paired, pares=5, Δ=-15.360, CI95(Δ)=[-51.340, 2.760], melhoria=85.91%, p=1.0000
- total_collisions: IA=22.800, Trad=25.000, análise=paired, pares=5, Δ=-2.200, CI95(Δ)=[-4.200, -0.800], melhoria=8.80%, p=0.1265
- collision_avoided: IA=0.000, Trad=0.000, análise=paired, pares=5, Δ=0.000, CI95(Δ)=[0.000, 0.000], melhoria=0.00%, p=1.0000

### Cenário: emergency
- avg_wait_time: IA=7.320, Trad=19.320, análise=paired, pares=5, Δ=-12.000, CI95(Δ)=[-16.900, -8.440], melhoria=62.11%, p=0.0647
- flow_rate: IA=10.100, Trad=4.400, análise=paired, pares=5, Δ=5.700, CI95(Δ)=[3.800, 7.100], melhoria=129.55%, p=0.0647
- co2_emissions: IA=56.582, Trad=61.530, análise=paired, pares=5, Δ=-4.948, CI95(Δ)=[-12.738, 2.790], melhoria=8.04%, p=0.4411
- emergency_response_time: IA=1.840, Trad=15.620, análise=paired, pares=5, Δ=-13.780, CI95(Δ)=[-21.711, -5.409], melhoria=88.22%, p=0.1277
- total_collisions: IA=17.200, Trad=21.200, análise=paired, pares=5, Δ=-4.000, CI95(Δ)=[-5.800, -1.400], melhoria=18.87%, p=0.1265
- collision_avoided: IA=0.000, Trad=0.000, análise=paired, pares=5, Δ=0.000, CI95(Δ)=[0.000, 0.000], melhoria=0.00%, p=1.0000

### Cenário: normal
- avg_wait_time: IA=11.900, Trad=21.720, análise=paired, pares=5, Δ=-9.820, CI95(Δ)=[-13.520, -4.760], melhoria=45.21%, p=0.1277
- flow_rate: IA=7.900, Trad=3.700, análise=paired, pares=5, Δ=4.200, CI95(Δ)=[3.300, 5.400], melhoria=113.51%, p=0.0647
- co2_emissions: IA=53.936, Trad=48.204, análise=paired, pares=5, Δ=5.732, CI95(Δ)=[0.870, 10.416], melhoria=-11.89%, p=0.1850
- emergency_response_time: IA=1.900, Trad=14.740, análise=paired, pares=5, Δ=-12.840, CI95(Δ)=[-27.320, -0.680], melhoria=87.11%, p=0.2562
- total_collisions: IA=14.600, Trad=17.200, análise=paired, pares=5, Δ=-2.600, CI95(Δ)=[-4.400, -1.000], melhoria=15.12%, p=0.1217
- collision_avoided: IA=0.000, Trad=0.000, análise=paired, pares=5, Δ=0.000, CI95(Δ)=[0.000, 0.000], melhoria=0.00%, p=1.0000

### Cenário: rush_hour
- avg_wait_time: IA=5.700, Trad=8.900, análise=paired, pares=5, Δ=-3.200, CI95(Δ)=[-4.460, -1.940], melhoria=35.96%, p=0.0647
- flow_rate: IA=12.100, Trad=4.600, análise=paired, pares=5, Δ=7.500, CI95(Δ)=[5.500, 9.400], melhoria=163.04%, p=0.0647
- co2_emissions: IA=152.774, Trad=149.832, análise=paired, pares=5, Δ=2.942, CI95(Δ)=[-1.484, 6.646], melhoria=-1.96%, p=0.2527
- emergency_response_time: IA=1.680, Trad=10.440, análise=paired, pares=5, Δ=-8.760, CI95(Δ)=[-15.060, -3.832], melhoria=83.91%, p=0.0647
- total_collisions: IA=83.800, Trad=90.000, análise=paired, pares=5, Δ=-6.200, CI95(Δ)=[-7.800, -4.200], melhoria=6.89%, p=0.0647
- collision_avoided: IA=0.200, Trad=0.400, análise=paired, pares=5, Δ=-0.200, CI95(Δ)=[-0.800, 0.400], melhoria=-50.00%, p=1.0000

## Nota Metodológica
- Intervalos de confiança de cada modo: aproximação normal (95%).
- Diferença IA-Tradicional: bootstrap e teste de permutação.
- Sempre que possível, comparação emparelhada por cenário/repetição/seed.