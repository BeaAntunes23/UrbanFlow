# Relatório Estatístico de Campanha Experimental

Fonte de dados: `C:\Users\Lenovo\OneDrive - UTAD\LEI\3º ano\2º semestre\Laboratório de Projeto\Projeto\Projeto-Final-LEI\Frontend\experiments\results\latest.csv`

## Resumo por Cenário e Modo

### Cenário: accident
- Modo: **ai** (n=5)
  - avg_wait_time: mean=21.800, CI95=[18.051, 25.549]
  - flow_rate: mean=20.300, CI95=[19.446, 21.154]
  - co2_emissions: mean=145.218, CI95=[121.646, 168.790]
  - emergency_response_time: mean=3.480, CI95=[2.826, 4.134]
- Modo: **traditional** (n=5)
  - avg_wait_time: mean=36.740, CI95=[30.845, 42.635]
  - flow_rate: mean=9.300, CI95=[7.586, 11.014]
  - co2_emissions: mean=119.270, CI95=[86.663, 151.877]
  - emergency_response_time: mean=28.600, CI95=[12.974, 44.226]

### Cenário: emergency
- Modo: **ai** (n=5)
  - avg_wait_time: mean=15.140, CI95=[12.817, 17.463]
  - flow_rate: mean=23.700, CI95=[22.516, 24.884]
  - co2_emissions: mean=135.478, CI95=[112.473, 158.483]
  - emergency_response_time: mean=1.880, CI95=[1.841, 1.919]
- Modo: **traditional** (n=5)
  - avg_wait_time: mean=34.660, CI95=[29.591, 39.729]
  - flow_rate: mean=16.100, CI95=[14.569, 17.631]
  - co2_emissions: mean=186.310, CI95=[161.798, 210.822]
  - emergency_response_time: mean=34.220, CI95=[29.640, 38.800]

### Cenário: normal
- Modo: **ai** (n=5)
  - avg_wait_time: mean=21.280, CI95=[17.068, 25.492]
  - flow_rate: mean=19.700, CI95=[19.460, 19.940]
  - co2_emissions: mean=144.538, CI95=[123.045, 166.031]
  - emergency_response_time: mean=1.840, CI95=[1.681, 1.999]
- Modo: **traditional** (n=5)
  - avg_wait_time: mean=34.280, CI95=[32.552, 36.008]
  - flow_rate: mean=13.100, CI95=[12.620, 13.580]
  - co2_emissions: mean=129.758, CI95=[115.235, 144.281]
  - emergency_response_time: mean=19.320, CI95=[0.404, 38.236]

### Cenário: rush_hour
- Modo: **ai** (n=5)
  - avg_wait_time: mean=26.080, CI95=[23.098, 29.062]
  - flow_rate: mean=50.900, CI95=[46.125, 55.675]
  - co2_emissions: mean=453.706, CI95=[412.087, 495.325]
  - emergency_response_time: mean=1.780, CI95=[1.636, 1.924]
- Modo: **traditional** (n=5)
  - avg_wait_time: mean=39.400, CI95=[38.975, 39.825]
  - flow_rate: mean=30.300, CI95=[29.291, 31.309]
  - co2_emissions: mean=407.392, CI95=[387.296, 427.488]
  - emergency_response_time: mean=44.400, CI95=[37.904, 50.896]

## Comparação IA vs Tradicional

### Cenário: accident
- avg_wait_time: IA=21.800, Trad=36.740, Δ=-14.940, CI95(Δ)=[-21.260, -9.280], melhoria=40.66%, p=0.0067
- flow_rate: IA=20.300, Trad=9.300, Δ=11.000, CI95(Δ)=[9.300, 12.600], melhoria=118.28%, p=0.0067
- co2_emissions: IA=145.218, Trad=119.270, Δ=25.948, CI95(Δ)=[-12.209, 60.009], melhoria=-21.76%, p=0.2419
- emergency_response_time: IA=3.480, Trad=28.600, Δ=-25.120, CI95(Δ)=[-38.261, -9.419], melhoria=87.83%, p=0.0457

### Cenário: emergency
- avg_wait_time: IA=15.140, Trad=34.660, Δ=-19.520, CI95(Δ)=[-24.040, -14.439], melhoria=56.32%, p=0.0047
- flow_rate: IA=23.700, Trad=16.100, Δ=7.600, CI95(Δ)=[5.800, 9.200], melhoria=47.20%, p=0.0067
- co2_emissions: IA=135.478, Trad=186.310, Δ=-50.832, CI95(Δ)=[-81.962, -22.174], melhoria=27.28%, p=0.0220
- emergency_response_time: IA=1.880, Trad=34.220, Δ=-32.340, CI95(Δ)=[-36.221, -28.480], melhoria=94.51%, p=0.0067

### Cenário: normal
- avg_wait_time: IA=21.280, Trad=34.280, Δ=-13.000, CI95(Δ)=[-16.800, -8.780], melhoria=37.92%, p=0.0045
- flow_rate: IA=19.700, Trad=13.100, Δ=6.600, CI95(Δ)=[6.200, 7.100], melhoria=50.38%, p=0.0067
- co2_emissions: IA=144.538, Trad=129.758, Δ=14.780, CI95(Δ)=[-6.871, 38.640], melhoria=-11.39%, p=0.2874
- emergency_response_time: IA=1.840, Trad=19.320, Δ=-17.480, CI95(Δ)=[-34.380, -0.700], melhoria=90.48%, p=0.1560

### Cenário: rush_hour
- avg_wait_time: IA=26.080, Trad=39.400, Δ=-13.320, CI95(Δ)=[-15.941, -10.580], melhoria=33.81%, p=0.0067
- flow_rate: IA=50.900, Trad=30.300, Δ=20.600, CI95(Δ)=[16.900, 25.500], melhoria=67.99%, p=0.0067
- co2_emissions: IA=453.706, Trad=407.392, Δ=46.314, CI95(Δ)=[2.682, 85.032], melhoria=-11.37%, p=0.0902
- emergency_response_time: IA=1.780, Trad=44.400, Δ=-42.620, CI95(Δ)=[-48.341, -36.999], melhoria=95.99%, p=0.0067

## Nota Metodológica
- Intervalos de confiança de cada modo: aproximação normal (95%).
- Intervalo para diferença IA-Tradicional: bootstrap (95%).
- Significância: teste de permutação bilateral.