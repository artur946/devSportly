// Inicialização dos sliders
document.addEventListener('DOMContentLoaded', function() {
  // Inicialização do Swiper para produtos
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Inicialização do Swiper para esportes
  var esportesSwiper = new Swiper(".esportesSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Filtro de categorias
  const tabBtns = document.querySelectorAll('.tab-btn');
  const slides = document.querySelectorAll('.swiper-slide');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      const category = btn.getAttribute('data-category');
      
      // Update title
      document.querySelector('.titulo-categoria').textContent = 'ESPORTES DE ' + category.toUpperCase();
      
      // Filter slides
      slides.forEach(slide => {
        if (slide.getAttribute('data-category') === category) {
          slide.style.display = 'block';
        } else {
          slide.style.display = 'none';
        }
      });
      
      // Update swiper
      esportesSwiper.update();
    });
  });

  // Funcionalidade para exibir menu de categorias ao passar o mouse
  const categoriasNav = document.querySelector('.navegacao ul li:nth-child(2)');
  const categoriasMenu = document.createElement('div');
  categoriasMenu.className = 'categorias-dropdown';
  
  // Criar o menu dropdown
  categoriasMenu.innerHTML = `
    <ul>
      <li data-category="quadra">Esportes de Quadra</li>
      <li data-category="areia">Esportes de Areia</li>
      <li data-category="agua">Esportes Aquáticos</li>
      <li data-category="radicais">Esportes Radicais</li>
      <li data-category="inverno">Esportes de Inverno</li>
    </ul>
  `;
  
  categoriasNav.appendChild(categoriasMenu);
  
  // Mostrar/esconder o menu dropdown
  categoriasNav.addEventListener('mouseenter', () => {
    categoriasMenu.style.display = 'block';
  });
  
  categoriasNav.addEventListener('mouseleave', () => {
    categoriasMenu.style.display = 'none';
  });
  
  // Funcionalidade para exibir detalhes do esporte ao clicar
  const esporteCards = document.querySelectorAll('.esporte-card');
  const mainContent = document.querySelector('main') || document.createElement('main');
  
  if (!document.querySelector('main')) {
    // Criar o elemento main e inserir após o cabeçalho
    const cabecalho = document.querySelector('.cabecalho');
    cabecalho.insertAdjacentElement('afterend', mainContent);
    
    // Mover todos os sliders para dentro do main
    const sliders = document.querySelectorAll('.esportes-container, .produtos-container, .titulo-loja, .titulo-categoria');
    sliders.forEach(slider => {
      mainContent.appendChild(slider);
    });
  }
  
  // Adicionar evento de clique para cada card de esporte
  esporteCards.forEach(card => {
    card.addEventListener('click', () => {
      const sportName = card.getAttribute('data-sport');
      showSportDetails(sportName, mainContent);
    });
  });
  
  // Adicionar evento de clique para itens do menu dropdown
  const dropdownItems = categoriasMenu.querySelectorAll('li');
  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      const category = item.getAttribute('data-category');
      showCategoryDetails(category, mainContent);
    });
  });
});

// Função para mostrar detalhes do esporte
function showSportDetails(sportName, mainContent) {
  // Salvar o conteúdo original
  if (!window.originalContent) {
    window.originalContent = mainContent.innerHTML;
  }
  
  // Obter dados do esporte
  const sportData = getSportData(sportName);
  
  // Criar conteúdo de detalhes do esporte
  const sportDetailsHTML = `
    <div class="sport-details">
      <h1 class="sport-title">${sportName}</h1>
      
      <div class="sport-content">
        <div class="sport-video">
          <iframe 
            width="100%" 
            height="500" 
            src="${sportData.videoUrl}" 
            title="${sportName}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
        
        <div class="sport-info">
          <h2>Sobre ${sportName}</h2>
          <p>${sportData.description}</p>
          
          <h3>Benefícios</h3>
          <ul>
            ${sportData.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
          </ul>
          
          <h3>Equipamentos Necessários</h3>
          <ul>
            ${sportData.equipment.map(item => `<li>${item}</li>`).join('')}
          </ul>
          
          <div class="sport-actions">
            <button class="btn-back">Voltar para Home</button>
            <button class="btn-equipment">Ver Equipamentos</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Substituir o conteúdo
  mainContent.innerHTML = sportDetailsHTML;
  
  // Adicionar evento ao botão de voltar
  const backButton = mainContent.querySelector('.btn-back');
  backButton.addEventListener('click', () => {
    mainContent.innerHTML = window.originalContent;
    
    // Reinicializar os sliders
    initializeSliders();
  });
}

// Função para mostrar detalhes da categoria
function showCategoryDetails(category, mainContent) {
  // Salvar o conteúdo original
  if (!window.originalContent) {
    window.originalContent = mainContent.innerHTML;
  }
  
  // Obter dados da categoria
  const categoryData = getCategoryData(category);
  
  // Criar conteúdo de detalhes da categoria
  const categoryDetailsHTML = `
    <div class="category-details">
      <h1 class="category-title">Esportes de ${categoryData.name}</h1>
      
      <div class="category-description">
        <p>${categoryData.description}</p>
      </div>
      
      <div class="sports-grid">
        ${categoryData.sports.map(sport => `
          <div class="sport-card" data-sport="${sport.name}">
            <div class="sport-image">
              <img src="${sport.image}" alt="${sport.name}" crossorigin="anonymous" onerror="this.src='https://placehold.co/300x300/e6f2ff/007bff?text=${encodeURIComponent(sport.name)}'">
            </div>
            <h3 class="sport-name">${sport.name}</h3>
          </div>
        `).join('')}
      </div>
      
      <div class="category-actions">
        <button class="btn-back">Voltar para Home</button>
      </div>
    </div>
  `;
  
  // Substituir o conteúdo
  mainContent.innerHTML = categoryDetailsHTML;
  
  // Adicionar evento ao botão de voltar
  const backButton = mainContent.querySelector('.btn-back');
  backButton.addEventListener('click', () => {
    mainContent.innerHTML = window.originalContent;
    
    // Reinicializar os sliders
    initializeSliders();
  });
  
  // Adicionar eventos aos cards de esporte
  const sportCards = mainContent.querySelectorAll('.sport-card');
  sportCards.forEach(card => {
    card.addEventListener('click', () => {
      const sportName = card.getAttribute('data-sport');
      showSportDetails(sportName, mainContent);
    });
  });
}

// Função para reinicializar os sliders
function initializeSliders() {
  // Inicialização do Swiper para produtos
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Inicialização do Swiper para esportes
  var esportesSwiper = new Swiper(".esportesSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// Função para obter dados do esporte
function getSportData(sportName) {
  const sportsData = {
    "Basquete": {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "O basquetebol, ou simplesmente basquete, é um esporte coletivo jogado por duas equipes de cinco jogadores cada. O objetivo é fazer pontos arremessando a bola na cesta do adversário. É um dos esportes mais populares do mundo, praticado por pessoas de todas as idades.",
      benefits: [
        "Melhora a coordenação motora e o equilíbrio",
        "Desenvolve resistência cardiovascular",
        "Fortalece músculos das pernas e braços",
        "Estimula o trabalho em equipe e a estratégia"
      ],
      equipment: [
        "Bola de basquete",
        "Tênis apropriados para quadra",
        "Roupas confortáveis",
        "Acessórios opcionais: munhequeiras, joelheiras"
      ]
    },
    "Vôlei": {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      description: "O voleibol é um esporte praticado entre duas equipes de seis jogadores cada, separadas por uma rede. O objetivo é enviar a bola por cima da rede de modo que ela toque o chão dentro da quadra adversária, enquanto se evita que o mesmo aconteça na própria quadra.",
      benefits: [
        "Melhora a coordenação motora e reflexos",
        "Desenvolve força nos membros inferiores e superiores",
        "Estimula o trabalho em equipe",
        "Aumenta a capacidade aeróbica"
      ],
      equipment: [
        "Bola de vôlei",
        "Joelheiras",
        "Tênis apropriados para quadra",
        "Roupas confortáveis"
      ]
    },
    "Futsal": {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      description: "O futsal é uma variante do futebol jogada em quadra menor e com cinco jogadores em cada equipe. É jogado com uma bola menor e mais pesada, o que exige maior técnica e proporciona um jogo mais rápido.",
      benefits: [
        "Melhora a resistência cardiovascular",
        "Desenvolve agilidade e velocidade",
        "Aprimora a coordenação motora",
        "Estimula o raciocínio rápido e trabalho em equipe"
      ],
      equipment: [
        "Bola de futsal",
        "Chuteiras específicas para futsal",
        "Caneleiras",
        "Uniforme esportivo"
      ]
    },
    "Tênis": {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      description: "O tênis é um esporte de raquete jogado entre dois oponentes (simples) ou duas duplas (duplas). Os jogadores usam uma raquete para rebater uma bola de tênis sobre a rede para o lado do adversário.",
      benefits: [
        "Melhora a coordenação olho-mão",
        "Desenvolve força e resistência muscular",
        "Aumenta a densidade óssea",
        "Melhora a saúde cardiovascular"
      ],
      equipment: [
        "Raquete de tênis",
        "Bolas de tênis",
        "Tênis específicos para quadra",
        "Roupas confortáveis"
      ]
    },
    "Badminton": {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      description: "O badminton é um esporte de raquete jogado usando raquetes para rebater uma peteca através de uma rede. Embora possa ser jogado com equipes maiores, as formas mais comuns do jogo são com um jogador contra um (simples) ou com dois jogadores de cada lado (duplas).",
      benefits: [
        "Melhora a coordenação motora",
        "Desenvolve reflexos rápidos",
        "Aumenta a resistência cardiovascular",
        "Fortalece os músculos das pernas e braços"
      ],
      equipment: [
        "Raquete de badminton",
        "Petecas",
        "Tênis esportivos",
        "Roupas leves e confortáveis"
      ]
    },
    "Handebol": {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      description: "O handebol é um esporte coletivo em que duas equipes de sete jogadores cada (um goleiro e seis jogadores de linha) passam a bola com as mãos tentando arremessá-la no gol do adversário.",
      benefits: [
        "Desenvolve força e resistência muscular",
        "Melhora a coordenação motora",
        "Estimula o trabalho em equipe",
        "Aumenta a capacidade cardiorrespiratória"
      ],
      equipment: [
        "Bola de handebol",
        "Tênis apropriados para quadra",
        "Roupas confortáveis",
        "Joelheiras (opcional)"
      ]
    },
    "Vôlei de Praia": {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      description: "O vôlei de praia é uma variante do voleibol jogada na areia, geralmente em praias. É jogado por duas equipes de dois jogadores cada, em uma quadra de areia dividida por uma rede.",
      benefits: [
        "Fortalece os músculos das pernas devido à areia",
        "Melhora o equilíbrio e a coordenação",
        "Aumenta a resistência cardiovascular",
        "Proporciona exposição ao sol (vitamina D)"
      ],
      equipment: [
        "Bola de vôlei de praia",
        "Óculos de sol",
        "Protetor solar",
        "Roupas leves e confortáveis"
      ]
    },
    "Futevôlei": {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      description: "O futevôlei é um esporte que combina elementos do futebol e do voleibol. É jogado em uma quadra de areia semelhante à do vôlei de praia, mas os jogadores usam os pés, pernas, cabeça e peito para passar a bola sobre a rede.",
      benefits: [
        "Desenvolve equilíbrio e coordenação",
        "Fortalece os músculos das pernas",
        "Melhora a flexibilidade",
        "Aumenta a resistência física"
      ],
      equipment: [
        "Bola de futevôlei",
        "Óculos de sol",
        "Protetor solar",
        "Roupas leves e confortáveis"
      ]
    },
    "Beach Tennis": {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      description: "O beach tennis é um esporte que combina elementos do tênis, vôlei de praia e badminton. É jogado em uma quadra de areia com uma rede semelhante à do vôlei, usando raquetes específicas e uma bola de tênis despressurizada.",
      benefits: [
        "Melhora a coordenação motora",
        "Desenvolve resistência física",
        "Fortalece os músculos das pernas devido à areia",
        "Proporciona exposição ao sol (vitamina D)"
      ],
      equipment: [
        "Raquete de beach tennis",
        "Bolas específicas",
        "Óculos de sol",
        "Protetor solar",
        "Roupas leves e confortáveis"
      ]
    },
    "Frescobol": {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      description: "O frescobol é um esporte recreativo brasileiro jogado nas praias. É jogado por duas ou mais pessoas que usam raquetes de madeira para passar uma bola de borracha entre si, sem deixá-la cair.",
      benefits: [
        "Melhora a coordenação motora",
        "Desenvolve reflexos rápidos",
        "Proporciona atividade física leve a moderada",
        "Estimula a socialização"
      ],
      equipment: [
        "Raquetes de frescobol",
        "Bola de borracha",
        "Óculos de sol",
        "Protetor solar",
        "Roupas leves e confortáveis"
      ]
    }
  };
  
  // Retornar dados do esporte ou dados padrão se não encontrado
  return sportsData[sportName] || {
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description: `${sportName} é um esporte que proporciona diversos benefícios para a saúde física e mental. Praticado em todo o mundo, este esporte desenvolve habilidades específicas e promove o bem-estar geral.`,
    benefits: [
      "Melhora a condição cardiovascular",
      "Desenvolve força muscular",
      "Aumenta a coordenação motora",
      "Promove o trabalho em equipe"
    ],
    equipment: [
      "Equipamentos específicos para a prática",
      "Vestuário adequado",
      "Calçados apropriados",
      "Acessórios de proteção"
    ]
  };
}

// Função para obter dados da categoria
function getCategoryData(category) {
  const categoriesData = {
    "quadra": {
      name: "Quadra",
      description: "Os esportes de quadra são praticados em superfícies planas e demarcadas, geralmente cobertas. Eles desenvolvem habilidades como coordenação, agilidade e trabalho em equipe.",
      sports: [
        {
          name: "Basquete",
          image: "https://images.unsplash.com/photo-1546519638-68e109acd27d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          name: "Vôlei",
          image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          name: "Futsal",
          image: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          name: "Tênis",
          image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          name: "Badminton",
          image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          name: "Handebol",
          image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        }
      ]
    },
    "areia": {
      name: "Areia",
      description: "Os esportes de areia são praticados em superfícies arenosas, geralmente em praias. Eles proporcionam um desafio adicional devido à instabilidade da areia, fortalecendo ainda mais os músculos e melhorando o equilíbrio.",
      sports: [
        {
          name: "Vôlei de Praia",
          image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          name: "Futevôlei",
          image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          name: "Beach Tennis",
          image: "https://images.unsplash.com/photo-1562552052-c72ceddf93dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          name: "Frescobol",
          image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        }
      ]
    },
    "agua": {
      name: "Aquáticos",
      description: "Os esportes aquáticos são praticados na água, seja em piscinas, mares, rios ou lagos. Eles proporcionam baixo impacto nas articulações e desenvolvem resistência cardiovascular e muscular.",
      sports: [
        {
          name: "Natação",
          image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          name: "Surf",
          image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          name: "Stand Up Paddle",
          image: "https://images.unsplash.com/photo-1526188717906-ab4a2f949f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          name: "Canoagem",
          image: "https://images.unsplash.com/photo-1511124441463-b6fe5b63b617?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        }
      ]
    },
    "radicais": {
      name: "Radicais",
      description: "Os esportes radicais envolvem maior risco e adrenalina. Eles desafiam os limites físicos e mentais, desenvolvendo coragem, concentração e habilidades específicas.",
      sports: [
        {
          name: "Skate",
          image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          name: "BMX",
          image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          name: "Parkour",
          image: "https://images.unsplash.com/photo-1566796195789-d5a59f97235a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          name: "Escalada",
          image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        }
      ]
    },
    "inverno": {
      name: "Inverno",
      description: "Os esportes de inverno são praticados em ambientes com neve ou gelo. Eles desenvolvem equilíbrio, coordenação e resistência ao frio, além de proporcionarem contato com a natureza em paisagens de inverno.",
      sports: [
        {
          name: "Esqui",
          image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          name: "Snowboard",
          image: "https://images.unsplash.com/photo-1611124600582-c9ef1d538e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          name: "Patinação no Gelo",
          image: "https://images.unsplash.com/photo-1547446931-3eb679406c3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          name: "Hóquei no Gelo",
          image: "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        }
      ]
    }
  };
  
  // Retornar dados da categoria ou dados padrão se não encontrada
  return categoriesData[category] || {
    name: "Esportivos",
    description: "Explore diversos esportes e suas modalidades. Cada esporte proporciona benefícios únicos para a saúde física e mental.",
    sports: [
      {
        name: "Basquete",
        image: "https://images.unsplash.com/photo-1546519638-68e109acd27d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      },
      {
        name: "Vôlei",
        image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      },
      {
        name: "Natação",
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      },
      {
        name: "Skate",
        image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      }
    ]
  };
}
