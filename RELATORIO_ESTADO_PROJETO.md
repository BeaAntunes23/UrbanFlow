# Relatório de Estado do Projeto (UrbanFlow AI)

## 1) Enquadramento do Protocolo
Título: **Gestão Inteligente de Tráfego Urbano com Simulação de Agentes**

Objetivo global do protocolo:
- Simular tráfego urbano multiagente (veículos, semáforos, peões);
- Permitir controlo por regras em linguagem natural;
- Comparar controlo tradicional vs. controlo inteligente;
- Medir desempenho (espera, fluxo, emissões, emergência);
- Disponibilizar interface gráfica de monitorização e análise.

---

## 2) O que já está implementado

### 2.1 Núcleo de Simulação (Frontend)
Estado: **Implementado**

Foi implementado um motor de simulação (`SimulationEngine`) com:
- Grelha parametrizável (2x2 a 10x10);
- Interseções com semáforos e fases NS/EW;
- Modos de controlo: `ai` e `traditional`;
- Cenários: normal, hora de ponta, acidente, emergência;
- Geração dinâmica de veículos (carro, autocarro, ambulância);
- Regras de prioridade (incluindo emergência);
- Métricas em tempo real: tempo médio de espera, fluxo, emissões CO2, tempo de resposta de emergência, ativos/concluídos;
- Métrica comparativa IA vs tradicional.

### 2.2 Visualização da Simulação (Canvas)
Estado: **Implementado**

Foi implementada renderização em tempo real com:
- Rede viária e interseções;
- Semáforos dinâmicos;
- Veículos em movimento e estado de espera;
- Indicação visual de bloqueios/acidentes;
- HUD de tempo, modo e velocidade.

### 2.3 Interface de Controlo
Estado: **Implementado**

A interface já permite:
- Iniciar/Pausar e reset;
- Alterar cenário;
- Alterar modo IA/tradicional;
- Alterar velocidade;
- Alterar dimensão da grelha;
- Introduzir regras em linguagem natural;
- Visualizar/remover regras ativas;
- Ver métricas e comparação.

### 2.4 Backend API
Estado: **Implementado (núcleo)**

Foram integrados endpoints para:
- `POST /api/rules/translate` (tradução de regra NL -> JSON estruturado);
- `POST /api/metrics/save` (persistência de snapshot de métricas);
- `POST /api/metrics/export` (exportação CSV de snapshots).

Além disso, mantém-se a infraestrutura FastAPI + MongoDB + CORS.

---

## 3) O que falta para fechar com qualidade académica elevada

### 3.1 Validação Experimental Formal
Estado: **Implementado (pipeline base)**

Foi implementado pipeline reproduzível com:
- Runner automático de campanha experimental: `Frontend/scripts/run-experiments.cjs`;
- Execução por cenários e modos (IA vs tradicional), com repetições configuráveis;
- Sementes pseudoaleatórias controladas para reprodutibilidade;
- Exportação automática de resultados para CSV/JSON em `Frontend/experiments/results`.

Também foi implementada análise estatística em:
- `Backend/experiments/analyze_campaign.py`;
- geração de tabelas de resumo e comparação;
- CI95 para médias;
- teste de permutação para diferença IA vs tradicional;
- relatório em Markdown para anexar ao documento académico.

### 3.2 Módulo de Aprendizagem (RL)
Estado: **Parcial / não explícito como RL formal**

Atualmente existe otimização heurística no modo IA (ajuste de verde por filas e prioridade de emergência), mas não há ainda um agente de Reinforcement Learning formalmente treinado e avaliado.

### 3.3 Gestão de Dados de Experiência
Estado: **Parcial**

Já existe persistência de snapshots unitários, mas falta:
- Estruturar coleções para campanhas experimentais;
- Guardar metadados de execução (seed, versão, cenário, parâmetros);
- Script de agregação e geração de tabelas/figuras para relatório.

### 3.4 Documentação Científica
Estado: **Em falta**

Falta produzir relatório final com:
- Metodologia;
- Formulação do problema;
- Métricas e hipóteses;
- Resultados quantitativos;
- Discussão crítica e limitações;
- Trabalho futuro.

---

## 4) Recomendação de Fecho (ordem sugerida)

1. **Congelar baseline atual** (versão estável);
2. Executar campanha completa (`n>=30`) e gerar `latest.csv`;
3. Correr análise estatística e validar significância por cenário;
4. Produzir gráficos comparativos a partir dos CSVs de análise;
5. Redigir capítulo de resultados e discussão;
6. (Opcional forte) Integrar agente RL e comparar com heurística IA atual.

### Comandos de execução (reproduzíveis)

No Frontend:
- `npm run experiment:quick`
- `npm run experiment:run`

Na análise (Backend):
- `python experiments/analyze_campaign.py`

Saídas esperadas:
- `Frontend/experiments/results/latest.csv`
- `Backend/experiments/results/summary_by_mode.csv`
- `Backend/experiments/results/comparison_ai_vs_traditional.csv`
- `Backend/experiments/results/analise_experimental.md`

---

## 5) Conclusão

O projeto encontra-se numa fase tecnicamente avançada, com arquitetura funcional de simulação, controlo interativo, tradução de regras e gestão de métricas. Para atingir o padrão académico máximo do protocolo, o principal esforço restante é de **validação científica estruturada** (experimentos, estatística e relatório), e não de infraestrutura base.
