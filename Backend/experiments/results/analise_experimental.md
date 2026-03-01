# Relatório Estatístico de Campanha Experimental

Fonte de dados: `C:\Users\Lenovo\OneDrive - UTAD\LEI\3º ano\2º semestre\Laboratório de Projeto\Projeto\Projeto-Final-LEI\Frontend\experiments\results\latest.csv`

## Resumo por Cenário e Modo

### Cenário: accident
- Modo: **ai** (n=5)
  - avg_wait_time: mean=20.560, CI95=[18.387, 22.733]
  - flow_rate: mean=19.500, CI95=[17.615, 21.385]
  - co2_emissions: mean=135.602, CI95=[112.468, 158.736]
  - emergency_response_time: mean=3.420, CI95=[2.871, 3.969]
- Modo: **traditional** (n=5)
  - avg_wait_time: mean=39.940, CI95=[35.552, 44.328]
  - flow_rate: mean=8.700, CI95=[7.691, 9.709]
  - co2_emissions: mean=111.972, CI95=[89.192, 134.752]
  - emergency_response_time: mean=40.980, CI95=[17.971, 63.989]

### Cenário: emergency
- Modo: **ai** (n=5)
  - avg_wait_time: mean=16.240, CI95=[12.176, 20.304]
  - flow_rate: mean=23.700, CI95=[22.557, 24.843]
  - co2_emissions: mean=137.132, CI95=[104.980, 169.284]
  - emergency_response_time: mean=1.860, CI95=[1.782, 1.938]
- Modo: **traditional** (n=5)
  - avg_wait_time: mean=32.460, CI95=[30.715, 34.205]
  - flow_rate: mean=16.800, CI95=[15.294, 18.306]
  - co2_emissions: mean=188.492, CI95=[160.823, 216.161]
  - emergency_response_time: mean=32.580, CI95=[30.397, 34.763]

### Cenário: normal
- Modo: **ai** (n=5)
  - avg_wait_time: mean=19.240, CI95=[17.138, 21.342]
  - flow_rate: mean=19.200, CI95=[18.960, 19.440]
  - co2_emissions: mean=129.176, CI95=[107.963, 150.389]
  - emergency_response_time: mean=1.920, CI95=[1.608, 2.232]
- Modo: **traditional** (n=5)
  - avg_wait_time: mean=29.520, CI95=[25.611, 33.429]
  - flow_rate: mean=13.700, CI95=[12.691, 14.709]
  - co2_emissions: mean=143.750, CI95=[110.567, 176.933]
  - emergency_response_time: mean=24.960, CI95=[7.074, 42.846]

### Cenário: rush_hour
- Modo: **ai** (n=5)
  - avg_wait_time: mean=25.720, CI95=[24.633, 26.807]
  - flow_rate: mean=49.900, CI95=[49.533, 50.267]
  - co2_emissions: mean=476.892, CI95=[427.146, 526.638]
  - emergency_response_time: mean=1.740, CI95=[1.558, 1.922]
- Modo: **traditional** (n=5)
  - avg_wait_time: mean=39.520, CI95=[36.711, 42.329]
  - flow_rate: mean=28.900, CI95=[27.163, 30.637]
  - co2_emissions: mean=415.130, CI95=[389.887, 440.373]
  - emergency_response_time: mean=40.060, CI95=[15.568, 64.552]

## Comparação IA vs Tradicional

### Cenário: accident
- avg_wait_time: IA=20.560, Trad=39.940, análise=paired, pares=5, Δ=-19.380, CI95(Δ)=[-24.580, -15.720], melhoria=48.52%, p=0.0647
- flow_rate: IA=19.500, Trad=8.700, análise=paired, pares=5, Δ=10.800, CI95(Δ)=[8.600, 13.000], melhoria=124.14%, p=0.0647
- co2_emissions: IA=135.602, Trad=111.972, análise=paired, pares=5, Δ=23.630, CI95(Δ)=[6.520, 40.138], melhoria=-21.10%, p=0.1265
- emergency_response_time: IA=3.420, Trad=40.980, análise=paired, pares=5, Δ=-37.560, CI95(Δ)=[-56.400, -15.140], melhoria=91.65%, p=0.1217

### Cenário: emergency
- avg_wait_time: IA=16.240, Trad=32.460, análise=paired, pares=5, Δ=-16.220, CI95(Δ)=[-19.960, -12.480], melhoria=49.97%, p=0.0647
- flow_rate: IA=23.700, Trad=16.800, análise=paired, pares=5, Δ=6.900, CI95(Δ)=[5.598, 8.100], melhoria=41.07%, p=0.0647
- co2_emissions: IA=137.132, Trad=188.492, análise=paired, pares=5, Δ=-51.360, CI95(Δ)=[-85.624, -17.474], melhoria=27.25%, p=0.0647
- emergency_response_time: IA=1.860, Trad=32.580, análise=paired, pares=5, Δ=-30.720, CI95(Δ)=[-32.600, -28.700], melhoria=94.29%, p=0.0647

### Cenário: normal
- avg_wait_time: IA=19.240, Trad=29.520, análise=paired, pares=5, Δ=-10.280, CI95(Δ)=[-12.820, -7.740], melhoria=34.82%, p=0.0647
- flow_rate: IA=19.200, Trad=13.700, análise=paired, pares=5, Δ=5.500, CI95(Δ)=[4.600, 6.200], melhoria=40.15%, p=0.0647
- co2_emissions: IA=129.176, Trad=143.750, análise=paired, pares=5, Δ=-14.574, CI95(Δ)=[-37.444, 3.398], melhoria=10.14%, p=0.4429
- emergency_response_time: IA=1.920, Trad=24.960, análise=paired, pares=5, Δ=-23.040, CI95(Δ)=[-39.280, -7.280], melhoria=92.31%, p=0.1265

### Cenário: rush_hour
- avg_wait_time: IA=25.720, Trad=39.520, análise=paired, pares=5, Δ=-13.800, CI95(Δ)=[-16.420, -11.600], melhoria=34.92%, p=0.0647
- flow_rate: IA=49.900, Trad=28.900, análise=paired, pares=5, Δ=21.000, CI95(Δ)=[19.200, 22.800], melhoria=72.66%, p=0.0647
- co2_emissions: IA=476.892, Trad=415.130, análise=paired, pares=5, Δ=61.762, CI95(Δ)=[22.178, 92.018], melhoria=-14.88%, p=0.1305
- emergency_response_time: IA=1.740, Trad=40.060, análise=paired, pares=5, Δ=-38.320, CI95(Δ)=[-60.840, -15.567], melhoria=95.66%, p=0.1217

## Nota Metodológica
- Intervalos de confiança de cada modo: aproximação normal (95%).
- Diferença IA-Tradicional: bootstrap e teste de permutação.
- Sempre que possível, comparação emparelhada por cenário/repetição/seed.