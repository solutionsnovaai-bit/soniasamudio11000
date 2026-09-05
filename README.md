# Sônia Samudio 11000 — Landing de campanha

Site estático (HTML + CSS + JS puro). Sem build, sem dependência.

## Estrutura

```
index.html
css/style.css
js/script.js
assets/
  ├── hero-retrato.jpg       ← foto principal do hero
  ├── apontando-figura.jpg   ← foto usada na seção "Quem é"
  ├── arte-recorte.jpg       ← foto usada na seção "A causa"
  └── logo.png               ← logo oficial da campanha, fundo transparente
```

## Deploy

1. `git init` → `git add .` → `git commit -m "first"`
2. Push pro GitHub
3. Vercel/Netlify → Import repo → Framework: **Other** → Deploy
   (sem build command, sem output directory — é só a raiz)

## Sobre o compartilhamento (sem WhatsApp)

A campanha não usa WhatsApp em nenhum ponto do site. Os botões
"Compartilhar campanha" (hero, CTA final e o botão flutuante) usam a
**Web Share API** nativa do navegador:

- No **celular**, abre a folha de compartilhamento nativa do sistema —
  a pessoa escolhe pra onde mandar (WhatsApp, Instagram, SMS, o que
  tiver instalado). O site não escolhe por ela.
- No **desktop**, onde essa API normalmente não existe, o clique copia
  o link e o texto da campanha para a área de transferência e o botão
  mostra "Link copiado!" por 2 segundos. Se o navegador bloquear o
  acesso à área de transferência (sem HTTPS, por exemplo), aparece uma
  caixa com o texto pronto para copiar manualmente.

O único contato direto listado é o e-mail oficial da campanha
(`campanha@soniasamudio11000.com.br`), que aparece no CTA final e no
rodapé.

Tudo isso está em `js/script.js`, na função `doShare()` — não há nenhum
número ou link de WhatsApp em lugar nenhum do projeto.

## O rodapé de identificação legal

A seção `.legal-box` no rodapé contém o texto exigido para a aprovação de
anúncios eleitorais no Meta: "Propaganda Eleitoral", o nome completo da
candidata, o CNPJ e a cidade. Está propositalmente com bom contraste
(fundo escuro translúcido, borda visível, fonte monoespaçada em tamanho
legível) — **não redija nem diminua esse bloco**, é o que os sistemas de
verificação do Meta procuram na página.

## Cores da campanha

- Navy (base): `#0B1F42`
- Laranja (destaque): `#FA3D0C`
- Azul claro (apoio): `#86BAEC`
- Roxo (causa da mulher — usado com mais presença que o combinado
  inicialmente, a pedido do cliente): `#8E44AD`
- Papel (fundo claro): `#F3F6FC`

O roxo aparece: na tag e no título da seção "A causa", no card
"Proteção à mulher" dentro de Propostas, e nos detalhes da lista de
causas — sempre como acento, nunca como cor de fundo dominante.

## Tipografia

- **Archivo Expanded** (peso 800/900) — títulos, o mesmo tom de urgência de
  material de campanha impresso, mas sem parecer barato
- **Sora** — corpo de texto
- **JetBrains Mono** — número de urna, rótulos, dados

## A tela de load

Usa o **logo oficial da campanha** (com nome, cargo e o número 11000
já embutidos na peça) como elemento central: ele entra em fade e escala
suave, ganha um brilho pulsante em laranja e um clarão de luz atravessa
a imagem no instante em que acende — tudo centralizado de verdade com
flexbox, então fica no centro exato da tela em qualquer proporção de
celular ou monitor. Ao fundo, raios girando bem devagar e um glow
pulsante criam clima de palanque sem precisar de nenhuma imagem extra.

---
Nova AI Solutions
