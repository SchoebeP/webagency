/* Données du restaurant — Les Poulettes du Bec */
window.LPDB = {
  images: {
    heroIntimate: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1900&q=72",
    heroConvivial:"https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1900&q=72",
    heroRoom:     "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1900&q=72",
    chef:         "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1100&q=75",
    spread:       "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1100&q=72",
    meat:         "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=1000&q=72",
    salmon:       "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=900&q=72",
    dessert:      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=72",
    cheese:       "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=900&q=72",
    coffee:       "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900&q=72",
    cafe:         "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=72",
    pastry:       "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=72",
    wine:         "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=72",
    terrace:      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&q=72",
    village:      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1100&q=72"
  },

  menu: [
    {
      cat: "Entrées",
      items: [
        { name: "Velouté du moment, crème normande & croûtons dorés", desc: "Légumes du marché mijotés, un trait de crème fermière.", price: "9 €" },
        { name: "Œuf parfait, crème de cidre & lardons fumés", desc: "Cuisson basse température, éclats de noisette torréfiée.", price: "12 €" },
        { name: "Chèvre chaud du voisin sur pain de campagne", desc: "Miel de la vallée, roquette et pomme croquante.", price: "11 €" }
      ]
    },
    {
      cat: "Plats",
      items: [
        { name: "Ris de veau dorés au beurre", desc: "Jus corsé, purée maison et légumes glacés de saison.", price: "26 €" },
        { name: "Truite de rivière meunière", desc: "Beurre citronné, amandes et pommes grenaille rissolées.", price: "22 €" },
        { name: "Pièce de bœuf, sauce au camembert affiné", desc: "Frites maison et salade de jeunes pousses.", price: "24 €" },
        { name: "Suprême de volaille fermière à la crème de cidre", desc: "Champignons des bois et tagliatelles fraîches.", price: "21 €" }
      ]
    },
    {
      cat: "Desserts maison",
      items: [
        { name: "Tarte fine aux pommes du verger", desc: "Caramel au beurre salé, boule de glace vanille.", price: "9 €" },
        { name: "Crème brûlée à la vanille de Madagascar", desc: "Croûte caramélisée minute.", price: "8 €" },
        { name: "Moelleux au chocolat, cœur coulant", desc: "Crème anglaise et fleur de sel.", price: "9 €" }
      ]
    },
    {
      cat: "Salon de thé",
      wide: true,
      items: [
        { name: "Café gourmand — trois douceurs maison", desc: "L'après-midi, accompagné d'un café de torréfaction artisanale.", price: "9 €" },
        { name: "Part de tarte maison du jour", desc: "Selon l'humeur de Laurence et les fruits de saison.", price: "6 €" },
        { name: "Sélection de thés & infusions", desc: "Grands crus et tisanes de la région.", price: "5 €" },
        { name: "Chocolat chaud à l'ancienne", desc: "Chantilly maison, copeaux de chocolat noir.", price: "5 €" }
      ]
    }
  ],

  reviews: [
    {
      stars: 5,
      text: "Un accueil d'une gentillesse rare et une cuisine vraiment faite maison. On se sent reçu comme à la maison, dans un cadre adorable au cœur du village.",
      name: "Élodie M.", meta: "En famille · avril 2026", color: "#B0532F"
    },
    {
      stars: 5,
      text: "Les ris de veau étaient parfaits et la tarte aux pommes, un délice. Tout est frais, généreux et plein de goût. Le rapport qualité-prix est imbattable.",
      name: "Jean-Pierre L.", meta: "En couple · mars 2026", color: "#6E2A2A"
    },
    {
      stars: 5,
      text: "Une terrasse charmante juste à côté de l'abbaye, un service souriant et des produits du coin. On revient à chaque passage au Bec-Hellouin.",
      name: "Sophie & Marc", meta: "Habitués · février 2026", color: "#8A9A7B"
    }
  ],

  hours: [
    { day: "Lundi",    short: "Lun", time: "10h – 18h30", dow: 1 },
    { day: "Mardi",    short: "Mar", time: "10h – 18h30", dow: 2 },
    { day: "Mercredi", short: "Mer", time: "10h – 18h30", dow: 3 },
    { day: "Jeudi",    short: "Jeu", time: "Fermé", closed: true, dow: 4 },
    { day: "Vendredi", short: "Ven", time: "10h – 21h", dow: 5 },
    { day: "Samedi",   short: "Sam", time: "10h – 21h", dow: 6 },
    { day: "Dimanche", short: "Dim", time: "10h – 18h30", dow: 0 }
  ],

  info: {
    phone: "06 59 90 90 97",
    phoneHref: "tel:+33659909097",
    village: "Le Bec-Hellouin",
    label: "Au cœur d'un des Plus Beaux Villages de France",
    tags: ["Terrasse", "Accueil familial", "Parking à proximité", "Boutique cadeaux", "Groupes bienvenus"]
  }
};