# Mise en ligne de studio-albatre.fr — DNS + nginx

> **FAIT le 2026-06-10** : A `@` → `159.69.109.82` (chez Amen), certificat Let's Encrypt
> émis (expire 2026-09-08), vhost nginx installé (`/root/server-stack/nginx/nginx.conf`,
> backup `.bak-2026-06-10`), nginx connecté au réseau `studio-albatre_default`.
> **https://studio-albatre.fr est en ligne.** Restent : le CNAME `www` (pointe encore
> vers le parking Amen `onstatic-fr.setupdns.net.` — le changer en `studio-albatre.fr.`),
> et le renouvellement du certificat (voir §4).

État : le site tourne déjà sur le VPS Hetzner (`159.69.109.82`, conteneur
`studio-albatre-web-1`, port hôte **3001**), auto-déployé par Portainer.

## 1. Zone DNS (chez le registrar)

Dans « Modifier la zone DNS », ajouter :

| Type  | Nom (hôte) | Valeur            | TTL  |
|-------|------------|-------------------|------|
| A     | `@`        | `159.69.109.82`   | 300* |
| CNAME | `www`      | `studio-albatre.fr.` | 300* |

\* TTL bas (300 s) pendant la mise en place ; remonter à 3600+ une fois que tout marche.

**Ne PAS toucher aux enregistrements MX** pour l'instant : l'avertissement du
registrar est sérieux — changer le MX supprime les boîtes mail associées au
domaine. Le MX par défaut permet de créer une boîte `contact@studio-albatre.fr`
chez le registrar (à faire : c'est l'adresse affichée sur le site et la
destination des leads).

⚠️ Tant que la boîte `contact@studio-albatre.fr` n'existe pas, définir
`CONTACT_TO_EMAIL=pbinnovativesolutions@gmail.com` dans l'env de la stack
Portainer, sinon les leads partent vers une adresse qui ne reçoit rien.

### Plus tard — vérification du domaine dans Resend

Pour envoyer depuis `contact@studio-albatre.fr` (au lieu de
`onboarding@resend.dev`) : Resend → Domains → Add Domain → il fournira
2-3 enregistrements à ajouter tels quels (TXT DKIM `resend._domainkey`,
TXT SPF + MX sur le sous-domaine `send`). Ils ne touchent pas au MX racine,
donc pas de risque pour les boîtes mail.

## 2. Vhost nginx sur le VPS

Le reverse proxy est le conteneur `nginx:alpine` (ports 80/443, config à la main).
Vhost prêt à l'emploi : [`nginx-studio-albatre.conf`](nginx-studio-albatre.conf).

```bash
# 1. copier le vhost dans le conteneur nginx (adapter le chemin de conf monté)
docker cp docs/deploy/nginx-studio-albatre.conf nginx:/etc/nginx/conf.d/studio-albatre.conf

# 2. tester puis recharger
docker exec nginx nginx -t && docker exec nginx nginx -s reload

# 3. une fois le DNS propagé (dig +short studio-albatre.fr → 159.69.109.82),
#    émettre le certificat TLS puis activer le bloc 443 du vhost.
#    Selon le setup certbot existant sur le VPS, par ex. :
certbot certonly --webroot -w /var/www/certbot -d studio-albatre.fr -d www.studio-albatre.fr
```

Le vhost fait : HTTP→HTTPS 301, `www`→apex 301 (canonique SEO = apex, aligné
sur `site.url`), proxy vers le port hôte 3001.

## 3. Checklist post-DNS (SEO)

- [ ] `dig +short studio-albatre.fr` et `www` répondent `159.69.109.82`
- [ ] `https://studio-albatre.fr` sert le site (cert valide) ; `http://` et `www` redirigent en 301 vers l'apex
- [ ] Créer la propriété **Google Search Console** (préfixe de domaine, validation DNS TXT) et soumettre `https://studio-albatre.fr/sitemap.xml`
- [ ] Créer la fiche **Google Business Profile** (PB Innovative Solutions / Studio Albâtre, Mesnil-en-Ouche) — levier n°1 du SEO local
- [ ] Tester les rich results : https://search.google.com/test/rich-results (ProfessionalService + FAQPage doivent apparaître)
- [ ] Vérifier le domaine dans Resend puis passer `CONTACT_FROM_EMAIL=contact@studio-albatre.fr`

## 4. Renouvellement du certificat (à industrialiser avant sept. 2026)

Le cert a été émis via un conteneur certbot temporaire (hook manuel qui écrit le
challenge ACME dans `/var/www/certbot` du conteneur nginx). **Il ne se renouvellera
pas tout seul** : le hook n'existe plus, et le renouvellement `standalone` configuré
pour latenightgames.fr entre en conflit avec nginx sur le port 80. Avant l'échéance,
soit relancer la même procédure (conteneur temporaire), soit — mieux — monter un
webroot hôte partagé (`-v /root/server-stack/certbot-www:/var/www/certbot` dans le
conteneur nginx) et passer les renouvellements en `--webroot`.
